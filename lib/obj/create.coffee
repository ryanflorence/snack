# Creates a new object that inherits from `proto`
define ->
  (proto) ->
    F = ->
    F.prototype = proto
    new F

