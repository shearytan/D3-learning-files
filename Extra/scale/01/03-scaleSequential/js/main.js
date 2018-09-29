var svg = d3.select("#chart-area").append("svg")
    .attr("width", 700)
    .attr("height", 700)

var data = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

var linearScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 500])

var sequentialScale = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow)

var rect = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => {
        return linearScale(d)
    })
    .attr("y", 10)
    .attr("width", 45)
    .attr("height", (d) => {
        return linearScale(d)
    })
    .attr("fill", (d) => {
        return sequentialScale(d)
})

var text = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => {
        return linearScale(d) + 10
    })
    .attr("y", (d) => {
        return linearScale(d)
    })
    .text((d) => {
        return d
    })

var circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
        return linearScale(d) + 20
    })
    .attr("cy", (d) => {
        return linearScale(d) + 80
    })
    .attr("r", (d) => {
        return linearScale(d) / 30
    })
    .attr("fill", (d) => {
        return sequentialScale(d)
    })