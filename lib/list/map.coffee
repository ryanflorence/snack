# maps array, object, string or arraylike object `list` with returned value of
# `iterator`, optionally changing the context of `iterator` from `list` to
# `context`. Does not mutate `list`.
# returns mapped `list`
define ['util/typeOf'], (typeOf) ->

  (list, iterator, context = list) ->
    type = typeOf list

    if type is 'array'
      (iterator.call context, item, i, list for item, i in list when list[i])

    else if type is 'object'
      results = {}
      for own key, val of list
        results[key] = iterator.call context, val, key, list
      results

    else if type is 'arraylike'
      results = length: list.length
      for item, i in list when list[i]
        results[i] = iterator.call context, item, i, list
      results

    else if type is 'string'
      (iterator.call context, item, i, list for item, i in list).join('')

    else
      list

