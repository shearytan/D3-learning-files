// List out margin for the bar chart
var margin = {left: 100, right: 10, top: 10, bottom: 150};

// Width and height of the bar chart
var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// Bar chart group
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

// X axis title
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 3.3)
    .attr("y", height + 130)
    .attr("font-size", "20px")
    .text("The word's tallest building")
// Y axis title
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height/2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)")


d3.json("data/buildings.json").then(data => {
    data.forEach(d => { d.height = +d.height});

    var x = d3.scaleBand()
        .domain(data.map(d => {return d.name}))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3)
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d => {return d.height}))])
        .range([0, height])
    
    var xAxis = d3.axisBottom(x)
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
    .selectAll("text")
        .attr("y", 10)
        .attr("x", -5)
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")
    
    var yAxis = d3.axisLeft(y)
        .ticks(3)
        .tickFormat((d) => {return d + "m"})
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxis)

    
    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", (d) => { return x(d.name)})
            .attr("y", 0)
            .attr("width", x.bandwidth)
            .attr("height", (d) => { return y(d.height)})
            .attr("fill", "blue")
})