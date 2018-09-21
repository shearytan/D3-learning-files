var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400)

d3.json("data/buildings.json").then(data => {
    data.forEach(d => { d.height = +d.height});

    var x = d3.scaleBand()
        .domain(data.map(d => { return d.name}))
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3)
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {return d.height})])
        .range([0, 400])
    
    var rects = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => {return x(d.name)})
        .attr("y", 100)
        .attr("width", x.bandwidth)
        .attr("height", (d) => {return y(d.height)})
        .attr("fill", "green")
})