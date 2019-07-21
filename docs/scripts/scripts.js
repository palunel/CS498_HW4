async function init() {
    var data = await d3.csv("courses.csv");
    var duration = [];
    var course = [];
    data.forEach(row => {
        course.push(row.Course);
        duration.push(row.Total_Time);
    });
    console.log("test6")
    console.log(duration)

    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(0)

    //Generate groups
    var arcs = g.selectAll("arc")
        .data(pie(duration))
        .enter()
        .append("g")
        .attr("class", "arc")

    //Draw arc paths
    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc);

    d3.select(arc).transition().duration(3000).outerRadius(radius);
}