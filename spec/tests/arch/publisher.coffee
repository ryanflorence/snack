define ['arch/publisher'], (publisher) ->
  module 'arch/publisher'

  window.publisher = publisher

  test 'that publisher is a publisher', ->
    ok publisher.publish?, 'publish method exists'
    ok publisher.subscribe?, 'subscribe method exists'

  test 'basic pub/sub signature', 5, ->
    publisher.subscribe 'test', ->
      ok true, 'subscription handler called'
    publisher.publish 'test'

    publisher.subscribe 'with args', (one, two) ->
      equal one, 1, 'first argument is correct'
      equal two, 2, 'second argument is correct'
    publisher.publish 'with args', 1, 2

    publisher.subscribe 'default context', ->
      strictEqual @, publisher, 'publisher is the default context'
    publisher.publish 'default context'

    context = {}
    handler = ->
      strictEqual @, context, 'context set'
    publisher.subscribe 'with context', handler, context
    publisher.publish 'with context'

  test 'multiple subscriptions', 2, ->
    # number of expected assertions determines if this passes
    publisher.subscribe 'multiple subscriptions', ->
      ok true, 'published one of multiple subscriptions'
    publisher.subscribe 'multiple subscriptions', ->
      ok true, 'published one of multiple subscriptions'
    publisher.publish 'multiple subscriptions'

  test 'subscription objects', ->
    # increment count with each publish and then check it
    count = 0
    subscription = publisher.subscribe 'increment', -> count++
    publisher.publish 'increment'
    equal count, 1, 'published the first time'

    subscription.detach()
    publisher.publish 'increment'
    equal count, 1, 'subscription detached'

    subscription.attach()
    publisher.publish 'increment'
    equal count, 2, 'subscription attached'

