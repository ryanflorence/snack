define ['obj/create', 'list/each'], (create, each) ->
  module 'list/each'

  test 'iterating an array', 6, ->
    ary = [1, 2]

    returns = each ary, (item, index, list) ->
      strictEqual list, ary, 'list is ary'
      equal item, ary[index], 'item and index are correct'

    strictEqual returns, ary, 'returns ary'

    context = {}
    iterator = -> strictEqual @, context
    each [1], iterator, context

  test 'iterating an object', 6, ->
    obj = foo: 'bar', baz: 'quux'

    returns = each obj, (value, key, list) ->
      strictEqual list, obj, 'list is obj'
      equal value, obj[key], 'value and key are correct'

    strictEqual returns, obj, 'returns obj'

    context = {}
    iterator = -> strictEqual @, context
    each foo: 1, iterator, context

  test 'iterating an array-like object', 8, ->
    ary = 0: 'bar', 1: 'quux', length: 2

    returns = each ary, (item, index, list) ->
      strictEqual list, ary, 'list is ary'
      equal item, ary[index], 'item and index are correct'

    strictEqual returns, ary, 'returns ary'

    context = {}
    iterator = -> strictEqual @, context
    each 0: 1, iterator, context

    obj = 0: 'foo', 2: 'bar', length: 3
    each obj, (item, index) ->
      equal item, obj[index], 'messy objects should not freak out'

  test 'iterating should ignore prototype properties', ->
    parent = foo: 'bar'
    child = create parent
    child.bar = 'baz'
    equal child.foo, 'bar', 'child inherited properly'

    count = 0
    each child, -> count++
    equal count, 1, 'iterated only once, prototype properties ignored'

  test 'iterating strings', 2, ->
    str = 'hi'
    each str, (item, index) ->
      equal item, str[index], 'item and index are correct'

