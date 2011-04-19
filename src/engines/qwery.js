snack.qwery = qwery.noConflict()
snack.wrap.defineEngine(function (selector, context){
  return snack.qwery(selector, context);
})
