async function init() {
    data = await d3.csv("https://flunky.github.io/cars2017.csv");
    xdomain = [10, 150];
    xrange = [0, 400];
    ydomain = [10, 150];
    yrange = [400, 0];
    xs = d3.scaleLog().domain(xdomain).range(xrange);
    ys = d3.scaleLog().domain(ydomain).range(yrange);

    d3.select("svg").append("g").attr("transform", "translate(50,50)")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => { return xs(d.AverageCityMPG) })
        .attr("cy", (d) => { return ys(d.AverageHighwayMPG) })
        .attr("r", (d) => { return 2 + parseInt(d.EngineCylinders) });

    d3.select("svg").append("g")
        .attr("transform", "translate(50,50)")
        .call(d3.axisLeft(ys).tickValues([10, 20, 50, 100]).tickFormat(d3.format("~s")));

    d3.select("svg").append("g")
        .attr("transform", "translate(50,450)")
        .call(d3.axisBottom(xs).tickValues([10, 20, 50, 100]).tickFormat(d3.format("~s")));
}