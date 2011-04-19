// object template that selects an input after a delay in inactivity
var searchInput = {
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
      self.input.focus()
      self.input.select()
    }, self.delay)
    self.publish('keyup', [self.input.value])
  }
}

// make the object a publisher
snack.publisher(searchInput)

// domready
snack.ready(function (){
  var input = snack.wrap(document.getElementById('google-news'))
    , results = snack.wrap(document.getElementById('results'))
    , oldValue = ''
    , delayRequest
    , lastJSONP

  var search = Object.create(searchInput).init(input[0])

  // add a subscription since it's a publisher
  search.subscribe('keyup', fetch, results[0])

  // call keyup method directly to fetch first results
  search.keyup()

  // fetches the news results, but with some conditions
  function fetch (value){
    if (value.length < 3 || oldValue == value) // don't do anything
      return

    clearTimeout(delayRequest) // don't request if typing (250ms buffer)

    // cancel running JSONP request
    lastJSONP && lastJSONP.cancel()

    oldValue = value // store old value so we can check next keyup

    delayRequest = setTimeout(function (){
      results.addClass('loading')

      // snack.JSONP
      lastJSONP = snack.JSONP({
        url: 'https://ajax.googleapis.com/ajax/services/search/news',
        key: 'callback',
        data: { q: value, v: '1.0', rsz: 8 }
      }, updateNews)
    }, 250) // give us 250ms padding between keyups
  }

  // updates the results div with news
  function updateNews (res){
    var h = []
      , p = function (){ h.push.apply(h, arguments) }

    snack.each(res.responseData.results, function (story){
      var imgUrl = 'http://placekitten.com/80/60'
        , imgWidth = 80
        , imgHeight = 60

      if (story.image){
        imgUrl = story.image.tbUrl
        imgHeight = story.image.tbHeight
        imgWidth = story.image.tbWidth
      }

      // who needs templates when you have arrays?! :P
      p('<li>')
        p('<img src="'+imgUrl+'" widht="'+imgWidth+'" height="'+imgHeight+'">')
        p('<h1><a href="'+story.unescapedUrl+'">'+story.titleNoFormatting+'</a></h1>')

        p('<ul class=meta>')
          p('<li>'+story.publisher+'</li>')
          p('<li>'+story.publishedDate+'</li>')
        p('</ul>')

        p('<p>'+story.content+'</p>')

        if (story.relatedStories){
          p('<h2>Related Stories</h2>')
          p('<ul class=related>')
            snack.each(story.relatedStories, function (relStory){
              p('<li><a href="'+relStory.unescapedUrl+'">'+relStory.titleNoFormatting+'</a></li>')
            })
          p('</ul>')
        }
      p('</li>')
    })
    results[0].innerHTML = h.join('');
    results.removeClass('loading')
  }
})
