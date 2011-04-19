var express = require('express')
  , app = module.exports = express.createServer()
  , port = process.argv[2] || 3000
  , fs = require('fs');

app.configure(function(){
  app.use(express.bodyDecoder())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.staticProvider(__dirname))
})

app.get('/echo', function(req, res){
  console.log('/GET echo')
  console.log(req.query)
  console.log("\n")
  res.send('get ' + (req.query.echo || 'no data'))
})

app.post('/echo', function(req, res){
  console.log('/POST echo')
  console.log(req.body)
  console.log("\n")
  res.send('post ' + (req.body.echo || 'no data'))
})

app.put('/echo', function(req, res){
  console.log('/PUT echo')
  console.log(req.body)
  console.log("\n")
  res.send('put ' + (req.body.echo || 'no data'))
})

app.del('/echo', function(req, res){
  console.log('/DELETE echo')
  console.log(req.body)
  console.log("\n")
  res.send('delete ' + (req.body.echo || 'no data'))
})

app.get('/json', function (req, res){
  console.log('/GET json')
  console.log("\n")
  res.send({result: 'json success'})
})

app.get('/jsonp', function (req, res){
  console.log('/GET jsonp')
  console.log(req.query)
  console.log("\n")
  var callback = req.query.callback
  delete req.query.callback
  var text = "// jsonp response\n" + callback + '(' + JSON.stringify(req.query) + ')'
  res.contentType('text/javascript')
  res.send(text)
})

app.get('/jsonp-cancel', function (req, res){
  console.log('/GET jsonp')
  console.log(req.query)
  console.log("\n")
  var callback = req.query.callback
  delete req.query.callback
  var text = "// jsonp response\n" + callback + '(' + JSON.stringify(req.query) + ')'
  res.contentType('text/javascript')
  setTimeout(function (){
    res.send(text)
  }, 1000)
  
})

app.get('/500', function (req, res){
  console.log("/GET 500")
  console.log("\n")
  res.send('500', 500)
})

// need to make this dynamic
app.get('/demos/', function (req, res){
  res.send("<!doctype html><html><head><title>Snack</title></head><body><ul><li><a href='/demos/jsonp/'>jsonp</a></li><li><a href='/demos/tabs/'>tabs</a></li></ul></body></html>")
})

app.get('/', function (req, res){
  res.send("<!doctype html><html><head><title>Snack</title></head><body><ul><li><a href='/tests/'>Tests</a></li><li><a href='/docs/'>Documentation</a></li><li><a href='/demos/'>Demos</a></li></ul></body></html>")
})

if (!module.parent) {
  app.listen(port)
  console.log("# Express test server running, ctrl + C to shutdown")
  console.log("# Point your browser to http://localhost:%d/", app.address().port)
}
