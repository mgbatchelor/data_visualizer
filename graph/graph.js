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

      layout: {
        name: 'cose',
        directed: true,
        roots: '#Pink',
        padding: 10
      }
    });
  },

  handleEvent : function(data) {
    if( !this.nodes[data.from_color] ) {
      this.cy.add({ group: "nodes", data: { id: data.from_color } });
      this.nodes[data.from_color] = data.id;
    }
    if( !this.nodes[data.to_color] ) {
      this.cy.add({ group: "nodes", data: { id: data.to_color } });
      this.nodes[data.to_color] = data.id;
    }
    var edge_key = data.from_color + data.to_color;
    if( !this.edges[edge_key] ) {
      var edge = this.cy.add({ group: "edges", data: { id: edge_key, source: data.from_color, target: data.to_color }});
      setTimeout(function(){
        edge.addClass('highlighted');
        setTimeout(function() {
          edge.removeClass('highlighted');
        }, 5000);
      });
      this.edges[edge_key] = data.id;
    }
    this.cy.layout({ name: 'cose' });
  }
});
