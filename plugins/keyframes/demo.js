var animation
snack.ready(function (){

  animation = snack.keyframes({
    node: document.getElementById('fixture'),
    frames: [0, 20, 40, 60, 80, 100],
    attr: 'data-frame',
    duration: 3000,
    loop: true,
    loopDelay: 500
  })

  animation.subscribe('start', function (){
    console.log('start')
  })

  var count = 0
  animation.subscribe('complete', function (){
    count++
    console.log('complete')
    if (count == 2)
      animation.stop()
  })

  animation.start()

})