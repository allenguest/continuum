var LogicalDiagram = {
	_data : null,
	_container : null,
	_graph : ["nodes","links","groups"],
	init : function() {
		LogicalDiagram._graph.nodes = new Array();
		LogicalDiagram._graph.links = new Array();
		LogicalDiagram._graph.groups = new Array();
		for (var i=0;i<LogicalDiagram._data.components.length;i++)
		{
			var component = LogicalDiagram._data.components[i];
			LogicalDiagram._graph.nodes.push({name : component.acronym, width: 100, height: 60});
			if (component.dependsOn) {
				for (var j=0;j<component.dependsOn.length;j++) {
					LogicalDiagram._data.components.find(function(dependComponent) {
						if (component.dependsOn[j].endpointId.startsWith(dependComponent.acronym))
							LogicalDiagram._graph.links.push({source:i, target:j});
					});
				}
			}
		}

	},
	refresh : function() {
		$("#logicalDiagramCanvas").empty();
		var width = $(window).height() - 130,
			height = width;
			
		var color = d3.scale.category20();
			
		var c3 = cola.d3adaptor().
			linkDistance(200).
			avoidOverlaps(true).
			handleDisconnected(false).
			size([width, height]);

		var svg = d3.select("#logicalDiagramCanvas").append("svg")
			.attr("width", width)
			.attr("height", height)
			
		c3.nodes(LogicalDiagram._graph.nodes)
			.links(LogicalDiagram._graph.links)
			.groups(LogicalDiagram._graph.groups)
			.start();
		
		var group = svg.selectAll('.group')
			.data(LogicalDiagram._graph.groups)
			.enter().append("rect")
			.attr("rx", 8)
			.attr("ry", 8)
			.attr("class", "group")
			.style("fill", function(d, i) { return color(i); })
			.call(c3.drag);
			
		var link = svg.selectAll(".link")
            .data(LogicalDiagram._graph.links)
			.enter().append("line")
            .attr("class", "link");
			
		var pad = 1;
		var node = svg.selectAll(".node")
            .data(LogicalDiagram._graph.nodes)
			.enter().append("rect")
            .attr("class", "node")
            .attr("width", function (d) { return d.width - 2 * pad; })
            .attr("height", function (d) { return d.height - 2 * pad; })
            .attr("rx", 5).attr("ry", 5)
            .style("fill", function (d) { return color(LogicalDiagram._graph.groups.length); })
            .call(c3.drag);

        var label = svg.selectAll(".label")
            .data(LogicalDiagram._graph.nodes)
			.enter().append("text")
            .attr("class", "label")
            .text(function (d) { return d.name; })
            .call(c3.drag);

        node.append("title")
            .text(function (d) { return d.name; });

		c3.on("tick", function () {
            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node.attr("x", function (d) { return d.x - d.width / 2 + pad; })
                .attr("y", function (d) { return d.y - d.height / 2 + pad; });
            
            group.attr("x", function (d) { return d.bounds.x; })
                 .attr("y", function (d) { return d.bounds.y; })
                .attr("width", function (d) { return d.bounds.width(); })
                .attr("height", function (d) { return d.bounds.height(); });

            label.attr("x", function (d) { return d.x; })
                 .attr("y", function (d) {
                     var h = this.getBBox().height;
                     return d.y + h/4;
                 });
        });



	},
	render : function(container, data) {
		$(container).load("renderers/logicalDiagram.htm", function() {
			LogicalDiagram._data = data;
			LogicalDiagram._container = container;
			LogicalDiagram.init();
			LogicalDiagram.refresh();
		});
	}
}