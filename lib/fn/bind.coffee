# sets the context of a `fn` to `context`, optionally prepends `args...`
# to the returned function
define ->
  push = Array.prototype.push

  (context, fn, args...) ->
    ->
      push.apply args, arguments
      fn.apply context, args

