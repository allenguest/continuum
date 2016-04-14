var DependencyMatrix = {
	_components : null,
	_selectedIndex : 0,
	_sortProperty : "id",
	_sortDirection : "asc",
	_container : null,
	_searchText : "",
	refresh : function() {
		var component = DependencyMatrix._components[DependencyMatrix._selectedIndex];
		var html = new Array();
		html.push("<table><thead><tr>");
		html.push("<th colspan='4' class='dm-component-info dm-element' style='background-color:" + component.color + "'>");
		html.push("<div class='dm-component-header-left'>" + component.name + " [" + component.acronym + "]</div>");
		html.push("<div class='dm-component-header-left'><span class='dm-component-description'>" + component.description + "</span>");
		
		if (component.vendor) {
			html.push("<span class='dm-component-description-small'>Vendor:&nbsp;" + component.vendor + "&nbsp;");
			if (component.version && component.version.length) html.push("ver " + component.version);
			html.push("</span>");
		}
		
		var techOwner = "";
		if (component.techOwner) {
			for (var i=0;i<component.techOwner.length;i++) {
				if (techOwner.length > 0) techOwner += ", "; else techOwner += "Technical Owner:&nbsp;";
				techOwner += "<a href='mailto:" + component.techOwner[i].email + "'>" + component.techOwner[i].name + "</a>";
			}
		}
		html.push("<span class='dm-component-description-small'>" + techOwner + "</span>");
		
		var technologies = "";
		if (component.technologies) {
			for (var i=0;i<component.technologies.length;i++) {

				if (technologies.length > 0) technologies += ", ";
				technologies += (component.technologies[i]);
			}
			html.push("<span class='dm-component-description-small'>Technology:&nbsp;" + technologies + "</span>");
		}
		html.push("</div><div class='dm-component-header-right'>");
		html.push("<button type='button' class='btn btn-default btn-sm btn-block' link='" + component.docLink + "' onclick='DependencyMatrix.handleDocClick(this)'>Architecture</button>")
		html.push("<button type='button' class='btn btn-default btn-sm btn-block' link='" + component.codeLink + "' onclick='DependencyMatrix.handleCodeClick(this)'>Code</button>")
		html.push("</div>")
		html.push("</th>");
		for (var i=0;i<DependencyMatrix._components.length;i++) {
			var columnComponent = DependencyMatrix._components[i];
			var columnText = "";
			for (var j=0;j<columnComponent.acronym.length;j++)
				columnText += columnComponent.acronym[j] + " ";
			var classTag = "dm-columnComponent dm-element";
			
			if (columnComponent.services && columnComponent.services.length > 0) {
				for (var j=0;j<columnComponent.services.length;j++) {				
					if (DependencyMatrix.findSearchMatchesForService(columnComponent.services[j])) {
						classTag += " dm-searchMatch";
						break;
					}
				}
			}
			html.push("<th onclick='DependencyMatrix.handleColumnClick(this)' class='" + classTag + "' style='background-color:" + columnComponent.color + "'>" + columnText + "</th>");
		}
		html.push("</tr>");
		html.push("<tr><th class='dm-columnHeader dm-column-sortable' column='id' onclick='DependencyMatrix.handleSortClick(this)'>ID</th>");
		html.push("<th class='dm-columnHeader dm-column-sortable dm-columnWordWrap' style='width:300px' column='description' onclick='DependencyMatrix.handleSortClick(this)'>Description</th>");
		html.push("<th class='dm-columnHeader dm-column-sortable' column='endpointSig' onclick='DependencyMatrix.handleSortClick(this)'>Signature</th>");
		html.push("<th class='dm-columnHeader'>Method</th><th class='dm-columnHeader' colspan='" + DependencyMatrix._components.length + "' /></tr>")
		html.push("</thead>");
		html.push("<tbody>");
		if (component.services) {
			var sortedServices = DependencyMatrix.sortColumns(component.services);
			for (var i=0;i<component.services.length;i++)
			{
				var service = component.services[i];
				var classTag = "dm-rowInfo";
				if (DependencyMatrix.findSearchMatchesForService(service)) classTag += " dm-searchMatch";
				html.push("<tr class='" + classTag + "' data-toggle='tooltip' link='" + service.docLink + "' title='View endpoint documentation' onclick='javascript:DependencyMatrix.handleDocClick(this)'>");
				html.push("<th class='dm-columnInfo'>" + service.id + "</th>");
				html.push("<th class='dm-columnInfo'>" + service.description + "</th>");
				html.push("<th class='dm-columnInfo'>" + service.endpointSig + "</th>");
				html.push("<th class='dm-columnInfo'>" + service.endpointType + "&nbsp;" + service.endpointVerb + "</th>");
				
				for (var j=0;j<DependencyMatrix._components.length;j++) {
					html.push("<th class='dm-columnInfo-depends'>")
					var dependComponent = DependencyMatrix._components[j];
					if (dependComponent.dependsOn) {
						for (var k=0;k<dependComponent.dependsOn.length;k++) {
							if (dependComponent.dependsOn[k].endpointId === service.id) {
								html.push("<span class='glyphicon glyphicon-ok'></span>")
							}
						}
					}
					html.push("</th>")
				}
				
				
				html.push("</tr>")
			}
		}
		html.push("<tr><th>")
		html.push("</tbody>");
		html.push("</table>");
		$(DependencyMatrix._container).find(".dm-header").empty().append(html.join(""))
	},
	render : function(container, data) {
		$(container).load("renderers/dependencyMatrix.htm?uuid=" + DependencyMatrix.generateUUID(), function() {
			DependencyMatrix._components = DependencyMatrix.sortComponents(data.components);
			DependencyMatrix._selectedIndex = 0;
			DependencyMatrix._container = container;
			DependencyMatrix.refresh();
		});
	},
	sortComponents : function(array) {
		return array.sort(function(a, b) { 
			return a["acronym"] > b["acronym"] ? 1 : -1;
		});
	},
	sortColumns : function(array) {
		return array.sort(function(a, b) { 
			return (DependencyMatrix._sortDirection === "asc") ?
				(a[DependencyMatrix._sortProperty] > b[DependencyMatrix._sortProperty] ? 1 : -1) :
				(b[DependencyMatrix._sortProperty] > a[DependencyMatrix._sortProperty] ? 1 : -1);
		});

	},
	findSearchMatchesInComponent : function(component) {
		// search name, acronym, description, technologies, vendor
		if (DependencyMatrix._searchText.length > 2) {
			if (DependencyMatrix.findSearchMatch([component.name])) return true;
			if (DependencyMatrix.findSearchMatch([component.acronym])) return true;
			if (DependencyMatrix.findSearchMatch([component.description])) return true;
			if (DependencyMatrix.findSearchMatch(component.technologies)) return true;
			if (DependencyMatrix.findSearchMatch([component.vendor])) return true;
		}
		return false;
	},
	findSearchMatchesForService : function(service) {
		// search id, description, endpointSig and tags
		if (DependencyMatrix._searchText.length > 2) {
			if (DependencyMatrix.findSearchMatch([service.id])) return true;
			if (DependencyMatrix.findSearchMatch([service.description])) return true;
			if (DependencyMatrix.findSearchMatch([service.endpointSig])) return true;
			if (DependencyMatrix.findSearchMatch(service.tags)) return true;
		}
		return false;
	},
	findSearchMatch : function(list) {
		if (list && list.length > 0)
			return list.find(function(e) { return e.indexOfInsensitive(DependencyMatrix._searchText) > -1; });
		else return false;
	},
	handleColumnClick : function(element) {
		DependencyMatrix._selectedIndex = element.cellIndex-1;
		DependencyMatrix.refresh();
	},
	handleDocClick : function(element) {
		var link = $(element).attr("link");
		if ("undefined" !== link)
			window.open(link);
		else UI.alert("#alertModal", "Error", "No document link defined.");
	},
	handleCodeClick : function(element) {
		var link = $(element).attr("link");
		if ("undefined" !== link)
			window.open(link);
		else UI.alert("#alertModal", "Error", "No code link defined.");
	},
	handleSortClick : function(columnElement) {
		if (DependencyMatrix._sortProperty === columnElement.getAttribute("column"))
			DependencyMatrix._sortDirection = (DependencyMatrix._sortDirection === "asc" ? "desc" : "asc");
		else
		{
			DependencyMatrix._sortProperty = columnElement.getAttribute("column");
			DependencyMatrix._sortDirection = "asc";
		}
		DependencyMatrix.refresh();
	},
	setSearchText : function(text) {
		DependencyMatrix._searchText = text;
	},
	searchFor : function(text) {
		DependencyMatrix.setSearchText(text);
		DependencyMatrix.refresh();
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