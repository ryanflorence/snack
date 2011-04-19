!function (snack){
  snack.keyframes = function (params){
    var stop = false

    return snack.publisher({
      set: function (frame){
        params.node.setAttribute(params.attr || 'data-frame', frame)
      },

      start: function (){
        var self = this
        self.publish('start')
        stop = false
        snack.each(params.frames, function (frame, index, arr){
          var duration = params.duration * (frame / 100)
          setTimeout(function (){
            self.set(frame)
            if (index + 1 === arr.length){
              self.publish('complete')
              if (params.loop && !stop)
                self.start()
            }
          }, duration)
        })
      },

      stop: function (){
        stop = true
        this.publish('stop')
      }
    })
  }
}(snack)
