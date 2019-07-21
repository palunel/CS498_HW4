async function init() {
    var data = await d3.csv("courses.csv");
    var duration = []
    var course = []
    data.forEach(row => {
        course.push(row.Course)
        duration.push(row.Total_Time)
    });
    console.log("test2")
    console.log(course[1])
    console.log(duration[1])
    var pie = d3.pie()
    console.log(pie(duration))
}