var CoocurrenceMatrix = {
	_data : null,
	_container : null,
	_searchText : "",
	_path : null,
	_circle : null,
	_text : null,
	_searchMatchColor : "#30FF30",
	_orderSelected : null,


	select_json : function(new_json, value) {

	    var margin = {
	            top: 120,
	            right: 0,
	            bottom: 10,
	            left: 160
	        },
	        width = 800,
	        height = 800;

	    var x = d3.scale.ordinal().rangeBands([0, width]),
	        z = d3.scale.linear().domain([0, 4]).clamp(true),
	        c = d3.scale.category10().domain(d3.range(10));

	    var svg = d3.select("d3_plot").append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	        .style("margin-left", "0px")
	        .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	        // Based on the user-selected input text above, make the appropriate data set call and retrieve the json
	        d3.json(new_json, function(systems) {

	            console.log(new_json)

	            var matrix = [],
	                nodes = systems.nodes,
	                n = nodes.length;

	            // Compute index per node.
	            nodes.forEach(function(node, i) {
	                node.index = i;
	                node.count = 0;
	                matrix[i] = d3.range(n).map(function(j) {
	                    return {
	                        x: j,
	                        y: i,
	                        z: 0
	                    };
	                });
	            });

	            // Convert links to matrix; count integration occurrences.
	            systems.links.forEach(function(link) {
	                matrix[link.source][link.target].z += link.value;
	                matrix[link.target][link.source].z += link.value;
	                matrix[link.source][link.source].z += link.value;
	                matrix[link.target][link.target].z += link.value;
	                nodes[link.source].count += link.value;
	                nodes[link.target].count += link.value;
	            });

	            // Precompute the orders.
	            var orders = {
	                name: d3.range(n).sort(function(a, b) {
	                    return d3.ascending(nodes[a].name, nodes[b].name);
	                }),
	                count: d3.range(n).sort(function(a, b) {
	                    return nodes[b].count - nodes[a].count;
	                }),
	                group: d3.range(n).sort(function(a, b) {
	                    return nodes[b].group - nodes[a].group;
	                })
	            };

	            // The default sort order is by name.
	            x.domain(orders.name);

	            svg.append("rect")
	                .attr("class", "background")
	                .attr("width", width)
	                .attr("height", height);

	            var row = svg.selectAll(".row")
	                .data(matrix)
	                .enter().append("g")
	                .attr("class", "row")
	                .attr("transform", function(d, i) {
	                    return "translate(0," + x(i) + ")";
	                })
	                .each(row);

	            row.append("line")
	                .attr("x2", width);

	            row.append("text")
	                .attr("x", -6)
	                .attr("y", x.rangeBand() / 2)
	                .attr("dy", ".32em")
	                .attr("text-anchor", "end")
	                .text(function(d, i) {
	                    return nodes[i].name;
	                });

	            var column = svg.selectAll(".column")
	                .data(matrix)
	                .enter().append("g")
	                .attr("class", "column")
	                .attr("transform", function(d, i) {
	                    return "translate(" + x(i) + ")rotate(-90)";
	                });

	            column.append("line")
	                .attr("x1", -width);

	            column.append("text")
	                .attr("x", 6)
	                .attr("y", x.rangeBand() / 2)
	                .attr("dy", ".32em")
	                .attr("text-anchor", "start")
	                .text(function(d, i) {
	                    return nodes[i].name;
	                });

	            function row(row) {
	                var cell = d3.select(this).selectAll(".cell")
	                    .data(row.filter(function(d) {
	                        return d.z;
	                    }))
	                    .enter().append("rect")
	                    .attr("class", "cell")
	                    .attr("x", function(d) {
	                        return x(d.x);
	                    })
	                    .attr("width", x.rangeBand())
	                    .attr("height", x.rangeBand())
	                    .style("fill-opacity", function(d) {
	                        return z(d.z);
	                    })
	                    .style("fill", function(d) {
	                        return nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null;
	                    })
	                    .on("mouseover", mouseover)
	                    .on("mouseout", mouseout);
	            }

	            function mouseover(p) {
	                d3.selectAll(".row text").classed("active", function(d, i) {
	                    return i == p.y;
	                });
	                d3.selectAll(".column text").classed("active", function(d, i) {
	                    return i == p.x;
	                });
	            }

	            function mouseout() {
	                d3.selectAll("text").classed("active", false);
	            }

	            d3.select("#order").on("change", function() {
	                clearTimeout(timeout);
	                order(this.value);
	            });

							//This is the function that actually orders the nodes on the screen
	            function order(value) {
	                x.domain(orders[value]);

	                var t = svg.transition().duration(2500);

	                t.selectAll(".row")
	                    .delay(function(d, i) {
	                        return x(i) * 4;
	                    })
	                    .attr("transform", function(d, i) {
	                        return "translate(0," + x(i) + ")";
	                    })
	                    .selectAll(".cell")
	                    .delay(function(d) {
	                        return x(d.x) * 4;
	                    })
	                    .attr("x", function(d) {
	                        return x(d.x);
	                    });

	                t.selectAll(".column")
	                    .delay(function(d, i) {
	                        return x(i) * 4;
	                    })
	                    .attr("transform", function(d, i) {
	                        return "translate(" + x(i) + ")rotate(-90)";
	                    });
	            }

	            var timeout = setTimeout(function() {
	                order("name");
	                d3.select("#order").property("selectedIndex", 0).node().focus();
	            }, 5000);
	        });


	    },

	init : function() {

		CoocurrenceMatrix.select_json("data/design_coocurrence/current_state.js","name");

		var html = new Array();
		html.push("<div class='panel-group'>");
		html.push("<div class='panel panel-default'>");
		html.push("<div class='panel-heading'>System Map Options</div>")

		html.push("<div class='panel-body'>");
		html.push("<div class='form-group'>");
		html.push("<label for='systemMap'>System Map:</label>");
		html.push("<select class='form-control' id='selected_json'>");
		html.push("<option value='data/design_coocurrence/current_state.js'>Production</option>");
		html.push("</select>");
		html.push("</div>");
		html.push("</div>");

		html.push("</div>");
		html.push("</div>");
		html.push("</div>");

		html.push("<div class='panel-group'>");
		html.push("<div class='panel panel-default'>");
		html.push("<div class='panel-heading'>Ordering Options</div>")

		html.push("<div class='panel-body'>");
		html.push("<div class='form-group'>");
		html.push("<label for='ordering'>Ordering Options:</label>");
		html.push("<select class='form-control' id='order' onchange='CoocurrenceMatrix.refresh()'>");
		html.push("<option value='name' " + CoocurrenceMatrix.setOrder( "name") + ">Name</option>");
		html.push("<option value='count' " + CoocurrenceMatrix.setOrder("count") + ">Frequency</option>");
		html.push("<option value='group' " + CoocurrenceMatrix.setOrder("group") + ">Cluster</option>");
		html.push("</select>");
		html.push("</div>");
		html.push("</div>");

		html.push("</div>");
		html.push("</div>");
		html.push("</div>");
		html.push("<p>Each colored cell represents an integration between two systems.");
		html.push(" Darker cells indicate that there are a larger amount of integrations between these systems.</p>");
		html.push("<p>Use the drop-down menus to select a different data repository, reorder the matrix, and explore the data.</p>")
		$("#coccurrenceMatrixInfo").empty().append(html.join(""))

		$(".info").css("display", "inline-block");
	},
	refresh : function() {
		$("#CoocurrenceMatrixCanvas").empty();
	},
	setOrder : function(key, value) {
		CoocurrenceMatrix.orderSelected = value;
	},
	getOrder : function(key, defaultValue) {
		return CoocurrenceMatrix.orderSelected;
	},
	row: function(row) {
      var cell = d3.select(this).selectAll(".cell")
          .data(row.filter(function(d) {
              return d.z;
          }))
          .enter().append("rect")
          .attr("class", "cell")
          .attr("x", function(d) {
              return x(d.x);
          })
          .attr("width", x.rangeBand())
          .attr("height", x.rangeBand())
          .style("fill-opacity", function(d) {
              return z(d.z);
          })
          .style("fill", function(d) {
              return nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null;
          })
          .on("mouseover", mouseover)
          .on("mouseout", mouseout);
  },
	render : function(container, data) {
		$(container).load("./templates/coocurrenceMatrix.htm?uuid=" + CoocurrenceMatrix.generateUUID(), function() {
			CoocurrenceMatrix._data = data;
			CoocurrenceMatrix._container = container;
			CoocurrenceMatrix.init();
			CoocurrenceMatrix.refresh();
		});
		window.addEventListener("resize", CoocurrenceMatrix.refresh)
	},
	setSearchText : function(text) {
		CoocurrenceMatrix._searchText = text;
	},
	setState : function(key, value) {
		if (window.localStorage) window.localStorage[key] = value;
	},
	getState : function(key, defaultValue) {
		return window.localStorage ? window.localStorage[key] : defaultValue ? defaultValue : "";
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
