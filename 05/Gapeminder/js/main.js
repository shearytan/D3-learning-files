var margin = {top: 50, left: 80, bottom: 100, right: 20};

var height = 600 - margin.top - margin.bottom,
	width = 500 - margin.left - margin.right;

var g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "transition(" + margin.top + ", " + margin.left + ")");

