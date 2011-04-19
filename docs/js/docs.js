var $ = snack.wrap

var searchInput = snack.publisher({
  init: function (input, delay){
    return snack.extend(this, {
      delay: delay || 1000,
      input: input,
      timer: null,
      listener: snack.listener({
        node: input,
        event: 'keyup'
      }, snack.bind(this.keyup, this))
    })
  },

  keyup: function (){
    var self = this
    clearTimeout(self.timer)
    self.timer = setTimeout(function (){
      self.input.select()
      self.publish('select', [self.input.value])
    }, self.delay)
    self.publish('keyup', [self.input.value])
  }
})

$.define({
  hide: function (){
    return this.each(function (element){
      element.style.display = 'none'
    })
  },

  show: function (){
    return this.each(function (element){
      element.style.display = ''
    })
  }
})

function init (){
  var docs = $('#docs')
    , terms = $('#terms')
    , items = $('#nav > li li')
    , headers = $('#nav h2')
    , searcher = Object.create(searchInput).init(terms[0])
    
  searcher.subscribe('keyup', search)
  terms.attach('click', searcher.listener.fire)

  function search (value){
    var matched = []
    if (value == ''){
      headers.show()
      items.show()
      return
    }
    headers.hide()
    items.each(function (item){
      if (check(item, value))
        matched.push(item)
    })
    if (matched.length)
      scrollDocs(matched[0])
  }

  function check (item, value){
    var text = item.textContent.toLowerCase()
    var match = text.indexOf(value.toLowerCase()) > -1
    $(item)[match ? 'show' : 'hide']()
    return match
  }

  function scrollDocs(to){
    var id = to.getElementsByTagName('a')[0].getAttribute('href')
      , top = document.getElementById(id.replace('#','')).offsetTop
    docs[0].scrollTop = top
  }

  terms[0].focus()
}

snack.ready(init)
