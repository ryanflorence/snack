!function(snack, window, document){
  snack.JSONP = function(params, callback){
    // adapted from Zepto
    var jsonpString = 'jsonp' + snack.id()
      , script = document.createElement('script')
      , running = false

      snack.JSONP[jsonpString] = function(data){
        running = false
        delete snack.JSONP[jsonpString]
        callback(data)
      }

      if (typeof params.data == 'object')
        params.data = snack.toQueryString(params.data)

    var publik = {
      send: function (){
        running = true
        script.src = params.url + '?' + params.key + '=snack.JSONP.' + jsonpString + '&' + params.data
        document.getElementsByTagName('head')[0].appendChild(script)
      },

      cancel: function (){
        running && script.parentNode && script.parentNode.removeChild(script)
        running = false
        snack.JSONP[jsonpString] = function (){
          delete snack.JSONP[jsonpString]
        }
      }
    }

    if (params.now !== false)
      publik.send()

    return publik
  }

  snack.toQueryString = function(object, base){
    // adapted from MooTools
    var queryString = []

    snack.each(object, function(value, key){
      if (base)
        key = base + '[' + key + ']'

      var result

      switch (snack.isArray(value)){
        case 'object':
          result = snack.toQueryString(value, key)
        break
        case 'array':
          var qs = {}
          snack.each(value, function(val, i){
            qs[i] = val
          })
          result = snack.toQueryString(qs, key)
        break
        default: result = key + '=' + encodeURIComponent(value)
      }

      if (value !== null)
        queryString.push(result)
    })

    return queryString.join('&')
  }

  var xhrObject = (function(){
    // adapted from MooTools
    var XMLHTTP = function(){
      return new XMLHttpRequest();
    }

    var MSXML2 = function(){
      return new ActiveXObject('MSXML2.XMLHTTP');
    }

    var MSXML = function(){
      return new ActiveXObject('Microsoft.XMLHTTP');
    }

    try {
      XMLHTTP()
      return XMLHTTP
    } catch (e){
      try {
        MSXML2()
        return MSXML2
      } catch (e){
        MSXML()
        return MSXML
      }
    }
  })();

  function empty(){}

  snack.request = function (options, callback){
    // adapted from MooTools
    if (!(this instanceof snack.request))
      return new snack.request(options, callback)

    var self = this
    self.options = snack.extend({}, self.options, options)
    self.callback = callback
    self.xhr = new xhrObject
    self.headers = self.options.headers
    if (self.options.now !== false)
      self.send()
  }

  snack.request.prototype = {

    options: {/*
      user: '',
      password: '',*/
      exception: empty,
      url: '',
      data: '',
      method: 'get',
      now: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
      },
      async: true,
      emulation: true,
      urlEncoded: true,
      encoding: 'utf-8'
    },

    onStateChange: function(){
      var self = this
        , xhr = self.xhr

      if (xhr.readyState != 4 || !self.running) return
      self.running = false
      self.status = 0

      try{
        var status = xhr.status
        self.status = (status == 1223) ? 204 : status
      } catch(e) {}

      xhr.onreadystatechange = empty;

      var args = self.status >= 200 && self.status < 300
        ? [false, self.xhr.responseText || '', self.xhr.responseXML]
        : [self.status]

      self.callback.apply(self, args)
    },
  
    setHeader: function(name, value){
      this.headers[name] = value;
      return this;
    },

    getHeader: function(name){
      try {
        return this.xhr.getResponseHeader(name)
      } catch(e) {
        return null
      }
    },
  
    send: function(){
      var self = this
        , options = self.options

      if (self.running) return self;

      self.running = true;

      var data = options.data || ''
        , url = String(options.url)
        , method = options.method.toLowerCase()

      if (typeof data != 'string')
        data = snack.toQueryString(data)

      if (options.emulation && snack.indexOf(method, ['get', 'post']) < 0){
        var _method = '_method=' + method
        data = (data) ? _method + '&' + data : _method
        method = 'post'
      }

      if (options.urlEncoded && snack.indexOf(method, ['post', 'put']) > -1){
        var encoding = (options.encoding) ? '; charset=' + options.encoding : ''
        self.headers['Content-type'] = 'application/x-www-form-urlencoded' + encoding
      }

      if (!url)
        url = document.location.pathname

      var trimPosition = url.lastIndexOf('/')
      if (trimPosition > -1 && (trimPosition = url.indexOf('#')) > -1)
        url = url.substr(0, trimPosition)

      if (data && method == 'get'){
        url += (url.indexOf('?') > -1 ? '&' : '?') + data
        data = null
      }

      var xhr = self.xhr

      xhr.open(method.toUpperCase(), url, open.async, options.user, options.password)
      if (options.user && 'withCredentials' in xhr) xhr.withCredentials = true
    
      xhr.onreadystatechange = snack.bind(self.onStateChange, self)

      for (i in self.headers){
        try {
          xhr.setRequestHeader(i, self.headers[i])
        } catch (e){
          options.exception.apply(self, [i, self.headers[i]])
        }
      }

      xhr.send(data)
      if (!options.async) self.onStateChange()
    
      return self
    },

    cancel: function(){
      var self = this

      if (!self.running)
        return self

      self.running = false

      var xhr = self.xhr
      xhr.abort()

      xhr.onreadystatechange = empty

      self.xhr = new xhrObject()
      return self
    }
  }
}(snack, window, document)
