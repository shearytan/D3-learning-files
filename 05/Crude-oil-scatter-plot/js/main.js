// Things to update:
    // Axes - Axis Y for Production & Export rates
    // Bars - Update according to y axis
    // Include update in <transition>

var margin = {top: 50, left: 80, right: 20, bottom: 100};

var width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var flag = false;

var t = d3.transition().duration(100);

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.5);

var y = d3.scaleLinear()
    .range([height , 0]);

var colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateRainbow)

var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");

g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Year")

var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Production");

d3.json("data/total.json").then(data => {
    data.forEach((d) => {
        d.production = +d.production;
        d.export = +d.export;
    });

    d3.interval(() => {
        update(data);
        flag = !flag;
    }, 1000)

    update(data);
})

function update(data) {
    var value = flag ? 'production' : 'export';

    x.domain(data.map(d => {return d.year}));
    y.domain([0, d3.max(data, (d) => {return d[value]})]);
    colorScale.domain([d3.min(data, (d) => {return d[value]}), d3.max(data, (d) => {return d[value]})]);

    var xAxis = d3.axisBottom(x);
        xAxisGroup
        .transition(t)
        .call(xAxis);

    var yAxis = d3.axisLeft(y)
        .ticks(10)
        .tickFormat((d) => {return d})
        yAxisGroup
        .transition(t)
        .call(yAxis)

    var circles = g.selectAll("circle")
        .data(data, (d) => {
            return d.year
        })
    
    circles
        .exit()
        .transition(t)
        .attr("cy", y(0))
        .remove()

    circles
        .enter()
        .append("circle")
            .attr("cx", (d) => {return x(d.year) + x.bandwidth() / 2})
            .attr("cy", y(0))
            .attr("r", 10)

        .merge(circles)
        .transition(t)
            .attr("cx", (d) => {return x(d.year)})
            .attr("cy", (d) => {return y(d[value])})
            .attr("fill", (d) => {return colorScale(d[value])})

    var label = flag ? "Production" : "Export";
    yLabel
        .text(label);
}