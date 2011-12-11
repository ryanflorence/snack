# Shallow merge of `extensions` into `target`
define ->
  (target, extensions...) ->
    target[prop] = ext[prop] for own prop of ext for ext in extensions
    target

