# sets the context of a `fn` to `context`, optionally prepends `args...`
# (partial application) to the returned function
define ->
  push = Array.prototype.push

  (fn, context, args...) ->
    ->
      push.apply args, arguments
      fn.apply context, args
