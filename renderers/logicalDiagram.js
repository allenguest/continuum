var LogicalDiagram = {
	_data : null,
	_container : null,
	_graph : ["options","links","groups"],
	_searchText : "",
	_path : null,
	_circle : null,
	_text : null,
	_collapseStates : [],
	init : function() {
		LogicalDiagram._graph.links = new Array();
		LogicalDiagram._graph.groups = new Array();
		LogicalDiagram._graph.options = new Array();

		// Get list of all endpoints for all components
		var servicesList = [];
		for (var i=0;i<LogicalDiagram._data.components.length;i++) {
			var component = LogicalDiagram._data.components[i];
			component.nodeSizeNone = 0;
			component.nodeSizeDependencies = 0;
			component.nodeSizeDependents = 0;
			if (component.services) {
				for (var j=0;j<component.services.length;j++) {
					servicesList.push(component.services[j]);
				}
			}
		}
		
		for (var i=0;i<LogicalDiagram._data.components.length;i++)
		{
			var component = LogicalDiagram._data.components[i];
			if (component.dependsOn) {
				for (var j=0;j<component.dependsOn.length;j++) {
					component.nodeSizeDependencies = component.dependsOn.length;
					LogicalDiagram._data.components.find(function(dependComponent) {
						// once the dependenent component is found
						if (component.dependsOn[j].endpointId.startsWith(dependComponent.acronym)) {
							// reference the actual service
							var serviceDefinition = servicesList.find(function(s) {
								return s.id === component.dependsOn[j].endpointId;
							});
							
							// Using the target component, create a relationship between the two (source, target) so we can graph
							var t = LogicalDiagram._data.components.indexOf(dependComponent);
							LogicalDiagram._graph.links.pushIfUnique({source:i, target:t, service:serviceDefinition}, function(e) {
									return LogicalDiagram._data.components[e.source].acronym === component.acronym && 
										LogicalDiagram._data.components[e.target].acronym === dependComponent.acronym;
							});
							dependComponent.nodeSizeDependents += 1;
						}
					});
				}
			}
		}
		
		LogicalDiagram._graph.options.stackHeight = 12;
		LogicalDiagram._graph.options.radius = 6; 
		LogicalDiagram._graph.options.fontSize = 12;
		LogicalDiagram._graph.options.labelFontSize = 8;
		LogicalDiagram._graph.options.nodeLabel = "acronym";
		LogicalDiagram._graph.options.nodeDescription = "name";
		LogicalDiagram._graph.options.color = "color";
		LogicalDiagram._graph.options.markerWidth = 6;
		LogicalDiagram._graph.options.markerHeight = 6;
		LogicalDiagram._graph.options.gap = 1.5;
		LogicalDiagram._graph.options.linkDistance = 240;
		LogicalDiagram._graph.options.charge = -720;
		LogicalDiagram._graph.options.styleColumn = "endpointType";
		LogicalDiagram._graph.options.styles = "endpointType";
		LogicalDiagram._graph.options.linkName = "description";
		
		LogicalDiagram._componentSizeIndicator = "None";
		
		LogicalDiagram._collapseStates = [false, true, true];
	},
	refresh : function() {
		$("#logicalDiagramCanvas").empty();
		var graph = LogicalDiagram._graph;
		var options = graph.options;
		
		options.width = $(window).height() - 60;
		options.height = options.width;
			
		var force = d3.layout.
			force().
			nodes(LogicalDiagram._data.components).
			links(graph.links).
			size([options.width, options.height]).
			linkDistance(options.linkDistance).
			charge(options.charge).
			on("tick", LogicalDiagram.tick).start();
		var svg = d3.select("#logicalDiagramCanvas").
			append("svg:svg").
			attr("width", options.width).
			attr("height", options.height);
			
		var color = d3.scale.category20();
			
		var linkStyles = [];
	    if (options.styleColumn) {
			var x;
			for (var i = 0; i < graph.links.length; i++) {
				if (linkStyles.indexOf( x = graph.links[i].service[options.styleColumn].toLowerCase()) == -1) linkStyles.push(x);
			}
		} else linkStyles[0] = "defaultMarker";
			
		if (options.markerWidth) {	
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
		}
		
		LogicalDiagram._path = svg.append("svg:g").
			selectAll("path").
			data(force.links()).
			enter().
			append("svg:path").
			attr("class", function(d) {
				return "link " + (options.styleColumn ? d.service[options.styleColumn].toLowerCase() : linkStyles[0]);
			}).attr("marker-end", function(d) {
				return "url(#" + (options.styleColumn ? d.service[options.styleColumn].toLowerCase() : linkStyles[0] ) + ")";
			});
		
		LogicalDiagram._circle = svg.append("svg:g").
			selectAll("circle").
			data(force.nodes()).enter().
			append("svg:circle").attr("r", function(d) {
				return LogicalDiagram.getRadius(d);
			}).style("fill", function(d) { return d[options.color];	}).call(force.drag);

		if (options.nodeDescription) { LogicalDiagram._circle.append("title").text(
			function(d) { 
				return d[options.nodeDescription] + 
					"\nDepends on " + (d.nodeSizeDependencies ? d.nodeSizeDependencies : "0") + " service(s)" +
					"\nIs referenced " + (d.nodeSizeDependents ? d.nodeSizeDependents : "0") + " times(s)";
			}); 
		}
    	if (options.linkName) {	LogicalDiagram._path.append("title").text(
			function(d) {	
				return d.service[options.linkName];	// should return # of dependencies on that component instead
			});	
		}
		LogicalDiagram._text = svg.append("svg:g").selectAll("g").data(force.nodes()).enter().append("svg:g");
		LogicalDiagram._text.append("svg:text").
			attr("x", options.labelFontSize).
			attr("y", ".31em").
			attr("class", "shadow").text(function(d) { return d[options.nodeLabel]; });
		LogicalDiagram._text.append("svg:text").
			attr("x", options.labelFontSize).
			attr("y", ".31em").text(function(d) { return d[options.nodeLabel]; });
			
		
		var html = new Array();
		html.push("<div class='panel-group'>");
		html.push("<div class='panel panel-default'>");
		html.push("<div class='panel-heading'>Diagram Options</div>")

		html.push("<div class='panel-body'>");
		html.push("<div class='form-group'>");
		html.push("<label for='componentSize'>Component size based on:</label>");
		html.push("<select class='form-control' id='componentSize' onchange='LogicalDiagram.handleComponentSize(this)'>");
		html.push("<option value='None' " + LogicalDiagram.isSelected("None") + ">None</option>");
		html.push("<option value='Dependencies' " + LogicalDiagram.isSelected("Dependencies") + "># of Dependencies</option>");
		html.push("<option value='Dependents'" + LogicalDiagram.isSelected("Dependents") + "># of Dependents</option>");
		html.push("</select>");
		html.push("</div>");
		html.push("</div>");
		
		html.push("</div>");
		html.push("</div>");
		html.push("</div>");
		$("#logicalDiagramInfo").empty().append(html.join(""))
		
		$(".info").css("display", "inline-block");

	},
	render : function(container, data) {
		$(container).load("renderers/logicalDiagram.htm?uuid=" + LogicalDiagram.generateUUID(), function() {
			LogicalDiagram._data = data;
			LogicalDiagram._container = container;
			LogicalDiagram.init();
			LogicalDiagram.refresh();
		});
		window.addEventListener("resize", LogicalDiagram.refresh)
	},
	getRadius : function(d) {
		var options = LogicalDiagram._graph.options;
		return options.radius * (LogicalDiagram._componentSizeIndicator ? Math.sqrt((d["nodeSize" + LogicalDiagram._componentSizeIndicator] + 1) * 10) / Math.PI : 1);
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
	handleComponentSize : function(element) {
		LogicalDiagram._componentSizeIndicator = element.value;
		LogicalDiagram.refresh();
	},
	isSelected : function(componentSizeIndicator) {
		return (componentSizeIndicator === LogicalDiagram._componentSizeIndicator)? " selected" : "";
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
	},
	generateUUID : function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
}