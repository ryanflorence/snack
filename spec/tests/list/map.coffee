define ['obj/create', 'list/map'], (create, map) ->
  module 'list/map'

  test 'mapping an array', 6, ->
    ary = [1, 2]

    returns = map ary, (item, index, list) ->
      strictEqual list, ary, 'list is ary'
      equal item, ary[index], 'item and index are correct'
      item + 1

    deepEqual returns, [2, 3], 'returns mapped array'

    context = {}
    iterator = -> strictEqual @, context
    map [1], iterator, context

  test 'mapping an object', 6, ->
    obj = foo: 'bar', baz: 'quux'

    returns = map obj, (value, key, list) ->
      strictEqual list, obj, 'list is obj'
      equal value, obj[key], 'value and key are correct'
      value + '-'

    expected = foo: 'bar-', baz: 'quux-'
    deepEqual returns, expected, 'returns mapped obj'

    context = {}
    iterator = -> strictEqual @, context
    map foo: 1, iterator, context

  test 'mapping an array-like object', 8, ->
    ary = 0: 'bar', 1: 'quux', length: 2

    returns = map ary, (item, index, list) ->
      strictEqual list, ary, 'list is ary'
      equal item, ary[index], 'item and index are correct'
      item + '-'

    expected = 0: 'bar-', 1: 'quux-', length: 2
    deepEqual returns, expected, 'returns mapped ary'

    context = {}
    iterator = -> strictEqual @, context
    map 0: 1, iterator, context

    obj = 0: 'foo', 2: 'bar', length: 3
    map obj, (item, index) ->
      equal item, obj[index], 'messy objects should not freak out'

  test 'mapping should ignore prototype properties', ->
    parent = foo: 'bar'
    child = create parent
    child.bar = 'baz'
    equal child.foo, 'bar', 'child inherited properly'

    count = 0
    map child, -> count++
    equal count, 1, 'iterated only once, prototype properties ignored'

  test 'mapping a string', 9, ->
    str = 'foo'

    returns = map str, (letter, index, list) ->
      strictEqual list, str, 'list is ary'
      equal letter, str[index], 'item and index are correct'
      'z'

    equal returns, 'zzz', 'returns mapped string'

    context = {}
    iterator = -> strictEqual @, context
    map 'hi', iterator, context

