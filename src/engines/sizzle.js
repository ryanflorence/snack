snack.wrap.defineEngine(function (selector, context){
  if (typeof context == 'string')
    context = Sizzle(context)[0]
  return Sizzle(selector, context)
})
