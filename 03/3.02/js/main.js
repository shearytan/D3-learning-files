var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

d3.json("data/buildings.json").then(data => {
    data.forEach(d => {
        d.height = +d.height;
    });

    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400])

    var rects = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 100)
        .attr("x", (d, i) => {
            return (i * 60);
        })
        .attr("width", 40)
        .attr("height", (d => {
            return y(d.height)
        }))
        .attr("fill", "gray")
})