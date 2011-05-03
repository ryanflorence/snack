/*!
  * snack.js (c) Ryan Florence
  * https://github.com/rpflorence/snack
  * MIT License
  * Inspiration and code adapted from
  *  MooTools      (c) Valerio Proietti   MIT license
  *  jQuery        (c) John Resig         Dual license MIT or GPL Version 2
  *  contentLoaded (c) Diego Perini       MIT License
  *  Zepto.js      (c) Thomas Fuchs       MIT License
*/

if (typeof Object.create != 'function'){
  // ES5 Obeject.create
  Object.create = function (o){
    function F() {}
    F.prototype = o
    return new F
  }
}

!function(window){
  var snack = window.snack = {}
    , guid = 0
    , toString = Object.prototype.toString
    , indexOf = Array.prototype.indexOf

  snack.extend = function (){
    if (arguments.length == 1)
      return snack.extend(snack, arguments[0])

    var target = arguments[0]

    for (var i = 1, l = arguments.length; i < l; i++)
      for (key in arguments[i])
        target[key] = arguments[i][key]

    return target
  }

  snack.extend({
    v: '1.2.0',

    bind: function (fn, context, args) {
      return function (){
        return fn.apply(context, args || arguments)
      }
    },

    punch: function (obj, method, fn, auto){
      var old = obj[method]
      obj[method] = auto ? function (){
        old.apply(obj, arguments)
        return fn.apply(obj, arguments)
      } : function (){
        var args = [].slice.call(arguments, 0)
        args.unshift(snack.bind(old, obj))
        return fn.apply(obj, args)
      }
    },

    create: function (proto, ext){
      var obj = Object.create(proto)
      if (!ext)
        return obj

      for (i in ext) {
        if (!ext.hasOwnProperty(i))
          continue

        if (!proto[i] || typeof ext[i] != 'function'){
          obj[i] = ext[i]
          continue
        }

        snack.punch(obj, i, ext[i])
      }

      return obj
    },

    id: function (){
      return ++guid
    },

    each: function (obj, fn, context){
      if (obj.length === void+0){ // loose check for object, we want array-like objects to be treated as arrays
        for (var key in obj)
          if (obj.hasOwnProperty(key))
            fn.call(context, obj[key], key, obj);
        return obj
      }

      for (var i = 0, l = obj.length; i < l; i++)
        fn.call(context, obj[i], i, obj)
      return obj
    },

    parseJSON: function(json) {
      // adapted from jQuery
      if (typeof json != 'string')
        return

      json = json.replace(/^\s+|\s+$/g, '')

      var isValid = /^[\],:{}\s]*$/.test(json.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ""))

      if (!isValid)
        throw "Invalid JSON"
      
      var JSON = window.JSON // saves a couple bytes
      return JSON && JSON.parse ? JSON.parse(json) : (new Function("return " + json))()
    },

    isArray: function (obj){
      return obj instanceof Array || toString.call(obj) == "[object Array]"
    },

    indexOf: indexOf ? function(item, array){
        return indexOf.call(array, item)
      } : function (item, array){
      for (var i = 0, l = array.length; i < l; i++)
        if (array[i] === item)
          return i

      return -1
    }
  })
}(window);
