var data = [1, 2, 3, 4, 7.5, 9, 10];

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000)

var myScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 400])

var colorScale = d3.scaleLinear()
    .domain([0, 10, 0])
    .range(['green', 'pink', 'blue'])

var text = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => {
       return myScale(d)
    })
    .attr("y", (d) => {
        return myScale(d) 
     })
    .text(d => {
        return d
})

var circle = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
        return myScale(d) + 5
    })
    .attr("cy", (d) => {
        return myScale(d) + 15
    })
    .attr("r", 10)
    .attr("fill", (c) => {
        return colorScale(c)
    })
