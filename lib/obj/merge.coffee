# Shallow merge of `extensions` into `target`
define ->
  (target, extensions...) ->
    for ext in extensions
      target[prop] = ext[prop] for own prop of ext
    target

