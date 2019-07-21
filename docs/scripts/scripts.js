async function init() {
    var data = await d3.csv("courses.csv");
    var duration = [];
    var course = [];
    data.forEach(row => {
        course.push(row.Course);
        duration.push(row.Total_Time);
    });
    console.log("test21")
    console.log(duration)

    var tooltip = d3.select("#tooltip")

    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);
    var background = svg.attr("background")

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    function showTooltip(event, tipText) {
        tooltip.style("opacity", 1)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY) + "px")
            .html(tipText)
    }

    //Generate groups
    g.selectAll("path")
        .data(pie(duration))
        .enter()
        .append("path")
        .attr("d", arc)
        // .attr("fill", "white")
        // .transition().duration(1000).delay(300)
        .attr("fill", (d, i) => { return color(i) })
        .on("mouseover", (d, i) => {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(course[i])
        })
        .on("mouseenter", (d, i) => {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(course[i])
        })
        .on("mouseout", () => { tooltip.style("opacity", 0) })
        .on("mouseleave", () => { tooltip.style("opacity", 0) });


}

