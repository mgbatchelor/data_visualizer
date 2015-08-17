var Aggregate = Stapes.subclass({

  constructor : function() {
    this.data = {}
  },

  handleEvent : function(data) {
    if( !this.data[data.source] ) {
      this.data[data.source] = {};
    }
    if( !this.data[data.source][data.to] ) {
      this.data[data.source][data.to] = 0;
    }
    this.data[data.source][data.to] += 1;
    this.redraw();
  },

  redraw : function() {
    $('#data').html('');
    var data = this.data;
    Object.keys(data).forEach(function(from) {
      Object.keys(data[from]).forEach(function(to) {
        $('#data').append('<tr><td>' + from + '</td><td>' + to + '</td><td>' + data[from][to] + '</td></tr>');
      });
    });
  },

});
