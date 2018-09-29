var data = [new Date(2016, 0, 1), new Date(2016, 3, 1), new Date(2016, 6, 1), new Date(2017, 0, 1)];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 1000)
    .attr("height", 1000)

var timeScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
    .range([0, 300])

var text = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => {
        return timeScale(d)
    })
    .attr("y", d => {
        return timeScale(d) + 100;
    })
    .text(d => {
        return d.toDateString();
})

var circle = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
        return timeScale(d) + 10
    })
    .attr("cy", (d) => {
        return timeScale(d) + 110;
    })
    .attr("r", 10)
    .attr("fill", "blue")