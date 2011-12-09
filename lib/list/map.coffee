# maps `ary` with `iterator`, optionally set context of `iterator` to `context`
define ->
  (ary, iterator, context = ary) ->
    iterator.call ary, item, index, ary for item, index in ary

