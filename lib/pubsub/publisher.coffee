define ['arr/erase'], (erase) ->

  # Appends `publish` and `subscribe` methods to optional `obj`,
  # returns `obj` or a new object when unspecified. The module is itself
  # a singleton publisher.
  publisher = (obj = {}) ->
    topics = {}

    # Creates subscription on `topic`, calls `handler` with optional
    # context `context` when `topic` is published. Returns a
    # subscription object
    obj.subscribe = (topic, handler, context = obj) ->
      topic = topics[topic] ?= []
      subscription = {handler, context}
      topic.push subscription

      # Detaches the subscription: `handler` will not be called when
      # `topic` is published
      detach: -> erase topic, subscription

      # Attaches the subscription: `handler` will again be called when
      # `topic` is published
      attach: -> topic.push subscription

    # Calls all `topic` subscriptions, sending optional `messages`
    # to the subscription handler.
    obj.publish = (topic, messages...) ->
      topic = topics[topic]
      return false unless topic?
      for subscription in topic
        subscription.handler.apply subscription.context, messages
      topic
    obj

  # make publisher a publisher, so meta...
  publisher publisher

