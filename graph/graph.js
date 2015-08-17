var Graph = Stapes.subclass({

  constructor : function() {
    this.nodes = {};
    this.edges = {};
    this.cy = cytoscape({
      container: document.getElementById('graph'),
      style: cytoscape.stylesheet()
        .selector('node')
          .css({ 'content': 'data(id)' })
        .selector('edge')
          .css({
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
          })
        .selector('.highlighted')
          .css({
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color'
          }),

      layout: {name: 'circle'}
    });
  },

  handleEvent : function(data) {
    var needs_layout = false;
    if( !this.nodes[data.source] ) {
      var node = this.cy.add({ group: "nodes", data: { id: data.source } });
      needsLayout = true;
      this.nodes[data.source] = node;
    }
    if( !this.nodes[data.destination] ) {
      var node = this.cy.add({ group: "nodes", data: { id: data.destination } });
      needsLayout = true;
      this.nodes[data.destination] = node;
    }
    var edge_key = data.source + data.destination;
    if( !this.edges[edge_key] ) {
      var edge = this.cy.add({ group: "edges", data: { id: edge_key, source: data.source, target: data.destination }});
      needsLayout = true;
      this.edges[edge_key] = edge;
    }
    setTimeout(function(){
      this.edges[edge_key].addClass('highlighted');
      setTimeout(function() {
        this.edges[edge_key].removeClass('highlighted');
      }.bind(this), 500);
    }.bind(this));
    if( needsLayout ) {
      this.cy.layout({name: 'circle'});
    }
  }
});
