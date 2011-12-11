define ->
  (list, iterator, context = list) ->
    results = {}
    for own key, val of list
      results[key] = iterator.call context, val, key, list
    results

