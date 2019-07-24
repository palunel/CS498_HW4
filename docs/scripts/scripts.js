
async function courseOverview() {
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

    var tooltip1 = d3.select("#tooltip1");

    var svg = d3.select(".course"),
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
        .outerRadius(radius);

    var arcOver = d3.arc()
        .innerRadius(0)
        .outerRadius(1.2 * radius);

    document.getElementById("title_1").innerHTML = "Distribution of time spent per subject";

    //Generate groups
    g.selectAll("path")
        .data(pie(duration))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => { return color(i) })
        .on("mouseover", (d, i) => {
            tooltip1.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html("<b>" + course[i] + "</b>" + "<br> Total time: " + parseInt(duration[i]).toFixed(0) + " hours");
        })
        .on("mouseout", (d, i) => {
            tooltip1
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
        })
        .on("click", (d, i) => {
            tooltip1
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0);
            loadCourseDetail(course[i]);
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

async function courseDetail(course) {
    var width = d3.select(".course").attr("width");
    var height = d3.select(".course").attr("height");
    var verticalMargin = 90;
    var horisontalMargin = 100;
    var data = await d3.csv("course_tasks.csv");
    var tasks = [];
    var duration = [];
    var tooltip2 = d3.select("#tooltip2");
    data.forEach(row => {
        tasks.push(row.Task);
        duration.push(row[course])
    });
    var maxValue = 0;
    duration.forEach(item => {
        if (parseFloat(item) > maxValue) {
            maxValue = (parseFloat(item));
        }
    });

    console.log(course, maxValue);

    var scale = ((height - 2 * verticalMargin) / maxValue);

    console.log(scale);
    var interval = (width - 2 * horisontalMargin) / (tasks.length);
    document.getElementById("title_1").innerHTML = course;

    d3.select(".course")
        .selectAll("rect")
        .data(duration)
        .enter()
        .append("rect")
        .attr("fill", "#5355ae")
        .style("stroke", "#ffffff")
        .attr("width", interval)
        .attr("height", (d) => { return scale * d })
        .attr("x", (d, i) => { return (interval * (i) + horisontalMargin) })
        .attr("y", (d) => { return (height - verticalMargin) - scale * d })
        .on("mouseover", (d, i) => {
            tooltip2.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(parseInt(duration[i]).toFixed(0) + " hours");
        })
        .on("mouseout", (d, i) => {
            tooltip2
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
        })
        .on("click", (d, i) => {
            tooltip2
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0);
            loadCourseOverview();
        });

    var y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([height - 2 * verticalMargin, 0]);


    d3.select(".course")
        .append("g")
        .attr("transform", "translate(" + horisontalMargin + "," + verticalMargin + ")")
        .call(d3.axisLeft(y));

    console.log(tasks)
    var x = d3.scaleBand()
        .domain(tasks)
        .range([0, width - 2 * horisontalMargin]);

    var xTranslate = '' + (parseInt(height) - verticalMargin);
    d3.select(".course")
        .append("g")
        .attr("transform", "translate(" + horisontalMargin + "," + xTranslate + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end");
}

async function daysOverview() {
    var width = d3.select(".weekday").attr("width");
    var height = d3.select(".weekday").attr("height");
    var verticalMargin = 90;
    var horisontalMargin = 100;
    var data = await d3.csv("course_days.csv");
    var tooltip2 = d3.select("#tooltip2");
    var days = [];
    var totalDays = [];
    data.forEach(row => {
        days.push(row.Day);
        totalDays.push(row.Total);
    });
    var maxValue = 0;
    totalDays.forEach(item => {
        if (parseFloat(item) > maxValue) {
            maxValue = (parseFloat(item));
        }
    });
    var scale = ((height - 2 * verticalMargin) / maxValue);
    var interval = (width - 2 * horisontalMargin) / (days.length);
    document.getElementById("title_2").innerHTML = "Total time per day of the week";

    d3.select(".weekday")
        .selectAll("rect")
        .data(totalDays)
        .enter()
        .append("rect")
        .attr("fill", "#5355ae")
        .style("stroke", "#ffffff")
        .attr("width", interval)
        .attr("height", (d) => { return scale * d })
        .attr("x", (d, i) => { return (interval * (i) + horisontalMargin) })
        .attr("y", (d) => { return (height - verticalMargin) - scale * d })
        .on("mouseover", (d, i) => {
            tooltip2.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(parseInt(totalDays[i]).toFixed(0) + " hours");
        })
        .on("mouseout", (d, i) => {
            tooltip2
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
        })
        .on("click", (d, i) => {
            tooltip2
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0);
            loadCourseOverview();
        });

    var y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([height - 2 * verticalMargin, 0]);


    d3.select(".weekday")
        .append("g")
        .attr("transform", "translate(" + horisontalMargin + "," + verticalMargin + ")")
        .call(d3.axisLeft(y));

    var x = d3.scaleBand()
        .domain(days)
        .range([0, width - 2 * horisontalMargin]);

    var xTranslate = '' + (parseInt(height) - verticalMargin);
    d3.select(".weekday")
        .append("g")
        .attr("transform", "translate(" + horisontalMargin + "," + xTranslate + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end");
}
async function daysOverview1() {
    var width = d3.select(".weekday").attr("width");
    var height = d3.select(".weekday").attr("height");
    var data = await d3.csv("course_days.csv");
    var days = [];
    var totalDays = [];
    var duration = [];
    var tooltip2 = d3.select("#tooltip2");
    data.forEach(row => {
        days.push(row.Day);
        totalDays.push(row.Total);
    });
    var maxValue = 0;
    totalDays.forEach(item => {
        if (parseFloat(item) > maxValue) {
            maxValue = (parseFloat(item));
        }
    });
    var interval = (height - 200) / (totalDays.length);
    var scale = ((width - 100) / maxValue);
    console.log(days, totalDays);

    document.getElementById("title_2").innerHTML = "Days of the week";

    d3.select(".weekday")
        .selectAll("rect")
        .data(totalDays)
        .enter()
        .append("rect")
        .attr("fill", "#5355ae")
        .style("stroke", "#ffffff")
        .attr("height", interval)
        .attr("width", (d) => { return scale * d })
        .attr("y", (d, i) => { return (interval * (i) + 50) })
        .attr("x", "50")
        .on("mouseover", (d, i) => {
            tooltip2.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(parseInt(totalDays[i]).toFixed(0) + " hours");
        })
        .on("mouseout", (d, i) => {
            tooltip2
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
        })
        .on("click", (d, i) => {
            tooltip2
                .style("opacity", 0)
                .style("left", 0)
                .style("top", 0)
            // loadCourseOverview();

        })
        .append("a")
        .attr("display", "inline-block")
        .attr("innerHtml", (i) => { return days[i] });

    var y = d3.scaleBand()
        .domain(days)
        .range([0, height - 200])
    d3.select(".weekday")
        .append("g")
        .attr("transform", "translate(50,50)")
        .call(d3.axisLeft(y));

    var x = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, width - 100]);

    console.log("translate(50," + (parseInt(height) + 50) + ")")

    d3.select(".weekday")
        .append("g")
        .attr("transform", "translate(50,450)")
        .call(d3.axisBottom(x));
}

async function loadCourseDetail(course) {
    var svg = d3.select(".course")
    svg.selectAll("*").remove();
    await courseDetail(course);
}
async function loadCourseOverview() {
    var svg = d3.select(".course")
    svg.selectAll("*").remove();
    await courseOverview();
}


async function init() {
    await courseOverview();
    await daysOverview();
    console.log("test54");
}
