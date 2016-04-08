var DependencyDiagram = {
	_data : null,
	_container : null,
	_chord : null,
	_colorData : [],
	_chordSystems : [],
	_chordData : [],
	_chordColor : [],
	_sortProperties : [],
	_sortDirections: [],
	_refreshMethod : null,
	_refreshComponent : null,
	_collapseStates : [],
	_searchText : "",
	init : function() {
		DependencyDiagram._colorData.push({acronym: "AIS", color: "#399397"});
		DependencyDiagram._colorData.push({acronym: "AccSync", color: "#404040"});
		DependencyDiagram._colorData.push({acronym: "BRM", color: "#00B0F0"});
		DependencyDiagram._colorData.push({acronym: "BRMSOA", color: "#00B0F0"});
		DependencyDiagram._colorData.push({acronym: "CDI", color: "#44546A"});
		DependencyDiagram._colorData.push({acronym: "CBS", color: "#404040"});
		DependencyDiagram._colorData.push({acronym: "CDC", color: "#606060"});
		DependencyDiagram._colorData.push({acronym: "CPE", color: "#44546A"});
		DependencyDiagram._colorData.push({acronym: "CRED-SVC", color: "#ED7D31"});
		DependencyDiagram._colorData.push({acronym: "ESB", color: "#7030A0"});
		DependencyDiagram._colorData.push({acronym: "EMS", color: "#ED7D31"});
		DependencyDiagram._colorData.push({acronym: "FFM", color: "#ED7D31"});
		DependencyDiagram._colorData.push({acronym: "FFMSOA", color: "#ED7D31"});
		DependencyDiagram._colorData.push({acronym: "HPSA", color: "#4472C4"});
		DependencyDiagram._colorData.push({acronym: "JMS", color: "#7030A0"});
		DependencyDiagram._colorData.push({acronym: "LMS", color: "#C02020"});
		DependencyDiagram._colorData.push({acronym: "MyAcc", color: "#ED7D31"});
		DependencyDiagram._colorData.push({acronym: "NSA", color: "#399397"});
		DependencyDiagram._colorData.push({acronym: "OE", color: "#70AD47"});
		DependencyDiagram._colorData.push({acronym: "OM", color: "#70AD47"});
		DependencyDiagram._colorData.push({acronym: "PC", color: "#4472C4"});
		DependencyDiagram._colorData.push({acronym: "PIM", color: "#70AD47"});
		DependencyDiagram._colorData.push({acronym: "SecMtx", color: "#ED7D31"});
		DependencyDiagram._colorData.push({acronym: "TN", color: "#44546A"});
		DependencyDiagram._colorData.push({acronym: "TSS", color: "#C02020"});
		DependencyDiagram._colorData.push({acronym: "TVSC", color: "#A04040"});
		DependencyDiagram._colorData.push({acronym: "UDGF", color: "#ED7D31"});
		DependencyDiagram._sortProperties = ["id","id","id"];
		DependencyDiagram._sortDirections = ["asc","asc","asc"];
		DependencyDiagram._collapseStates = [false, true, true];
	},
	refresh : function() {
		DependencyDiagram._chordSystems = [];
		DependencyDiagram._chordData = [];
		DependencyDiagram._chordColor = [];
		
		$("#dependencyDiagramCanvas").empty();
		var width = $(window).height() - 130,
			height = width,
			outerRadius = Math.min(width, height) / 2 - 10,
			innerRadius = outerRadius - 48;
		
		var depth = DependencyDiagram._data.components.length;
		var parseComponents = [];
		for (var i=0;i<depth;i++) // AIS, BRM, BRMSOA ...
		{
			parseComponents.push([]);
			if (DependencyDiagram._data.components[i].services && DependencyDiagram._data.components[i].services.length > 0) {
				for (var j=0;j<depth;j++) // AIS, BRM, BRMSOA ...
				{
					if (DependencyDiagram._data.components[j].dependsOn && DependencyDiagram._data.components[j].dependsOn.length > 0) {
						// return # of endpoints that component[j] has dependencies for
						var dependencies = 0;
						var result = jQuery.each(DependencyDiagram._data.components[j].dependsOn,
							function(dIndex) {
								jQuery.each(DependencyDiagram._data.components[i].services, 
									function(sIndex) {
										dependencies+=(DependencyDiagram._data.components[i].services[sIndex].id === DependencyDiagram._data.components[j].dependsOn[dIndex].endpointId)?1:0;
								});
							}
						);
						parseComponents[i].push(dependencies);
					} else parseComponents[i].push(0);
				}
			} else {
				for (var k=0;k<depth;k++) { 
					parseComponents[i].push(0);
				}
			}
		}
		
		for (var i=0;i<parseComponents.length;i++)
		{
			var sum = parseComponents[i].reduce((a,b) => a + b, 0);
			DependencyDiagram._chordSystems.push(DependencyDiagram._data.components[i]);
			DependencyDiagram._chordData.push(parseComponents[i]);
			DependencyDiagram._chordColor.push(DependencyDiagram._colorData[i]);
		}

		var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
		var layout = d3.layout.chord().padding(.04).sortSubgroups(d3.descending).sortChords(d3.ascending);
		var path = d3.svg.chord().radius(innerRadius);
		var svg = d3.select("#dependencyDiagramCanvas").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("id", "circle")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		svg.append("circle").attr("r", outerRadius);
		
		layout.matrix(DependencyDiagram._chordData);
  
		var group = svg.selectAll("g.group")
			.data(layout.groups())
			.enter().append("svg:g")
			.attr("class", "group")
			.on("mouseover", DependencyDiagram.groupMouseover)
			.on("click", DependencyDiagram.renderComponentInfo)
			.on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

		var groupPath = group.append("svg:path")
			.attr("id", function(d, i) { return "group" + i; })
			.attr("d", arc)
			.style("fill", function(d, i) { 
				return (DependencyDiagram.findSearchMatchesInComponent(DependencyDiagram._chordSystems[i])?"#33FF33":DependencyDiagram._chordColor[i].color);
			});

		var groupText = group.append("text").attr("dx", 6).attr("dy", 15);
		groupText.append("textPath")
			.attr("xlink:href", function(d, i) { return "#group" + i; })
			.text(function(d, i) { return DependencyDiagram._chordSystems[i].acronym; });
  
		DependencyDiagram._chord = svg.selectAll("path.chord")
			.data(layout.chords)
			.enter().append("svg:path")
			.attr("class", "chord")
			.style("fill", function(d) { 
				var sourceComponent = DependencyDiagram._chordSystems[d.source.index];
				var targetComponent = DependencyDiagram._chordSystems[d.target.index];
				var dependentServices = DependencyDiagram.getDependentServices(sourceComponent, targetComponent);
				for (var i=0;i<dependentServices.length;i++) {
					if (DependencyDiagram.findSearchMatchesForService(dependentServices[i])) return "#33FF33";
				}
				return DependencyDiagram._chordColor[d.source.index].color; 
			})
			.attr("d", path)
			.on("click", function(d) { DependencyDiagram.renderEndpointInfo(d); })
			.on("mouseover", function(d) {
				d3.select("#tooltip").
				 style("visibility", "visible").
				 html(DependencyDiagram.chordTip(d)).
				 style("top", function () { return (d3.event.pageY)+"px"}).
				 style("left", function () { return (d3.event.pageX)+"px";})
			});
	},
	render : function(container, data) {
		$(container).load("renderers/dependencyDiagram.htm", function() {
			DependencyDiagram._data = data;
			DependencyDiagram._container = container;
			DependencyDiagram.init();
			DependencyDiagram.refresh();
		});
		window.addEventListener("resize", DependencyDiagram.refresh)
	},
	refreshInfo : function() {
		if (DependencyDiagram._refreshComponent !== null)
			(DependencyDiagram._refreshMethod === "endpoint")?DependencyDiagram.renderEndpointInfo(DependencyDiagram._refreshComponent):DependencyDiagram.renderComponentInfo(DependencyDiagram._refreshComponent);
	},
	renderEndpointInfo  :function(d) {
		DependencyDiagram._refreshComponent = d;
		DependencyDiagram._refreshMethod = "endpoint";
		var sourceComponent = DependencyDiagram._chordSystems[d.source.index];
		var targetComponent = DependencyDiagram._chordSystems[d.target.index];
		var dependsOnList = DependencyDiagram._chordSystems[d.target.index].dependsOn;

		var html = new Array();
		html.push("<div class='panel-group' id='endpointInfoAccordian'>");
		html.push("<div class='infoHeader infoHeader-source'>" + targetComponent.acronym + " using " + sourceComponent.acronym + "</div>");
		
		html.push("<div class='panel panel-default'>");
		html.push("<div class='panel-heading'>");
		html.push("<h4 class='panel-title'><a data-toggle='collapse' data-parent='#endpointInfoAccordian' href='#collapseEndpoints' onclick='DependencyDiagram.rememberCollapse(0,this)'>Endpoints</a></h4>");
		html.push("</div>");
		html.push("<div id='collapseEndpoints' class='panel-collapse collapse" + (DependencyDiagram._collapseStates[0]===true?"":" in") + "'>");
		html.push("<div class='panel-body dd-panel-scrollable'>");
		html.push("<table class='table table-condensed'>");
		html.push("<thead><tr><th class='dd-column-sortable' column='id' onclick='DependencyDiagram.handleSortClick(0,this)'>ID</th><th class='dd-column-sortable' column='description' onclick='DependencyDiagram.handleSortClick(0,this)'>Description</th><th class='dd-column-sortable' column='endpointSig' onclick='DependencyDiagram.handleSortClick(0,this)'>Signature</th><th>Method</th></tr></thead><tbody>");
		
		var resultSet = [];
		for (var i=0;i<dependsOnList.length;i++) {
			var service = DependencyDiagram._chordSystems[d.source.index].services.find(function(service) {
				return dependsOnList[i].endpointId === service.id;
			});
			if (service) resultSet.push(service);
		}
		
		var sortedResultSet = DependencyDiagram.sortColumns(0, resultSet);
		for (var i=0;i<sortedResultSet.length;i++)
		{
			var service = sortedResultSet[i];
			var classTag = "dd-rowInfo";
			if (DependencyDiagram.findSearchMatchesForService(service)) classTag += " dd-searchMatch";
			html.push("<tr class='" + classTag + "' link='" + service.docLink + "' onclick='DependencyDiagram.handleDocClick(this)'><td>" + service.id + "</td><td>" + service.description + "</td><td>" + service.endpointSig + "</td><td>" + service.endpointType + "&nbsp;" + service.endpointVerb + "</td></tr>");	
		}
			
		html.push("</tbody></table>");
		html.push("</div></div>");
		
		$("#dependencyDiagramInfo").empty().append(html.join(""))
		$(".infoHeader-target").css("background-color", DependencyDiagram._chordColor[d.target.index].color);
		$(".infoHeader-source").css("background-color", DependencyDiagram._chordColor[d.source.index].color);
		$(".info").css("display", "inline-block");
	},
	renderComponentInfo(d) {
		DependencyDiagram._refreshComponent = d;
		DependencyDiagram._refreshMethod = "component";
		
		var component = DependencyDiagram._chordSystems[d.index];
		
		var html = new Array();
		html.push("<div class='panel-group' id='endpointInfoAccordian'>");
		html.push("<div class='infoHeader infoHeader-source'>" + component.acronym + "</div>");
		
		html.push("<div class='panel panel-default'>");
		html.push("<div class='panel-heading'>");
		html.push("<h4 class='panel-title'><a data-toggle='collapse' data-parent='#endpointInfoAccordian' href='#collapseEndpoints' onclick='DependencyDiagram.rememberCollapse(0,this)'>Endpoints</a></h4>");
		html.push("</div>");
		html.push("<div id='collapseEndpoints' class='panel-collapse collapse" + (DependencyDiagram._collapseStates[0]===true?"":" in") + "'>");
		html.push("<div class='panel-body dd-panel-scrollable'>");
		html.push("<table class='table table-condensed'>");
		html.push("<thead><tr><th class='dd-column-sortable' column='id' onclick='DependencyDiagram.handleSortClick(0,this)'>ID</th><th class='dd-column-sortable' column='description' onclick='DependencyDiagram.handleSortClick(0,this)'>Description</th><th class='dd-column-sortable' column='endpointSig' onclick='DependencyDiagram.handleSortClick(0,this)'>Signature</th><th>Method</th></tr></thead><tbody>");
		
		var sortedResultSet = DependencyDiagram.sortColumns(0, component.services);
		for (var i=0;i<sortedResultSet.length;i++) {
			var service = sortedResultSet[i];
			var classTag = "dd-rowInfo";
			if (DependencyDiagram.findSearchMatchesForService(service)) classTag += " dd-searchMatch";
			html.push("<tr class='" + classTag + "' link='" + service.docLink + "' onclick='DependencyDiagram.handleDocClick(this)'><td>" + service.id + "</td><td>" + service.description + "</td><td>" + service.endpointSig + "</td><td>" + service.endpointType + "&nbsp;" + service.endpointVerb + "</td></tr>");
		}
		html.push("</tbody></table>");
		html.push("</div></div>");
		
		var targetAcronym = component.id;
		html.push("<div class='panel panel-default'>");
		html.push("<div class='panel-heading'>");
		html.push("<h4 class='panel-title'><a data-toggle='collapse' data-parent='#endpointInfoAccordian' href='#collapseDependents' onclick='DependencyDiagram.rememberCollapse(1,this)'>Dependents</a></h4>");
		html.push("</div>");
		html.push("<div id='collapseDependents' class='panel-collapse collapse" + (DependencyDiagram._collapseStates[1]===true?"":" in") + "'>");
		html.push("<div class='panel-body dd-panel-scrollable'>");
		html.push("<table class='table table-condensed'>");
		html.push("<thead><tr><th class='dd-column-sortable' column='id' onclick='DependencyDiagram.handleSortClick(1,this)'>ID</th><th class='dd-column-sortable' column='acronym' onclick='DependencyDiagram.handleSortClick(1,this)'>Called By</th><th class='dd-column-sortable' column='endpointSig' onclick='DependencyDiagram.handleSortClick(1,this)'>Signature</th><th>Method</th></tr></thead><tbody>");
		
		var resultSet = [];
		for (var i=0;i<DependencyDiagram._chordSystems.length;i++) {
			var dependentComponent = DependencyDiagram._chordSystems[i];
			if (dependentComponent.dependsOn) {
				for (var j=0;j<dependentComponent.dependsOn.length;j++) {
					if (dependentComponent.dependsOn[j].endpointId.startsWith(component.acronym))
					{
						var service = component.services.find(function(service) { 
							return dependentComponent.dependsOn[j].endpointId === service.id;
						});
						if (service) 
							resultSet.push({"docLink" : service.docLink, "id" : dependentComponent.dependsOn[j].endpointId, "acronym" : dependentComponent.acronym, "endpointSig" : service.endpointSig, "endpointType" : service.endpointType, "endpointVerb" : service.endpointVerb});
					}
				}
			}
		}
		var sortedResultSet = DependencyDiagram.sortColumns(1, resultSet);
		for (var i=0;i<sortedResultSet.length;i++) {
			var service = sortedResultSet[i];
			var classTag = "dd-rowInfo";
			if (DependencyDiagram.findSearchMatchesForService(service)) classTag += " dd-searchMatch";
			html.push("<tr class='" + classTag + "' link='" + service.docLink + "' onclick='DependencyDiagram.handleDocClick(this)'><td>" + service.id + "</td><td>" + service.acronym + "</td><td>" + service.endpointSig + "</td><td>" + service.endpointType + "&nbsp;" + service.endpointVerb + "</td></tr>");
		}
		
		html.push("</tbody></table>")
		html.push("</div></div>");
		
		html.push("<div class='panel panel-default'>");
		html.push("<div class='panel-heading'>");
		html.push("<h4 class='panel-title'><a data-toggle='collapse' data-parent='#endpointInfoAccordian' href='#collapseDependendencies' onclick='DependencyDiagram.rememberCollapse(2,this)'>Dependencies</a></h4>");
		html.push("</div>");
		html.push("<div id='collapseDependendencies' class='panel-collapse collapse" + (DependencyDiagram._collapseStates[2]===true?"":" in") + "'>");
		html.push("<div class='panel-body dd-panel-scrollable'>");
		html.push("<table class='table table-condensed'>");
		html.push("<thead><tr><th class='dd-column-sortable' column='acronym' onclick='DependencyDiagram.handleSortClick(2,this)'>Dependency</th><th class='dd-column-sortable' column='id' onclick='DependencyDiagram.handleSortClick(2,this)'>Depends On</th><th class='dd-column-sortable' column='endpointSig' onclick='DependencyDiagram.handleSortClick(2,this)'>Signature</th><th>Method</th></tr></thead><tbody>");
		
		var resultSet = [];
		if (component.dependsOn) {
			for (var i=0;i<component.dependsOn.length;i++) {
				var dependComponent = DependencyDiagram._chordSystems.find(function(dependComponent) {
					return (component.dependsOn[i].endpointId.startsWith(dependComponent.acronym));
				});
				if (dependComponent) {
					var dependService = dependComponent.services.find(function(dependService) {
						return (component.dependsOn[i].endpointId === dependService.id);
					});
					if (dependService) 
						resultSet.push({"docLink" : dependService.docLink, "acronym" : dependComponent.acronym, "id" : component.dependsOn[i].endpointId, "endpointSig" : dependService.endpointSig, "endpointType" : dependService.endpointType, "endpointVerb" : dependService.endpointVerb});
				} else {
					// cannot find component
				}
			}
			var sortedResultSet = DependencyDiagram.sortColumns(2, resultSet);
			for (var i=0;i<sortedResultSet.length;i++) {
				var service = sortedResultSet[i];
				var classTag = "dd-rowInfo";
				if (DependencyDiagram.findSearchMatchesForService(service)) classTag += " dd-searchMatch";
				html.push("<tr class='" + classTag + "' link='" + service.docLink + "' onclick='DependencyDiagram.handleDocClick(this)'><td>" + service.acronym + "</td><td>" + service.id + "</td><td>" + service.endpointSig + "</td><td>" + service.endpointType + "&nbsp;" + service.endpointVerb + "</td></tr>");
			}
		} else {
			html.push("<tr><td colspan='4'>No dependencies</td></tr>");
		}
		html.push("</tbody></table>")
		html.push("</div></div>");
		
		html.push("</div>"); // panel panel-default
		html.push("</div>");
		
		$("#dependencyDiagramInfo").empty().append(html.join(""))
		$(".infoHeader").css("background-color", DependencyDiagram._chordColor[d.index].color);
		$(".info").css("display", "inline-block");
	},
	groupTip : function(d) {
		var endpointCount = (DependencyDiagram._chordSystems[d.index].services)?DependencyDiagram._chordSystems[d.index].services.length:0;
		var dependentCount = DependencyDiagram._chordData[d.index].reduce((a,b) => a + b, 0);
		var dependencyCount = (DependencyDiagram._chordSystems[d.index].dependsOn)?DependencyDiagram._chordSystems[d.index].dependsOn.length:0;
		return DependencyDiagram._chordSystems[d.index].name + "<br/>" + endpointCount + " endpoints<br />" + dependentCount + " dependents<br />" + dependencyCount + " dependencies" ;
	},
	chordTip : function(d) {
		return DependencyDiagram._chordSystems[d.target.index].acronym + " uses " + DependencyDiagram._chordData[d.source.index][d.target.index] + " " + DependencyDiagram._chordSystems[d.source.index].acronym + " endpoints" ;
	},
	groupMouseover : function(d, i) {
		 d3.select("#tooltip")
              .style("visibility", "visible")
              .html(DependencyDiagram.groupTip(d))
              .style("top", function () { return (d3.event.pageY)+"px"})
              .style("left", function () { return (d3.event.pageX)+"px";})
		
		DependencyDiagram._chord.classed("fade", function(p) {
			return p.source.index != i && p.target.index != i;
		});
	},
	handleDocClick : function(element) {
		var link = $(element).attr("link");
		if ("undefined" !== link)
			window.open(link);
		else UI.alert("#alertModal", "Error", "No document link defined.");
	},
	handleSortClick : function(index, columnElement) {
		if (DependencyDiagram._sortProperties[index] === columnElement.getAttribute("column"))
			DependencyDiagram._sortDirections[index] = (DependencyDiagram._sortDirections[index] === "asc" ? "desc" : "asc");
		else
		{
			DependencyDiagram._sortProperties[index] = columnElement.getAttribute("column");
			DependencyDiagram._sortDirections[index] = "asc";
		}
		DependencyDiagram.refreshInfo();
	},
	getDependentServices : function(sourceComponent, targetComponent) {
		var result = [];
		if (targetComponent.dependsOn && targetComponent.dependsOn.length) {
			for (var i=0;i<targetComponent.dependsOn.length;i++) {
				var sourceService = sourceComponent.services.find(function(e) {
					return targetComponent.dependsOn[i].endpointId === e.id;
				});
				if (sourceService) result.push(sourceService);
			}
		}
		return result;
	},
	sortServices : function(array) {
		return array.sort(function(a, b) { 
			return a.id > b.id ? 1 : -1;
		});
	},
	sortDependsOn : function(array) {
		return array.sort(function(a, b) { 
			return a.endpointId > b.endpointId ? 1 : -1;
		});
	},
	sortColumns : function(index, array) {
		return array.sort(function(a, b) { 
			return (DependencyDiagram._sortDirections[index] === "asc") ?
				(a[DependencyDiagram._sortProperties[index]] > b[DependencyDiagram._sortProperties[index]] ? 1 : -1) :
				(b[DependencyDiagram._sortProperties[index]] > a[DependencyDiagram._sortProperties[index]] ? 1 : -1);
		});
	},
	rememberCollapse : function(index, element) {
		var isCollapsed = $(element.getAttribute("href")).hasClass("in");
		DependencyDiagram._collapseStates[index] = isCollapsed;
	},
	findSearchMatchesInComponent : function(component) {
		// search name, acronym, description, technologies, vendor
		if (DependencyDiagram._searchText.length > 2) {
			if (DependencyDiagram.findSearchMatch([component.name])) return true;
			if (DependencyDiagram.findSearchMatch([component.acronym])) return true;
			if (DependencyDiagram.findSearchMatch([component.description])) return true;
			if (DependencyDiagram.findSearchMatch(component.technologies)) return true;
			if (DependencyDiagram.findSearchMatch([component.vendor])) return true;
		}
		return false;
	},
	findSearchMatchesForService : function(service) {
		// search id, description, endpointSig and tags
		if (DependencyDiagram._searchText.length > 2) {
			if (DependencyDiagram.findSearchMatch([service.id])) return true;
			if (DependencyDiagram.findSearchMatch([service.description])) return true;
			if (DependencyDiagram.findSearchMatch([service.endpointSig])) return true;
			if (DependencyDiagram.findSearchMatch(service.tags)) return true;
		}
		return false;
	},
	findSearchMatch : function(list) {
		if (list && list.length > 0 && list[0])
			return list.find(function(e) { return e.indexOfInsensitive(DependencyDiagram._searchText) > -1;	});
		else return false;
	},
	setSearchText : function(text) {
		DependencyDiagram._searchText = text;
	},
	searchFor : function(text) {
		DependencyDiagram.setSearchText(text);
		DependencyDiagram.refresh();
		DependencyDiagram.refreshInfo();
	}
}