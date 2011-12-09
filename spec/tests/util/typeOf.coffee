define ['util/typeOf'], (typeOf) ->

  module 'util/typeOf'

  test 'different types', ->
    cite = document.createElement 'cite'
    document.body.appendChild cite

    equal typeOf(undefined), 'undefined'
    equal typeOf(null), 'null'
    equal typeOf(document.createTextNode('')), 'textnode'
    equal typeOf([]), 'array'
    equal typeOf(''), 'string'
    equal typeOf(->), 'function'
    equal typeOf(new Date), 'date'
    equal typeOf(document.getElementsByTagName('cite')), 'nodelist'
    do -> equal typeOf(arguments), 'arguments'
    equal typeOf(//), 'regexp'
    equal typeOf(true), 'boolean'
    equal typeOf(false), 'boolean'
    equal typeOf(1), 'number'
    equal typeOf(cite), 'element'
    equal typeOf({}), 'object'
    equal typeOf(0: 1, length: 1), 'arraylike'

