/**
 * Setup
*/

// can namespace it if you like
var $ = snack.wrap

// Change the url to contain ?engine=[name] to change the selector engine
var engine = location.search.match(/engine=(.+)/)
setEngine(engine && engine[1])

function setEngine(engine){
  /**
   * Sets the selector engine to run the tests with
  */
  switch(engine){
    case 'slick':
      // use slick as the selector engine
      snack.wrap.defineEngine(function (selector, context){
        if (typeof context === 'string')
          context = Slick.search(document, context)[0]
        return Slick.search(context || document, selector)
      })
      msg('slick')
    break;
    
    case 'QSA':
    break;
    
    case 'sizzle':
      // use sizzle
      snack.wrap.defineEngine(function (selector, context){
        if (typeof context === 'string')
          context = Sizzle(context)[0]
        return Sizzle(selector, context)
      })
      msg('sizzle')
    break;
    
    default:
      // use qwery as the selector engine
      snack.wrap.defineEngine(function (selector, context){
        return qwery(selector, context)
      })
      msg('qwery')
    break;
  }
}

function msg (msg){
  document.getElementById('engine').innerHTML = msg;
}

function simulateClick (element){
  if (!document.createEvent){
    element.click() // IE
    return
  }

  var e = document.createEvent("MouseEvents")
  e.initEvent("click", true, true)
  element.dispatchEvent(e)
}

/**
 * Tests
*/





module('core')
test('indexOf', function (){
  var a = function (){}
    , b = function (){}
    , c = 'letter c'
    , d = 123
    , e = false
    , f = null
    , g = undefined
    , arr = [a,b,c,d,e,f,g]

  equal(snack.indexOf(a, arr), 0)
  equal(snack.indexOf(b, arr), 1)
  equal(snack.indexOf(c, arr), 2)
  equal(snack.indexOf(d, arr), 3)
  equal(snack.indexOf(e, arr), 4)
  equal(snack.indexOf(f, arr), 5)
  equal(snack.indexOf(g, arr), 6)

})

test('bind should', function (){
  var obj = { x: 2 }

  function este (){
    return this.x
  }

  function add (y){
    return this.x + y
  }

  var bound = snack.bind(este, obj)
  equal(bound(), 2, 'set the context of a function to an object')

  var bound = snack.bind(add, obj, [3])
  equal(bound(), 5, 'apply new arguments if defined')
})




test('punch should', function (){
  var widget = {
    a: 0,
    b: 0,
    add: function (amt){
      this.a += amt
    }
  }

  snack.punch(widget, 'add', function (old, amt){
    old(amt)
    this.b += amt
  })
  widget.add(1)
  equal(widget.a, 1, 'call the old method')
  equal(widget.b, 1, 'call the new method')

  snack.punch(widget, 'add', function (){}, true)
  widget.add(1)
  equal(widget.a, 2, 'call the really old method automatically')
  equal(widget.b, 2, 'call the old method automatically')

  snack.punch(widget, 'add', function (old){
    return this.a + this.b
  })
  var result = widget.add(1)
  equal(result, 4, 'should return what the new function returns')
})

test('create should', function (){
  var obj = {
    inheritedProp: 'foo',
    overwrittenProp: 'foo',
    inherited: function (){
      return 'foo'
    },
    punched: function (x, y){
      return x + y
    }
  }

  var newObj = snack.create(obj, {
    newProp: 'bar',
    overwrittenProp: 'bar',
    punched: function (old, x, y){
      return old(x, y) * 2
    },
    newFn: function (){
      return 'foo'
    }
  })

  equal(newObj.newProp, 'bar', 'add new properties')
  equal(newObj.overwrittenProp, 'bar', 'overwrite existing properties')
  equal(newObj.inheritedProp, 'foo', 'inherit properties')

  equal(newObj.newFn(), 'foo', 'should add new methods')
  equal(newObj.punched(2,3), 10, 'should punch existing methods, mainting previous signature')
  equal(newObj.inherited(), 'foo', 'should inherit methods')
})



module('event')
asyncTest('ready should', 2, function (){
  // this test doesn't really test the effectiveness of simulating
  // DOMContentLoaded, just that snack's implementation of the code
  // is actually firing
  snack.ready(function (){
    ok(true, 'fire')
    
    var immediate = false
    snack.ready(function (){
      immediate = true
    })
    ok(immediate, 'fire immediately if dom is already ready')

    start()
  })
})

test('a listener should', function (){

  var fixture = document.getElementById('fixture')
    , c = 0

  // api: snack.listener object creation
  var listener = snack.listener({
    node: fixture,
    event: 'click'
  }, function (event){
    c++
  })

  simulateClick(fixture)
  equal(c, 1, 'attach to an element and call the handler upon event')

  listener.detach() // api
  simulateClick(fixture)
  equal(c, 1, 'be detachable')

  listener.attach() // api
  simulateClick(fixture)
  equal(c, 2, 'be attachable')

  listener.fire() // api
  equal(c, 3, 'be fireable')

  listener.detach()
})

test('a listener that delegates with a function should', function (){

  var fixture = document.getElementById('fixture')
    , delegatee = document.getElementById('delegatee')
    , notDelegatee = document.getElementById('notDelegatee')
    , c = 0

  // api: event delegation w/o a selector engine
var listener = snack.listener({
  node: fixture,
  event: 'click',
  delegate: function (node){
    // return a collection or array of elements
    return node.getElementsByTagName('a')
  }
}, function (event){
  c++
})

  simulateClick(delegatee)
  equal(c, 1, 'delegate events')

  simulateClick(fixture)
  equal(c, 1, 'not fire when self is clicked')

  simulateClick(notDelegatee)
  equal(c, 1, 'not fire when non-matching elements are clicked')

  listener.detach()
})

