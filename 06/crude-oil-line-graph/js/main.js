var margin = {top: 50, left: 100, bottom: 100, right: 100},
    height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area").append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var parseTime = d3.timeParse("%Y"),
    bisectDate = d3.bisector((d) => { return d.year}).left

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var xAxisCall = d3.axisBottom();
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
var yAxisCall = d3.axisLeft()
    .ticks(6)
    .tickFormat((d) => { return parseInt(d/1000)})
var yAxis = g.append("g")
    .attr("class", "y axis")

var title = g.append("text")
    .attr("x", width / 2)
    .attr("y", -20)
    .attr("font-size", "35px")
    .attr("text-anchor", "middle")
    .attr("font-family", "Amatic SC")
    .text("Crude Oil Prod. in Saudi Arabia")

var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "25px")
    .attr("font-family", "Amatic SC")
    .attr("text-anchor", "middle")
    .text("Year")

var yLabel = g.append("text")
    .attr("y", -50)
    .attr("x", -170)
    .attr("transform", "rotate(-90)")
    .attr("font-size", "25px")
    .attr("font-family", "Amatic SC")
    .attr("text-anchor", "middle")
    .text("Production(x1000)")

var line = d3.line()
    .x((d) => {return x(d.year)})
    .y((d) => {return y(d.production)})
    .curve(d3.curveMonotoneX)

d3.json("data/total.json").then((data) => {
    data.forEach((d) => {
        d.year = parseTime(d.year);
        d.production = +d.production;
        d.export = +d.export;
    });

    x.domain(d3.extent(data, (d) => {return d.year}));
    y.domain([d3.min(data, (d) => {return Math.min(d.production, d.export)}), d3.max(data, (d) => {return Math.max(d.production, d.export)})]);

    g.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", "3px")
        .attr("d", line(data));
        
    xAxis.call(xAxisCall.scale(x))
    yAxis.call(yAxisCall.scale(y))

// Tooltip
    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 3.5)

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em")

    g.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.year) + "," + y(d.production) + ")");
        focus.select("text").text(parseInt(d.production/1000));
        focus.select(".x-hover-line").attr("y2", height - y(d.production))
        focus.select(".y-hover-line").attr("x2", -x(d.year));
    }
});