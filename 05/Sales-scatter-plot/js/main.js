// Colour  = Country
// X Axis = Production
// Y Axis = Export
// Size = Sales
// Movement = Year

var margin = {top: 100, left: 120, bottom: 100, right: 50};
var height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var timer = 0;

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
    .domain([0, 5500]);

var color = d3.scaleOrdinal(d3.schemeSet3);

var area = d3.scaleLinear()
    .range([0, 50])
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

    const updatedData = data.map((year) => {
        return year['detail'].map(d => {
            d.export = +d.export;
            d.production = +d.production;
            d.sales = +d.sales;
            return d;
        })
    });

    // d3.interval(() => {
    //     timer = (timer < 20) ? timer + 1 : 0;
    //     update(updatedData[timer])
    // }, 1000)

    update(updatedData[1])
})

function update(data) { 
    var t = d3.transition().duration(1000);
    var circles = g.selectAll("circle")
        .data(data, (d) => {return data.country})
    
        circles.exit()
            .attr("class", "exit")
            .remove()

        circles
            .enter()
            .append("circle")
                .attr("class", "enter")
                .attr("fill", (d) => {return color(d.country)})
                .merge(circles)
                .transition(t)
                    .attr("cx", (d) => {return x(d.production)})
                    .attr("cy", (d) => {return y(d.export)})
                    .attr("r", (d) => {return Math.sqrt(area(d.sales) / Math.PI)})
}