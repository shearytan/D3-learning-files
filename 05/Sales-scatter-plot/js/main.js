// Colour  = Country
// X Axis = Production
// Y Axis = Export
// Size = Sales
// Movement = Year

var margin = {top: 100, left: 120, bottom: 100, right: 50};
var height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");

// Scale
var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, 5500]);

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([50, 6000]);

var color = d3.scaleOrdinal(d3.schemeSet3);

var area = d3.scaleLinear()
    .range([0, 40])
    .domain([20*Math.PI, 2000*Math.PI])

// Axes
var xAxis = d3.axisBottom(x)
    .tickFormat((d) => {return d});
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);

var yAxis = d3.axisLeft(y) 
    .tickFormat((d) => {return d})
g.append("g")
    .attr("class", "y axis")
    .call(yAxis)

// Axis label
var xAxisLabel = g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("text-anchor", "middle")
    .attr("font-size", "25px")
    .text("Productions")

var yAxisLabel = g.append("text")
    .attr("x",  - (height / 2))
    .attr("y", -60)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("font-size", "25px")
    .text("Exports")

// D3 Load data
d3.json("data/mock.json").then(data => {
    data.forEach(d => {
        d.Production = +d.Production;
        d.Sales = +d.Sales;
    });

    update(data);
})

function update(data) {  

    var circles = g.selectAll("circle")
        .data(data, (d) => {return data.Country})
    
        circles.exit().remove()

        circles
            .enter()
            .append("circle")
                .attr("cx", (d) => {return x(d.Production)})
                .attr("cy", (d) => {return y(d.Export)})
                .attr("r", (d) => {return Math.sqrt(area(d.Sales) / Math.PI)})
                .attr("fill", (d) => {return color(d.Country)})
}