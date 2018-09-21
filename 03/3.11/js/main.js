// Margin
var margin = {left: 100, right: 10, top: 10, bottom: 150};

// Width & height of the bar chart
var width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Size
var g = d3.selectAll("#chart-area")
    // Overall size
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    // position of the bar chart
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// x axis label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 130)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("The world's tallest building")

// y axis label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)")

d3.json("data/buildings.json").then(data => {
    data.forEach(d => {d.height = +d.height});

    // scale band and linear (x, y)
    var x = d3.scaleBand()
        .domain(data.map(d => {return d.name}))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {return d.height})])
        .range([height, 0]);

    // x axis
    var xAxis = d3.axisBottom(x)
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
        .selectAll("text")
            .attr("x", -5)
            .attr("y", 10)
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
    
    var yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat((d) => {return d + "m"});
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxis)


    // rectangles
    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", (d) => {return x(d.name)})
            .attr("y", (d) => {return y(d.height)})
            .attr("width", x.bandwidth)
            .attr("height", (d) => {return height - y(d.height)})
            .attr("fill", "gray")
})

