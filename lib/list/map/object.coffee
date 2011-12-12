define ->

  # maps object `list` with returned value of `iterator`, optionally changing
  # the context of `iterator` from `list` to `context`. Does not mutate `list`.
  # Returns mapped `list`.
  (list, iterator, context = list) ->
    results = {}
    for own key, val of list
      results[key] = iterator.call context, val, key, list
    results

