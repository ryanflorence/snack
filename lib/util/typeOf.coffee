define ->
  toString = Object.prototype.toString
  types =
    '[object Undefined]': 'undefined'
    '[object Null]': 'null'
    '[object Text]': 'textnode'
    '[object Array]': 'array'
    '[object String]': 'string'
    '[object Function]': 'function'
    '[object Date]': 'date'
    '[object NodeList]': 'nodelist'
    '[object Arguments]': 'arguments'
    '[object RegExp]': 'regexp'
    '[object Boolean]': 'boolean'
    '[object Number]': 'number'

  (item) ->
    string = toString.call item
    type = types[string]

    return type if type

    # get rid of [object ... ]
    type = string.slice 8, -1

    # get rid of HTMLDiv in HTMLDivElement and such
    return 'element' if type.slice(-7) is 'Element'

    if type is 'Object'
      # forgot what these are, honestly :\
      if item.nodeName
        return 'element' if item.nodeType is 1
        return 'textnode' if item.nodeType is 3

      # stuff like { 0: 'foo', 1: 'stuff', length: 2 }
      return 'arraylike' if item.length?

    # PhantomJS thinks both of these are object
    return 'undefined' if item is undefined
    return 'null' if item is null

    # ¯\(º o)/¯
    'object'
