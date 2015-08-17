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
    if( !this.nodes[data.source] ) {
      this.cy.add({ group: "nodes", data: { id: data.source } });
      this.nodes[data.source] = data.id;
    }
    if( !this.nodes[data.destination] ) {
      this.cy.add({ group: "nodes", data: { id: data.destination } });
      this.nodes[data.destination] = data.id;
    }
    var edge_key = data.source + data.destination;
    if( !this.edges[edge_key] ) {
      var edge = this.cy.add({ group: "edges", data: { id: edge_key, source: data.source, target: data.destination }});
      setTimeout(function(){
        edge.addClass('highlighted');
        setTimeout(function() {
          edge.removeClass('highlighted');
        }, 1000);
      });
      this.edges[edge_key] = data.id;
    }
    this.cy.layout({name: 'circle'});
  }
});
