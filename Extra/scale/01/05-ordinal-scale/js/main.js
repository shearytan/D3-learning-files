var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 800)
    .attr("height", 800)

var data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var linearScale = d3.scaleLinear()
    .domain([0, 11])
    .range([0, 600])

var ordinalScale = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemePaired)

var text = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d, i) => {
        return linearScale(i);
    })
    .attr("y", 100)
    .text((d) => {
        return d;
    })
    .style("fill", (d) => {
        return ordinalScale(d)
    })
