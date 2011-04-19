snack.wrap.defineEngine(function (selector, context){
  if (typeof context === 'string')
    context = Slick.search(document, context)[0]
  return Slick.search(context || document, selector)
})