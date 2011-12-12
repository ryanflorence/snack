define ->

  # maps arraylike object `list` with returned value of `iterator`, optionally
  # changing the context of `iterator` from `list` to `context`. Does not
  # mutate `list`. Returns mapped `list`.
  (list, iterator, context = list) ->
    results = length: list.length
    for item, i in list when list[i]
      results[i] = iterator.call context, item, i, list
    results

