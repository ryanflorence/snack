define ['fn/bind'], (bind) ->

  module 'fn/bind'
  test 'setting the context of a function', ->
    obj = x: 2
    bound = bind obj, -> @
    strictEqual bound(), obj, 'set context to obj'

  test 'prepend arguments', ->
    concat = (strings...) ->
      strings.join ' '

    bound = bind {}, concat, 'foo', 'bar'
    equal bound(), 'foo bar'
    equal bound('baz'), 'foo bar baz'
