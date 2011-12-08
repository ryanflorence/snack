define ['fn/hitch'], (hitch) ->
  module 'fn/hitch'

  test 'hitches an object method', ->
    obj =
      getThis: -> @

    hitched = hitch obj, 'getThis'
    strictEqual hitched(), obj

  test 'prepending arguments', ->
    obj =
      concat: (strings...) ->
        strings.join ' '

    hitched = hitch obj, 'concat', 'foo', 'bar'
    equal hitched('baz'), 'foo bar baz', 'prepended args'

