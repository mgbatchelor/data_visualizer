var Websocket = Stapes.subclass({

  constructor : function() {
    this.data = {}
  },

  redraw : function() {
    $('#data').html('');
    var data = this.data;
    Object.keys(data).forEach(function(from_color) {
      Object.keys(data[from_color]).forEach(function(to_color) {
        $('#data').append('<tr><td>' + from_color + '</td><td>' + to_color + '</td><td>' + data[from_color][to_color] + '</td></tr>');
      });
    });
  },

  process : function(msg) {
    var payload = JSON.parse(msg);
    this.emit('event', payload);
    this.log(msg);
    if( !this.data[payload.from_color] ) {
      this.data[payload.from_color] = {};
    }
    if( !this.data[payload.from_color][payload.to_color] ) {
      this.data[payload.from_color][payload.to_color] = 0;
    }
    this.data[payload.from_color][payload.to_color] += 1;
    this.redraw();
  },

  log : function(message) {
    $('#chatLog').append('<p class="message">' + message + '</p>');
  },

  event : function(status, message) {
    $('#chatLog').append('<p class="event">' + status + ' - ' + message + '</p>');
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
