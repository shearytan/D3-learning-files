// Margin and groups of bar chart

var margin = {left: 100, right: 10, top: 10, bottom: 100};

// Width of the bar chart
var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var g = d3.selectAll("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/buildings.json").then(data => {
    data.forEach(d => { d.height = +d.height});

    var x = d3.scaleBand()
        .domain(data.map(d => {return d.name}))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3)
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {return d.height})])
        .range([0, height])

    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("y", 100)
            .attr("x", (d) => {return x(d.name)})
            .attr("width", x.bandwidth)
            .attr("height", (d) => {return y(d.height)})
            .attr("fill", "pink")
})