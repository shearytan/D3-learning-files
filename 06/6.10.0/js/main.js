var margin = {top: 50, left: 80, bottom: 100, right: 100},
    height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var parseTime = d3.timeParse("%d/%m/%Y");
var formatTime = d3.timeFormat("%d/%m/%Y");
var bisectDate = d3.bisector((d) => { return d.date}).left;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0])

var xAxisCall = d3.axisBttom()
    .ticks(6)
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
var yAxisCall = d3.axisLeft()
var yAxis = g.append("g")
    .attr("class", "y axis")

$("#coin-select").on("change", update)
$("#var-select").on("change", update)
$("#date-slider").slider({
    range: true,
    max: parseTime("31/10/2017").getTime(),
    min: parseTime("12/5/2013").getTime(),
    step: 86400000,
    values: [parseTime("12/5/2013").getTime(), parseTime("31/10/2017").getTime()],
    slide: function(event, ui) {
        $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
        $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
        update();
    }
})

d3.json("data/coins.json").then((data) => {
    filteredData = {};
    for(var coin in data) {
        if(!data.hasOwnProperty(coin)) continue;
        filteredData[coin] = data[coin].filter((d) => {
            return !(d["price_usd"] == null);
        })
        filteredData[coin].forEach((d) => {
            d["price_usd"] = +d["price_usd"];
            d["24h_vol"] = +d["24h_vol"];
            d["market_cap"] = +d["market_cap"];
            d["date"] = parseTime(d["date"])
        })
    }
    update()
})

function update() {
    var coin = $("#coin-select").val(),
        yValue = $("#var-select").val(),
        sliderValues = $("#date-slider").slider("values");
    var dataTimeFiltered = filteredData[coin].filter((d) => {
        return ((d.date >= sliderValues[0]) && (d.date <= sliderValues[1]))
    });
    
    x.domain(d3.extent(dataTimeFiltered, (d) => {return d.date}))
    y.domain([d3.min(dataTimeFiltered, (d) => {return d[yValue]}), d3.max(dataTimeFiltered, (d) => {return d[yValue]})])

    xAxis.call(xAxisCall.scale(x))
    yAxis.call(yAxisCall.scale(y))
}