var Websocket = Stapes.subclass({

  constructor : function() {
    this.data = {}
  },

  process : function(msg) {
    this.emit('event', JSON.parse(msg));
  },

  event : function(status, message) {
    console.log(status + ' - ' + message);
  },

  connect : function(){
    if(!("WebSocket" in window)){
      this.event(-1, "Cannot use WebSockets")
    } else {
      var socket;
      try {
        socket = new WebSocket("ws://localhost:8080/");
        this.event(socket.readyState, "Begin");
        socket.onopen = function(){
          this.event(socket.readyState, "Open");
        }.bind(this);
        socket.onmessage = function(msg){
          this.process(msg.data);
        }.bind(this);
        socket.onclose = function(){
          this.event(socket.readyState, "Closed");
        }.bind(this);
      } catch(exception){
        this.event(socket.readyState, exception);
      }
    }
  }
});
