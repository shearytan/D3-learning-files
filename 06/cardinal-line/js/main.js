var margin = {top: 30, left: 100, bottom: 50, right: 50},
    height = 400 - margin.top - margin.bottom;
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y")
    bisectDate = d3.bisector((d) => {return d.date}).left;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var xAxisCall = d3.axisBottom().ticks(5)
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
var yAxisCall = d3.axisLeft().ticks(10)
var yAxis = g.append("g")
    .attr("class", "y axis")

var line = d3.line()
    .x((d) => {return x(d.date)})
    .y((d) => {return y(d.close)})
    .curve(d3.curveBasis);

var focus = g.append("g")
    .style("display", "none")

d3.csv("data/data.csv").then((data) => {
    data.forEach((d) => {
        d.date = parseTime(d.date);
        d.close = +d.close;
    })

    x.domain(d3.extent(data, (d) => {return d.date}));
    y.domain([0, d3.max(data, (d) => {return d.close})]);

    xAxis.call(xAxisCall.scale(x))
    yAxis.call(yAxisCall.scale(y))

    g.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", "3px")
        .attr("d", line(data))
    
    focus.append("line")
        .attr("class", "x")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);
    
    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "red")
        .attr("r", 8)
    
    g.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => {focus.style("display", null)})
        .on("mouseout", () => {focus.style("display", "none")})
        .on("mousemove", mousemove)
    
    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        focus.select("circle.y")
            .attr("transform", "translate(" + x(d.date) + ", " + y(d.close) + ")") 
    }
})