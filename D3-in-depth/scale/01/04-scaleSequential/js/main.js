var data = d3.range(0, 100, 2);

var colors = [
    'interpolateInferno',
    'interpolatePlasma',
    'interpolateWarm',
    'interpolateRainbow',
    'interpolateViridis',
    'interpolateMagma',
    'interpolateCool',
    'interpolateCubehelixDefault'
];

var linearScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600])

var colorScale = d3.scaleSequential()
    .domain([0, 100])

function dots(d) {
    colorScale
        .interpolator(d3[d])
    
    d3.select(this)
        .append("text")
        .attr("y", -10)
        .text(d);
    
    d3.select(this)
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => {
            return linearScale(d)
        })
        .attr("cy", 20)
        .attr("r", 5)
        .style("fill", (d) => {
            return colorScale(d)
        })
}

d3.select("#chart-area")
    .selectAll("g.interpolator")
    .data(colors)
    .enter()
    .append("g")
    .classed("interpolator", true)
    .attr("transform", (d, i) => {
        return 'translate(0, ' + (i * 70) + ')';
    })
    .each(dots)