define [
  'util/typeOf'
  'list/map/array'
  'list/map/object'
  'list/map/arraylike'
  'list/map/string'
], (typeOf, array, object, arraylike, string) ->
  mappers = { array, object, arraylike, string }

  # maps array, object, string or arraylike object `list` with returned value of
  # `iterator`, optionally changing the context of `iterator` from `list` to
  # `context`. Does not mutate `list`. Returns mapped `list`
  (list, iterator, context = list) ->
    mappers[typeOf list]?.apply list, arguments

