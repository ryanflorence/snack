define ['util/typeOf'], (typeOf) ->
  (list, iterator, context = list) ->
    (iterator.call context, item, i, list for item, i in list).join ""

