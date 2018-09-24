// Colour  = Country
// X Axis = Year
// Y Axis = Production
// Size = Sales

var margin = {top: 100, left: 80, bottom: 100, right: 20};
var height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");


var color = d3.scaleOrdinal(d3.schemeSet3);

var x = d3.scaleLinear()
    .range([0, width])
    .domain([1960, 2019]);

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 5500]) ;

var xAxis = d3.axisBottom(x)
    .tickFormat((d) => {return d});
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);


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
        .enter()
        .append("circle")
            .attr("cx", (d) => {return x(d.Year)})
            .attr("cy", (d) => {return y(d.Production)})
            .attr("r", 4)
            .attr("fill", (d) => {return color(d.Country)})
}