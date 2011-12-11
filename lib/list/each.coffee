# iterates array, object, string or arraylike object `list` with `iterator`,
# optionally changing the context of `iterator` from `list` to `context`
# returns `list`
define ['util/typeOf'], (typeOf) ->
  arylike = ['array', 'arraylike', 'string']

  (list, iterator, context = list) ->
    type = typeOf list

    if type in arylike
      for item, i in list when list[i]
        iterator.call context, item, i, list

    if type is 'object'
      for own key, val of list
        iterator.call context, val, key, list

    list

