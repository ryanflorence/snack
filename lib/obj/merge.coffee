# Shallow merge of `extensions` into `target`
define ->
  (target, extensions...) ->
    for ext in extensions
      for prop of ext when ext.hasOwnProperty(prop)
        target[prop] = ext[prop]
    target

