define ->

  # Creates a new object that inherits from `proto`
  (proto) ->
    F = ->
    F.prototype = proto
    new F

