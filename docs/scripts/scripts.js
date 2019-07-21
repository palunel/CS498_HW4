async function init() {
    var data = await d3.csv("courses.csv");
    console.log("test1")
    console.log(data[1].Total_Time)
    var pie = d3.pie()
    console.log(pie(data.Total_Time))
}