			var width = 400,
			    height = 200;

			var projection = d3.geo.mercator()
				.center([5, 10])
				.rotate([4.4, 0])
			    .scale(600)
			    .translate([width / 2, height / 2]);

			var path = d3.geo.path()
			    .projection(projection);

			var svg = d3.select("#map").append("svg")
			    .attr("width", width)
			    .attr("height", height);

			var div = d3.select("#map");
 
			var tooltip = d3.select("#map").append("tooltip")
		        .attr("class", "tooltip")
		        .style("opacity", 0);

		    var div = d3.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);


			d3.json("../data/world.json", function(error, world) {
			  svg.selectAll(".countries")
			   		.data(topojson.feature(world, world.objects.countries).features)
			   		.enter().append("path")
			      	.attr("class", function(d) { return "countries " + d.properties.name; })
			      	.attr("d", path) 
			      	.on("mouseover", function(d) {
					 d3.select(this).transition().duration(300).style("opacity", 1);
					 div.transition().duration(300)
					 .style("opacity", 1)
					 div.text(d.properties.name)
					 .style("left", (d3.event.pageX) + "px")
					 .style("top", (d3.event.pageY -30) + "px");
					 })
					 .on("mouseout", function() {
					 d3.select(this)
					 .transition().duration(300)
					 .style("opacity", 0.8);
					 div.transition().duration(300)
					 .style("opacity", 0);
					 })
				 

			svg.append("path")
		      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b }))
		      // .attr("d", path)
		      .attr("class", "countries-boundary")

			});

