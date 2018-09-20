var svg = d3.select("#chart-area").append("svg")
    .attr("width", 700)
    .attr("height", 700);

d3.json("data/buildings.json").then((data) => {
    data.forEach((d) => {
        d.height = +d.height;
    });
    
    var band = d3.scaleBand()
        .domain(["Burj Khalifa", "Shanghai Tower", 
        "Abraj Al-Bait Clock Tower", "Ping An Finance Centre", 
        "Lotte World Tower", "One World Trade Center",
        "Guangzhou CTF Finance Center"])
        .range([0, 700])
        .paddingInner(0.3)
        .paddingOuter(0.2);
    
    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 500])
    
    var rects = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 0)
        .attr("x", (d) => {
            return band(d.name)
        })
        .attr("width", band.bandwidth)
        .attr("height", (d) => {
            return y(d.height)
        })
        .attr("fill", "green")
})