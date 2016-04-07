var LogicalDiagram = {
	_data : null,
	_container : null,
	_colorData : [],
	_graph : ["nodes","links","groups"],
	_searchText : "",
	init : function() {
		LogicalDiagram._colorData.push({acronym: "AIS", color: "#399397"});
		LogicalDiagram._colorData.push({acronym: "AccSync", color: "#404040"});
		LogicalDiagram._colorData.push({acronym: "BRM", color: "#00B0F0"});
		LogicalDiagram._colorData.push({acronym: "BRMSOA", color: "#00B0F0"});
		LogicalDiagram._colorData.push({acronym: "CDI", color: "#44546A"});
		LogicalDiagram._colorData.push({acronym: "CBS", color: "#404040"});
		LogicalDiagram._colorData.push({acronym: "CDC", color: "#606060"});
		LogicalDiagram._colorData.push({acronym: "CPE", color: "#44546A"});
		LogicalDiagram._colorData.push({acronym: "CRED-SVC", color: "#ED7D31"});
		LogicalDiagram._colorData.push({acronym: "ESB", color: "#7030A0"});
		LogicalDiagram._colorData.push({acronym: "EMS", color: "#ED7D31"});
		LogicalDiagram._colorData.push({acronym: "FFM", color: "#ED7D31"});
		LogicalDiagram._colorData.push({acronym: "FFMSOA", color: "#ED7D31"});
		LogicalDiagram._colorData.push({acronym: "HPSA", color: "#4472C4"});
		LogicalDiagram._colorData.push({acronym: "JMS", color: "#7030A0"});
		LogicalDiagram._colorData.push({acronym: "LMS", color: "#C02020"});
		LogicalDiagram._colorData.push({acronym: "MyAcc", color: "#ED7D31"});
		LogicalDiagram._colorData.push({acronym: "NSA", color: "#399397"});
		LogicalDiagram._colorData.push({acronym: "OE", color: "#70AD47"});
		LogicalDiagram._colorData.push({acronym: "OM", color: "#70AD47"});
		LogicalDiagram._colorData.push({acronym: "PC", color: "#4472C4"});
		LogicalDiagram._colorData.push({acronym: "PIM", color: "#70AD47"});
		LogicalDiagram._colorData.push({acronym: "SecMtx", color: "#ED7D31"});
		LogicalDiagram._colorData.push({acronym: "TN", color: "#44546A"});
		LogicalDiagram._colorData.push({acronym: "TSS", color: "#C02020"});
		LogicalDiagram._colorData.push({acronym: "TVSC", color: "#A04040"});
		LogicalDiagram._colorData.push({acronym: "UDGF", color: "#ED7D31"});
		LogicalDiagram._graph.nodes = new Array();
		LogicalDiagram._graph.links = new Array();
		LogicalDiagram._graph.groups = new Array();
		for (var i=0;i<LogicalDiagram._data.components.length;i++)
		{
			var component = LogicalDiagram._data.components[i];
			LogicalDiagram._graph.nodes.push({name : component.acronym, width: 80, height: 40});
			if (component.dependsOn) {
				for (var j=0;j<component.dependsOn.length;j++) {
					LogicalDiagram._data.components.find(function(dependComponent) {
						if (component.dependsOn[j].endpointId.startsWith(dependComponent.acronym)) {
							var t = LogicalDiagram._data.components.indexOf(dependComponent	);
							LogicalDiagram._graph.links.pushIfUnique({source:i, target:t}, function(e) {
								return LogicalDiagram._data.components[e.source].acronym === component.acronym && 
									LogicalDiagram._data.components[e.target].acronym === dependComponent.acronym;
							});
						}
					});
				}
			}
		}

	},
	refresh : function() {
		$("#logicalDiagramCanvas").empty();
		var width = $(window).height() - 60,
			height = width;
			
		var c3 = cola.d3adaptor().
			linkDistance(150).
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
			
		svg.append("defs").append("marker")
			.attr("id", "arrowhead")
			.attr("refX", 6 + 3) /*must be smarter way to calculate shift*/
			.attr("refY", 2)
			.attr("markerWidth", 6)
			.attr("markerHeight", 4)
			.attr("orient", "auto")
			.append("path")
			.attr("d", "M 0,0 V 4 L6,2 Z"); //this is actual shape for arrowhead
		
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
            .attr("class", "link")
			.style("marker-end", "url(#arrowhead)")
			.on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") })
			.on("mouseover", function(d) {
				d3.select("#tooltip").
				 style("visibility", "visible").
				 html(LogicalDiagram.linkTip(d)).
				 style("top", function () { return (d3.event.pageY)+"px"}).
				 style("left", function () { return (d3.event.pageX)+"px";})
			});
			
		var pad = 1;
		var node = svg.selectAll(".node")
            .data(LogicalDiagram._graph.nodes)
			.enter().append("rect")
            .attr("class", "node")
            .attr("width", function (d) { return d.width - 2 * pad; })
            .attr("height", function (d) { return d.height - 2 * pad; })
            .attr("rx", 5).attr("ry", 5)
            .style("fill", function (d) { 
				var component = LogicalDiagram._data.components.find(function(e) { return e.acronym === d.name });
				if (component.services && component.services.length > 0) {
					for (var j=0;j<component.services.length;j++) {				
						if (LogicalDiagram.findSearchMatchesForService(component.services[j])) {
							return "#33FF33";
						}
					}
				}
				var colorObj = LogicalDiagram._colorData.find(function(e) {	return e.acronym === d.name; });
				if (colorObj) return colorObj.color; else return "#888888";
			})
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
	},
	linkTip : function(link) {
		return link.source.name + " depends on " + link.target.name;
	},
	findSearchMatchesForService : function(service) {
		// search id, description, endpointSig and tags
		if (LogicalDiagram._searchText.length > 2) {
			if (LogicalDiagram.findSearchMatch([service.id])) return true;
			if (LogicalDiagram.findSearchMatch([service.description])) return true;
			if (LogicalDiagram.findSearchMatch([service.endpointSig])) return true;
			if (LogicalDiagram.findSearchMatch(service.tags)) return true;
		}
		return false;
	},
	findSearchMatch : function(list) {
		if (list && list.length > 0)
			return list.find(function(e) { return e.indexOfInsensitive(LogicalDiagram._searchText) > -1; });
		else return false;
	},
	setSearchText : function(text) {
		LogicalDiagram._searchText = text;
	},
	searchFor : function(text) {
		LogicalDiagram.setSearchText(text);
		LogicalDiagram.render(LogicalDiagram._container, LogicalDiagram._data);
	}
}