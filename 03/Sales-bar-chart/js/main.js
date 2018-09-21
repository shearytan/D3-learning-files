// margin 
var margin = {left: 100, top: 80, bottom: 100, right: 10}

// width & height
var height = 500 - margin.top - margin.bottom,
    width = 700 - margin.left - margin.right;

// size of the chart
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// x axis label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("font-size", "30px")
    .attr("font-family", "Indie Flower")
    .attr("text-anchor", "middle")
    .text("Month")

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "30px")
    .attr("font-family", "Indie Flower")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue")

// Load data
d3.json("data/revenues.json").then(data => {
    data.forEach(d => {d.revenue = +d.revenue})

    // scale band and linear
    var x = d3.scaleBand()
        .domain(data.map(d => {return d.month}))
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.2)
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {return d.revenue})])
        .range([height, 0])
    
    // bar chart colors
    var colorSequence = d3.scaleSequential()
        .domain([d3.min(data, (d) => {return d.revenue}), d3.max(data, (d) => {return d.revenue})])
        .interpolator(d3.interpolateYlGnBu)

    // x axis
    var xAxis = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
        .selectAll("text")
            .attr("y", 10)
            .attr("x", -5)
            .attr("text-anchor", "middle")
            .attr("font-size", "15px")
            .attr("font-family", "Dosis")
    
    var yAxis = d3.axisLeft(y)
        .ticks(10)
        .tickFormat((d) => {return d});
    g.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", (d) => {return x(d.month)})
            .attr("y", (d) => {return y(d.revenue)})
            .attr("width", x.bandwidth)
            .attr("height", (d) => {return height - y(d.revenue)})
            .attr("fill", (d) => {return colorSequence(d.revenue)})
})