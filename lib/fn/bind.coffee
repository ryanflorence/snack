define ->
  push = Array.prototype.push

  # sets the context of a `fn` to `context`, optionally prepends `args...`
  # to the returned function
  (context, fn, args...) ->
    ->
      push.apply args, arguments
      fn.apply context, args

