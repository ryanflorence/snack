snack.wrap.defineEngine(function (selector, context){
  if (typeof context == 'string')
    context = Slick.find(document, context)
  return Slick.search(context || document, selector)
})
