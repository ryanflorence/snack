$ = snack.wrap

$.define('tabs', function (linkSelector, panelSelector){
  /**
   * wrap.tabs
   *
   * Adds and removes the `current` class from a group of
   * tab navigation links and panels based upon hrefs and
   * matching IDs.  When a link within the container is
   * clicked and it's href matches the ID of a panel, the
   * appropriate nav link and panel will recieve the
   * `current` class, and previous items will lose it.
  */
  return this.each(function (node){
    var links = $(linkSelector, node)
      , panels = $(panelSelector, node)
      , current = 0
      , linkMap = {}

    panels.each(function (panel, index){
      linkMap[panel.getAttribute('id')] = index
    })

    $(node).delegate('click', 'a', handler)

    show(0)

    function handler (event, target){
      snack.preventDefault(event)
      var href = target.getAttribute('href', 2).replace('#', '')
      if (linkMap[href] != null)
        show(linkMap[href])
    }

    function show (index){
      // does nothing more than add and remove the `current` class
      // the way it displays lies completely with the stylesheet
      // so you can take advantage of CSS transitions or just simple
      // show / hide behavior w/ `z-index` or `display`
      $(panels[current]).removeClass('current')
      $(links[current]).removeClass('current')
      current = index
      $(panels[current]).addClass('current')
      $(links[current]).addClass('current')
    }
  })
})

snack.ready(function (){
  $('html').removeClass('no_js')
  $('#tabs').tabs('.links a', '.panel')
})
