define ['arr/erase'], (erase) ->
  publisher = (obj = {}) ->
    topics = {}

    obj.subscribe = (topic, handler, context = obj) ->
      topic = topics[topic] ?= []
      subscription = {handler, context}
      topic.push subscription
      attach: -> topic.push subscription
      detach: -> erase topic, subscription

    obj.publish = (topic, messages...) ->
      topic = topics[topic]
      return false unless topic?
      for subscription in topic
        subscription.handler.apply subscription.context, messages
      topic
    obj

  # make publisher a publisher, so meta...
  publisher publisher

