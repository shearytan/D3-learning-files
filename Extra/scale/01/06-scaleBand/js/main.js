var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 500)

var data = [{day : 'Mon', value: 10},
{day : 'Tue', value: 40},
{day : 'Wed', value: 30},
{day : 'Thu', value: 60},
{day : 'Fri', value: 30}];

var ordinalScale = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemePaired)

var band = d3.scaleBand()
    .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    .range([0, 400])
    .paddingInner(0.1)
    .paddingInner(0.1)

var text = svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', 180)
    .attr('y', (d) => {
        return band(d.day) + 140
    })
    .text((d) => {
        return d.day;
    })

var barChart = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', 100)
    .attr('y', (d) => {
        return band(d.day) + 100
    })
    .attr('height', band.bandwidth())
    .attr('width', (d) => {
        return d.value;
    })
    .attr('fill', (d) => {
        return ordinalScale(d.day)
    })