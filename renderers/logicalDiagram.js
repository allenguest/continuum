var LogicalDiagram = {
	_data : null,
	_container : null,
	_colorData : [],
	_graph : ["options","nodes","links","groups"],
	_searchText : "",
	_path : null,
	_circle : null,
	_text : null,
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
		LogicalDiagram._graph.options = new Array();
		
		for (var i=0;i<LogicalDiagram._data.components.length;i++)
		{
			var component = LogicalDiagram._data.components[i];
			LogicalDiagram._graph.nodes.push({"label": component.acronym});
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
		
		LogicalDiagram._graph.options.stackHeight = 12;
		LogicalDiagram._graph.options.radius = 6;
		LogicalDiagram._graph.options.fontSize = 12;
		LogicalDiagram._graph.options.labelFontSize = 8;
		LogicalDiagram._graph.options.nodeLabel = "label";
		LogicalDiagram._graph.options.markerWidth = 6;
		LogicalDiagram._graph.options.marketHeight = 6;
		LogicalDiagram._graph.options.gap = 1.5;
		LogicalDiagram._graph.options.nodeResize = "";
		LogicalDiagram._graph.options.linkDistance = 240;
		LogicalDiagram._graph.options.charge = -720;
		LogicalDiagram._graph.options.styleColumn = null;
		LogicalDiagram._graph.options.styles = null;
		LogicalDiagram._graph.options.linkName = "linkName";
	},
	refresh : function() {
		$("#logicalDiagramCanvas").empty();
		var graph = LogicalDiagram._graph;
		var options = graph.options;
		
		options.width = $(window).height() - 60;
		options.height = options.width;
			
		var force = d3.layout.
			force().
			nodes(graph.nodes).
			links(graph.links).
			size([options.width, options.height]).
			linkDistance(options.linkDistance).charge(options.charge).on("tick", LogicalDiagram.tick).start();

		var svg = d3.select("#logicalDiagramCanvas").
			append("svg:svg").
			attr("width", options.width).
			attr("height", options.height);
			
		var color = d3.scale.category20();
			
		var linkStyles = [];
		linkStyles[0] = "defaultMarker";
			
		svg.append("svg:defs").
			selectAll("marker").
			data(linkStyles).enter().
			append("svg:marker").attr("id", String).
			attr("viewBox", "0 -5 10 10").
			attr("refX", 15).attr("refY", -1.5).
			attr("markerWidth", options.markerWidth).
			attr("markerHeight", options.markerHeight).
			attr("orient", "auto").
			append("svg:path").
			attr("d", "M0,-5L10,0L0,5");
			
		LogicalDiagram._path = svg.append("svg:g").
			selectAll("path").
			data(force.links()).enter().
			append("svg:path").attr("class", function(d) {
				return "link " + (options.styleColumn ? d[options.styleColumn].toLowerCase() : linkStyles[0]);
			}).attr("marker-end", function(d) {
				return "url(#" + (options.styleColumn ? d[options.styleColumn].toLowerCase() : linkStyles[0] ) + ")";
			});
		
		LogicalDiagram._circle = svg.append("svg:g").
			selectAll("circle").
			data(force.nodes()).enter().
			append("svg:circle").attr("r", function(d) {
				return LogicalDiagram.getRadius(d);
			}).style("fill", function(d) {
				var colorObj = LogicalDiagram._colorData.find(function(e) {	return e.acronym === d.label; });
				if (colorObj) return colorObj.color; else return "#888888";
			}).call(force.drag);

		if (options.nodeLabel) { LogicalDiagram._circle.append("title").text(function(d) { return d[options.nodeLabel]; }); }
    	if (options.linkName) {	LogicalDiagram._path.append("title").text(function(d) {	return d[options.linkName];	});	}
		
		LogicalDiagram._text = svg.append("svg:g").selectAll("g").data(force.nodes()).enter().append("svg:g");
		LogicalDiagram._text.append("svg:text").
			attr("x", options.labelFontSize).
			attr("y", ".31em").
			attr("class", "shadow").text(function(d) { return d[options.nodeLabel]; });
		LogicalDiagram._text.append("svg:text").
			attr("x", options.labelFontSize).
			attr("y", ".31em").text(function(d) { return d[options.nodeLabel]; });

	},
	render : function(container, data) {
		$(container).load("renderers/logicalDiagram.htm", function() {
			LogicalDiagram._data = data;
			LogicalDiagram._container = container;
			LogicalDiagram.init();
			LogicalDiagram.refresh();
		});
	},
	getRadius : function(d) {
		var graph = LogicalDiagram._graph;
		var options = graph.options;
		return options.radius * (options.nodeResize ? Math.sqrt(d[options.nodeResize]) / Math.PI : 1);
    },
	tick : function() {
		LogicalDiagram._path.attr("d", function(d) {
			var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
			return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
		});

		LogicalDiagram._circle.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

		LogicalDiagram._text.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
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