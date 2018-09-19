var data = [new Date(2016, 0, 1), new Date(2016, 3, 1), new Date(2016, 6, 1), new Date(2017, 0, 1)];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 700)
    .attr("height", 700)

var x = d3.scaleTime()
    .domain([new Date(2015, 0, 1), new Date(2016, 0, 1)])
    .range([0, 700])

var circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
        return x(d) / 10;
    })
    .attr("cy", (d) => {
        return x(d) / 10;
    })
    .attr("r", 5)
    .attr("fill", "gray")
