define ['obj/mergeDeep'], (mergeDeep) ->
  module 'obj/mergeDeep'

  test 'target object is returned and extended', ->
    target = {}
    merged = mergeDeep target, foo: 'bar'
    equal target.foo, 'bar', 'target was extended'
    strictEqual target, merged, 'target was returned'

  test 'multiple extensions are merged', ->
    one   = foo: 'one', bar: 'one', baz: 'one'
    two   = foo: 'two', bar: 'two'
    three = foo: 'three'

    merged = mergeDeep {}, one, two, three

    equal merged.foo, 'three'
    equal merged.bar, 'two'
    equal merged.baz, 'one'

  test 'objects are merged deep', ->
    target =
      uniq: 1
      foo:
        bar: 'baz'

    extension =
      foo:
        qux: 'quux'

    merged = mergeDeep target, extension

    equal merged.foo.qux, 'quux', 'qux merged'
    equal merged.foo.bar, 'baz', 'foo.bar was not blown away'

  test 'arrays are deep merged', ->
    target    = list: [ 1, 2 ]
    extension = list: [ 3 ]
    merged = mergeDeep target, extension

    equal merged.list[0], 3, 'index 0 overwritten'
    equal merged.list[1], 2, 'index 1 remains defined'

