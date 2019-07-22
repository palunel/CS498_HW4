async function init() {
    var data = await d3.csv("courses.csv");
    var duration = [];
    var course = [];
    var codes = [];
    total = 0
    data.forEach(row => {
        course.push(row.Course);
        duration.push(row.Total_Time);
        codes.push(row.Code)
        total += parseInt(row.Total_Time);
    });
    console.log("test44");
    console.log(total);

    var tooltip = d3.select("#tooltip");

    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = 0.8 * Math.min(width, height) / 2,
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
                .html("<b>" + course[i] + "</b>" + "<br> Total time: " + parseInt(duration[i]).toFixed(0) + " hours");
        })
        .on("mouseout", () => {
            tooltip
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
        })
        .on("click", () => {
            svg.selectAll("*").remove();
            tooltip.style("opacity", 0);
        });
    g.selectAll("text")
        .data(pie(duration))
        .enter()
        .append("text")
        .attr("transform", (d) => {
            return "translate(" + arc.centroid(d) + ")"
        })
        .attr("text-anchor", "middle")
        .text((d, i) => {
            return (codes[i] + " (" + (parseInt(duration[i] * 100) / total).toFixed(0) + "%)")
        })
        .style("font-size", '15px')
        .style("font-weight", "bold")

}
