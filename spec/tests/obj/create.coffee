define ['obj/create'], (create) ->
  module 'obj/create'

  test 'objects inheriting from objects', ->
    parent = foo: 'foo'
    child = create parent
    strictEqual child.__proto__, parent, "parent is child's prototype"

