var margin = {top: 50, left: 100, bottom: 100, right: 100},
    height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.rightl;

var g = d3.select("#chart-area").append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    g.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.right + ")");

var parseTime = d3.timeParse("%Y"),
    bisectDate = d3.bisector((d) => { return d.year}).left

var x = d3.scaleTime().range([0, width])
    y = d3.scaleLinear().range([height, 0]);

var line = d3.line()
    .x((d) => {return x(d.year)})
    .y((d) => {return y(d.production)});

d3.json("data/total.json").then((data) => {
    console.log(data)
})