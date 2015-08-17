var Aggregate = Stapes.subclass({

  constructor : function() {
    this.data = {}
  },

  handleEvent : function(data) {
    if( !this.data[data.source] ) {
      this.data[data.source] = {};
    }
    if( !this.data[data.source][data.destination] ) {
      this.data[data.source][data.destination] = 0;
    }
    this.data[data.source][data.destination] += 1;
    this.redraw();
  },

  redraw : function() {
    $('#data').html('');
    var data = this.data;
    Object.keys(data).forEach(function(source) {
      Object.keys(data[source]).forEach(function(destination) {
        $('#data').append('<tr><td>' + source + '</td><td>' + destination + '</td><td>' + data[source][destination] + '</td></tr>');
      });
    });
  },

});
