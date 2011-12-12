define ['util/typeOf'], (typeOf) ->

  # maps `string` with returned value of `iterator`, optionally changing
  # the context of `iterator` from `string` to `context`. Does not mutate `string`.
  # Returns mapped `string`.
  (string, iterator, context = string) ->
    (iterator.call context, item, i, string for item, i in string).join ""

