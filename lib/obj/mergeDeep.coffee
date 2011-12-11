define ['util/typeOf'], (typeOf) ->

  merge = (target, extension) ->
    for own prop of extension
      if typeOf(extension[prop]) in ['object', 'array']
        mergeDeep target[prop], extension[prop]
      else
        target[prop] = extension[prop]

  # Deep merge of `extensions` into `target`
  mergeDeep = (target = {}, extensions...) ->
    merge target, extension for own extension in extensions
    target

