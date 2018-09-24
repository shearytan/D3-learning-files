var margin = {top: 50, left: 80, bottom: 100, right: 20};

var height = 600 - margin.top - margin.bottom,
	width = 800 - margin.left - margin.right;

var time = 0

var g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
var x = d3.scaleLog()
	.base(10)
	.range([0, width])
	.domain([140, 150000]);

var y = d3.scaleLinear()
	.range([height, 0])
	.domain([0, 90]);

var area = d3.scaleLinear()
	.range([25*Math.PI, 1500*Math.PI])
	.domain([2000, 1400000000]);

var color = d3.scaleOrdinal(d3.schemeSet3);

var xAxis = d3.axisBottom(x)
	.tickValues([400, 4000, 40000])
	.tickFormat(d3.format("$"))
g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0, " + height + ")")
	.call(xAxis);

var yAxis = d3.axisLeft(y)
	.tickFormat((d) => {return +d})
g.append("g")
	.attr("class", "y axis")
	.call(yAxis)

var xAxisLabel = g.append("text")
	.attr("x", width / 2)
	.attr("y", height + 50)
	.attr("text-anchor", "middle")
	.attr("font-size", "20px")
	.text("GDP Per Capita ($)")

var yAxisLabel = g.append("text")
	.attr("x", -230)
	.attr("y", -60)
	.attr("transform", "rotate(-90)")
	.attr("text-anchor", "middle")
	.attr("font-size", "20px")
	.text("Life Expectancy (Years)")

var timeLabel = g.append("text")
	.attr("x", width - 50)
	.attr("y", height - 10)
	.attr("font-size", "30px")
	.attr("text-anchor", "middle")
	.attr("opacity", "0.4")
	.text("1800")

d3.json("data/data.json").then(data => {
	const formattedData = data.map(d => {
		return d["countries"].filter(v => {
			let dataExisted = (v.income && v.life_exp);
			return dataExisted;
		}).map(d => {
			d.income = +d.income;
			d.life_exp = +d.life_exp;
			return d;
		})
	});

	d3.interval(() => {
		time = (time < 214) ? time + 1 : 0 
		update(formattedData[time])
	}, 100);

	update(formattedData[0]);
});


//To update:	
	// Axis
	// Circle
	// Unable to set the domain to update
		// because the scale will decrease and minimize

function update(data) {
	var t = d3.transition().duration(100);

	var circles = g.selectAll("circle")
		.data(data, (d) => {return d.country});
	
	circles.exit()
		.attr("class", "exit")
		.remove();
	
	circles.enter()
		.append("circle")
			.attr("fill", (d) => {return color(d.continent)})
		.merge(circles)
		.transition(t)
			.attr("cy", (d) => {return y(d.life_exp)})
			.attr("cx", (d) => {return x(d.income)})
			.attr("r", (d) => {return Math.sqrt(area(d.population)) / Math.PI});

	timeLabel.text(+(time + 1800));
}
