define ['obj/merge'], (merge) ->

  module 'obj/merge'

  test 'target object is returned and extended', ->
    target = {}
    merged = merge target, foo: 'bar'
    equal target.foo, 'bar', 'target was extended'
    strictEqual target, merged, 'target was returned'


  test 'multiple extensions are merged', ->
    one   = foo: 'one', bar: 'one', baz: 'one'
    two   = foo: 'two', bar: 'two'
    three = foo: 'three'

    merged = merge {}, one, two, three

    equal merged.foo, 'three'
    equal merged.bar, 'two'
    equal merged.baz, 'one'

  test 'objects are merged shallow', ->
    target =
      uniq: 1
      foo:
        bar: 'baz'

    extension =
      foo:
        qux: 'quux'

    merged = merge target, extension

    equal merged.foo.qux, 'quux', 'qux merged'
    notEqual merged.foo.bar, 'baz', 'foo.bar blown away in shallow merge'
    equal merged.foo.bar, undefined, 'foo.bar undefined in shallow merge'

