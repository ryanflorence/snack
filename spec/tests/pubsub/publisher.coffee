define [
  'pubsub/publisher'
  'pubsub/publish'
  'pubsub/subscribe'
], (publisher, publish, subscribe) ->
  module 'pubsub/publisher'

  test 'that publisher is a publisher', ->
    ok publisher.publish?, 'publish method exists'
    ok publisher.subscribe?, 'subscribe method exists'

  test 'basic pub/sub signature', 5, ->
    subscribe 'test', ->
      ok true, 'subscription handler called'
    publish 'test'

    subscribe 'with args', (one, two) ->
      equal one, 1, 'first argument is correct'
      equal two, 2, 'second argument is correct'
    publish 'with args', 1, 2

    subscribe 'default context', ->
      strictEqual @, publisher, 'publisher is the default context'
    publish 'default context'

    context = {}
    handler = ->
      strictEqual @, context, 'context set'
    subscribe 'with context', handler, context
    publish 'with context'

  test 'multiple subscriptions', 2, ->
    # number of expected assertions determines if this passes
    subscribe 'multiple subscriptions', ->
      ok true, 'published one of multiple subscriptions'
    subscribe 'multiple subscriptions', ->
      ok true, 'published one of multiple subscriptions'
    publish 'multiple subscriptions'

  test 'subscription objects', ->
    # increment count with each publish and then check it
    count = 0
    subscription = subscribe 'increment', -> count++
    publish 'increment'
    equal count, 1, 'published the first time'

    subscription.detach()
    publish 'increment'
    equal count, 1, 'subscription detached'

    subscription.attach()
    publish 'increment'
    equal count, 2, 'subscription attached'

  test 'creates localized pubsub systems', ->
    one = publisher {}
    two = publisher {}

    # increment count with each publish and then check it.
    count = 0
    one.subscribe 'same thing', -> count++
    two.subscribe 'same thing', -> count++

    one.publish 'same thing'

    # if count is more than 1, than the publishers aren't local systems
    equal count, 1, 'count incremented once, because only `one` published'
    two.publish 'same thing'
    equal count, 2, 'count incremented again'

