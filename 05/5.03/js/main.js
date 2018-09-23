var margin = {left: 80, top: 50, bottom: 100, right: 20};

var height = 600 - margin.left - margin.right,
    width = 800 - margin.top - margin.bottom;

var flag = true;

var t = d3.transition().duration(750);

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");

var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([height, 0]);

var colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateWarm)

g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("text-anchor", "middle")
    .text("Month")
    
var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue")
  
d3.json("data/revenues.json").then(data => {
    data.forEach(d => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });
    
    d3.interval(() => {
        update(data);
        flag = !flag;
    }, 1000)

    update(data)
})

// Update function for the updated axis
function update(data) {
    var value = flag ? "revenue" : "profit";

    x.domain(data.map(d => {return d.month}));
    y.domain([0, d3.max(data, (d) => {return d[value]})]);
    colorScale.domain([d3.min(data, (d) => {return d[value]}), d3.max(data, (d) => {return d[value]})])
    
    var xAxis = d3.axisBottom(x);
    xAxisGroup
        .transition(t)
        .call(xAxis)
    
    var yAxis = d3.axisLeft(y)
        .ticks(10)
        .tickFormat((d) => {return d})
    yAxisGroup
        .transition(t)
        .call(yAxis)

    // Join
    var rects = g.selectAll("rect")
        .data(data)
    // Exit
    rects.exit()
        .transition(t)
        .attr("y", 0)
        .attr("height", 0)
        .remove()

    // Enter
    rects.enter()
        .append("rect")
            .attr("x", (d) => {return x(d.month)})
            .attr("y", y(0))
            .attr("width", x.bandwidth)
            .attr("height", 0)
            .merge(rects)
            .transition(t)
                .attr("x", (d) => {return x(d.month)})
                .attr("y", (d) => {return y(d[value])})
                .attr("width", x.bandwidth)
                .attr("height", (d) => height - y(d[value]))
                .attr("fill", (d) => {return colorScale(d[value])})

    
    var label = flag ? "Revenue" : "Profit";
    yLabel.text(label);
}