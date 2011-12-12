define ->

  # maps array `list` with returned value of `iterator`, optionally changing
  # the context of `iterator` from `list` to `context`. Does not mutate `list`.
  # Returns mapped `list`.
  (list, iterator, context = list) ->
    iterator.call context, item, i, list for item, i in list

