define ['util/typeOf'], (typeOf) ->

  merge = (target, extension) ->
    for prop of extension when extension.hasOwnProperty(prop)
      if typeOf(extension[prop]) in ['object', 'array']
        mergeDeep target[prop], extension[prop]
      else
        target[prop] = extension[prop]

  # Deep merge of `extensions` into `target`
  mergeDeep = (target = {}, extensions...) ->
    for extension in extensions
      merge target, extension
    target

