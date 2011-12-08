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

    type = string.slice 8, -1

    return 'element' if type.slice(-7) is 'Element'

    if type is 'Object'
      if item.nodeName
        return 'element' if item.nodeType is 1
        return 'textnode' if item.nodeType is 3

    'object'
