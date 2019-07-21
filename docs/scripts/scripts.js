async function init() {
    var data = await d3.csv("courses.csv");
    var pie = d3.pie()
    console.log(pie(data.Total_Time))
}