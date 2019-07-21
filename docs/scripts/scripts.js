async function init() {
    var data = await d3.csv("courses.csv");
    var duration = [];
    var course = [];
    data.forEach(row => {
        course.push(row.Course);
        duration.push(row.Total_Time);
    });
    total = duration.reduce((a, b) => a + b, 0)
    console.log("test34")
    console.log(total)

    var tooltip = d3.select("#tooltip")

    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#5355ae', '#6d70ba', '#888ac7', '#a3a4d3', '#bdbee0', '#d8d9ed']);
    var background = svg.attr("background")

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    //Generate groups
    g.selectAll("path")
        .data(pie(duration))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => { return color(i) })
        .on("mouseover", (d, i) => {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(course[i])
        })
        .on("mouseout", () => {
            tooltip
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
        })
    g.selectAll('text')
        .data(pie(duration))
        .enter()
        .append("text")
        .attr("transform", (d) => {
            return "translate(" + arc.centroid(d) + ")"
        })
        .attr("text-anchor", "middle")
        .text((d, i) => {
            return duration[i] / total;
        })
        .style("font-size", '10px')

}
