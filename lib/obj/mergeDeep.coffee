define ['util/typeOf'], (typeOf) ->
  deepTypes = ['object', 'array']

  merge = (target, extension) ->
    for own prop of extension
      if typeOf(extension[prop]) in deepTypes
        mergeDeep target[prop], extension[prop]
      else
        target[prop] = extension[prop]

  # Deep merge of `extensions` into `target`
  mergeDeep = (target = {}, extensions...) ->
    merge target, extension for own extension in extensions
    target

