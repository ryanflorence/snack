# returns a function bound to `obj` that calls obj's method `method`,
# optionally prepends `args` to returned function.
define ['fn/bind'], (bind) ->
  (obj, method, args...) -> bind obj, obj[method], args...

