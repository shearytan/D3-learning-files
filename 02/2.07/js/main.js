// Load data from another file and display as figures

d3.csv("data/ages.csv").then((data) => {
    data.forEach((d) => {
        d.age = +d.age;
    })
    
    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400)
    
    var circles = svg.selectAll("circle")
        .data(data);
    
    circles.enter()
        .append("circle")
        .attr("cx", (d, i) => {
            return (i * 50) + 25
        })
        .attr("cy", (d, i) => {
            return (i * 50) + 25
        })
        .attr("r", (d) => {
            return d.age * 2
        })
        .attr("fill", (d) => {
            switch(d.name) {
                case "Tony":
                    return "yellow";
                case "Jessica":
                    return "red";
                case "Andrew": 
                    return "blue";
                case "Emily":
                    return "brown";
                case "Richard":
                    return "pink"
            }
        });
}).catch(err => console.log(err))