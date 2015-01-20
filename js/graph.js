// set the dimensions of the canvas / graph
		var margin = {top: 30, right: 20, bottom: 30, left: 50},
		    width = 600 - margin.left - margin.right,
		    height = 260 - margin.top - margin.bottom;

		// parse the date / time
		var parseDate = d3.time.format("%d-%b-%y").parse;

		// set the ranges
		var x = d3.time.scale().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);

		// define the axes
		var xAxis = d3.svg.axis().scale(x)
		    .orient("bottom").ticks(5);

		var yAxis = d3.svg.axis().scale(y)
		    .orient("left").ticks(5);

		// define the line
		var valueline = d3.svg.line()
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.close); });
		    
		// adds the svg canvas
		var svggraph = d3.select("#graph")
		    .append("svg")
		        .attr("width", width + margin.left + margin.right)
		        .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		        .attr("transform", 
		              "translate(" + margin.left + "," + margin.top + ")");

		// get the data
		d3.csv("../data/graphdata.csv", function(error, data) {
		    data.forEach(function(d) {
		        d.date = parseDate(d.date);
		        d.close = +d.close;
		    });

		    // scale the range of the data
		    x.domain(d3.extent(data, function(d) { return d.date; }));
		    y.domain([0, d3.max(data, function(d) { return d.close; })]);

		    // add the valueline path
		    svggraph.append("path")
		        // .attr("class", "line")
		        .attr("d", valueline(data));

		    // add the x axis
		    svggraph.append("g")
		        .attr("class", "x axis")
		        .attr("transform", "translate(0," + height + ")")
		        .call(xAxis);

		    // add the y axis
		    svggraph.append("g")
		        .attr("class", "y axis")
		        .call(yAxis);

		});