test('a listener that delegates with a css string should', function (){

  var fixture = document.getElementById('fixture')
    , delegatee = document.getElementById('delegatee')
    , notDelegatee = document.getElementById('notDelegatee')
    , c = 0

  // api: event delegation w/o a selector engine
  var listener = snack.listener({
    node: fixture,
    event: 'click',
    delegate: 'a'
  }, function (event){
    c++
  })

  simulateClick(delegatee)
  equal(c, 1, 'delegate events')

  simulateClick(fixture)
  equal(c, 1, 'not fire when self is clicked')

  simulateClick(notDelegatee)
  equal(c, 1, 'not fire when non-matching elements are clicked')

  listener.detach()
})

test('preventDefault should', function (){
  var el = document.getElementById('preventDefault')

  snack.listener({
    node: el,
    event: 'click'
  }, function (event){
    snack.preventDefault(event)
  })

  simulateClick(el)

  equal(location.hash, '', 'prevent the default event')
})

test('stopPropagation should', function (){
  var el = document.getElementById('stopPropagation')

  snack.listener({
    node: el,
    event: 'click'
  }, function (event){
    snack.preventDefault(event)
  })

  simulateClick(el)

  notEqual(location.hash, '#fail', 'prevent bubbling')
})

module('publisher')
test('a publisher object', function (){

  var publisher = snack.publisher()
    , obj = {}
    , c = 0

  // api
  var subscription = publisher.subscribe('awesome', function (arg1, arg2){
    c++
    equal(arg1, 'arg', 'arguments should be applied to handler')
    equal(arg2, 'arg2', 'arguments should be applied to handler')
    equal(obj, obj, 'should set the context')
  }, obj)

  // api
  var sub2 = publisher.subscribe('awesome', function (){
    c++
  })

  // api
  publisher.publish('awesome', ['arg', 'arg2'])
  equal(c, 2, 'all subscribe handlers should be called')

  // api
  subscription.detach()
  sub2.detach()
  publisher.publish('awesome')
  equal(c, 2, 'unsubscribed handlers should not be called')

  // api
  sub2.attach()
  publisher.publish('awesome', ['arg'])
  equal(c, 3, 'resubscribed handlers should be called')

  publisher.publish('awesome')
  equal(c, 4, 'handlers should not throw errors when called w/o arguments') // IE fn.apply(context, argsArray)
})

module('element', {
  setup: function (){
    this.wrap = $('#fixture')
  }
})

test('data', function (){
  var wrap = this.wrap
  equal(wrap.data('foo'), undefined, 'should return undefined if no data is there')
  equal(wrap.data('foo', 'bar'), 'bar', 'should return data when set')
  equal(wrap.data('foo'), 'bar', 'should store and retrieve data')
})

test('addClass', function (){
  var wrap = this.wrap

  wrap[0].className = '' // clear out any classes

  wrap.addClass('foo')
  equal(wrap[0].className, 'foo', 'addClass should add a class')

  wrap.addClass('bar')
  equal(wrap[0].className, 'foo bar', 'addClass should append classes')
})

test('removeClass', function (){
  this.wrap[0].className = '';
  this.wrap.addClass('foo bar')
  this.wrap.removeClass('foo')
  equal(this.wrap[0].className, 'bar', 'removeClass should remove a class and clean whitespace')
})

test('listener', function (){
  var wrap = this.wrap
    , c = 0

  wrap.attach('click.foo', function (){
    c++
  })

  simulateClick(wrap[0])
  equal(c, 1, 'namespaced events should be added')

  wrap.fire('foo')
  equal(c, 2, 'namespaced events should be fired')

  wrap.detach('foo')
  simulateClick(wrap[0])
  equal(c, 2, 'detach should remove namespaced events')

  wrap.fire('foo')
  equal(c, 2, 'namespaced events should not be fired after being detached')
})



module('ajax')
asyncTest('a snack.request object', 2, function (){
  var c = 0

  function finish (){
    if (++c == 2)
      start()
  }

  snack.request({
    url: '/echo',
    method: 'get',
    data: 'echo=success'
  }, function (err, text){
    equal(text, 'get success', 'should pass response text to success callback and accept a query string for data')
    finish()
  })

  snack.request({
    url: '/500',
    method: 'get'
  }, function (err){
    equal(err, 500, 'should pass error to callback on 500')
    finish()
  })

})


asyncTest('snack.JSONP', 2, function (){

  var params = {
    url: '/jsonp',
    key: 'callback',
    data: {foo: 'bar', baz: 'quux'}
  }

  snack.JSONP(params, function (obj){
    ok(true, 'should fire the callback')
    deepEqual("foo=bar&baz=quux", params.data, 'callback should provide object as argument')
    start()
  })
})

test('snack.JSONP cancel (should not assert anything)', function (){

  var req = snack.JSONP({
    url: '/jsonp-cancel',
    key: 'callback'
  }, function (){
    // server.js still sends this, some browsers still get the script
    // but it should be removed from the DOM
    ok(false, 'Should not fire success')
  })

  req.cancel()
})
