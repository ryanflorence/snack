define ['obj/create'], (create) ->

  test 'obj/create', ->
    parent = foo: 'foo'
    child = create parent
    strictEqual child.__proto__, parent, "parent is child's prototype"

