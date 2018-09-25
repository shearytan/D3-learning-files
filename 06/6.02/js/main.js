// Buiding a scatter plot
// Make animation
// Building JQuery UI

// Append margin & size of svg to g
var margin = { left:80, right:20, top:50, bottom:100 };
var height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");

var time = 0;
var interval;
var formattedData;

var tip = d3.tip().attr("class", "d3-tip")
    .html((d) => {
        var text = "<strong>Country:</strong> <span style='color:red'>" + d.country + "</span><br>";
            text += "<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>" + d.continent + "</span><br>";
            text += "<strong>Life Expectancy:</strong> <span style='color:red'>" + d3.format(".2f")(d.life_exp) + "</span><br>";
            text += "<strong>GDP Per Capita:</strong> <span style='color:red'>" + d3.format("$,.0f")(d.income) + "</span><br>";
            text += "<strong>Population:</strong> <span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";
        return text;
    })
g.call(tip)

// Define scaleX and scaleY
var x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([142, 150000]);
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90]);
var area = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([2000, 1400000000]);
var continentColor = d3.scaleOrdinal(d3.schemePastel1);

// X and Y axis
var xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat(d3.format("$"));
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall);

var yAxisCall = d3.axisLeft(y)
    .tickFormat(function(d){ return +d; });
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

// X and Y axis labels
var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)");
var yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Life Expectancy (Years)")
var timeLabel = g.append("text")
    .attr("y", height -10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800");

// Legend
var continents = ["europe", "asia", "americas", "africa"];

var legend = g.append("g")
    .attr("transform", "translate(" + (width - 10) + ", " + (height - 125) + ")");

continents.forEach((d, i) => {
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + (i * 20) + ")");
    
    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", continentColor(d))

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(d)
})

// Fetch data
d3.json("data/data.json").then(data => {
    formattedData = data.map((d) => {
        return d["countries"].filter((v) => {
            var dataExists = (v.income && v.life_exp)
            return dataExists;
        }).map((d) => {
            d.income = +d.income;
            d.life_exp = +d.life_exp;
            return d;
        })
    });

    update(formattedData[0]);
});

$("#play-button")
    .on("click", function() {
        var button = $(this);
        if(button.text() == "Play") {
            button.text("Pause");
            interval = setInterval(set, 100)
        } else {
            button.text("Play");
            interval = clearInterval(interval);
        }
    });

$("#reset-button")
    .on("click", function() {
        time = 0;
        update(formattedData[0]);
    });

$("#continent-select")
    .on("change", function() {
        update(formattedData[time])
    })

$("#date-slider").slider({
    max: 2014,
    min: 1800,
    step: 1,
    slide: function(e, i) {
        time = i.value - 1800;
        update(formattedData[time])
    }
})

function set() {
    time = (time < 214) ? time + 1 : 0;
    update(formattedData[time]);
}

function update(data) {
    var t = d3.transition().duration(100);

    var continent = $("#continent-select").val();
    
    var data = data.filter((d) => {
        if(continent == "all"){return true;}
        else {
            return d.continent == continent;
        }
    })

    var circles = g.selectAll("circle")
        .data(data, (d) => {return d.country});

        circles.exit()
            .attr("class", "exit")
            .remove();
        
        circles.enter()
            .append("circle")
            .attr("class", "enter")
            .attr("fill", (d) => {return continentColor(d.continent)})
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .merge(circles)
            .transition(t)
                .attr("cy", (d) => {return y(d.life_exp)})
                .attr("cx", (d) => {return x(d.income)})
                .attr("r", (d) => {return Math.sqrt(area(d.population) / Math.PI)});
    
    timeLabel.text(time + 1800);
    $("#year")[0].innerHTML = +(time + 1800);

    $("#date-slider").slider("value", +(time + 1800))
}