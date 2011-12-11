define ->
  (list, iterator, context = list) ->
    results = length: list.length
    for item, i in list when list[i]
      results[i] = iterator.call context, item, i, list
    results

