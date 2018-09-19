/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then(data => {
    data.forEach(d => {
        d.height = +d.height;
    });

    var svg = d3.select("#chart-area").append("svg")
        .attr("height", 400)
        .attr("width", 400);
    
    var rects = svg.selectAll("rect")
        .data(data);
    
    rects.enter()
        .append("rect")
        .attr("x", (d, i) => {
            return (i * 60) + 25;
        })
        .attr("y", 50)
        .attr("width", "50px")
        .attr("height", (d) => {
            return d.height;
        })
        .attr("fill", (d) => {
            if(d.height > 260) {
                return "red";
            }
            return "gray"
        })
}).catch(err => console.log(err))