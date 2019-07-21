async function init() {
    var data = await d3.csv("../data/courses.csv");
    // console.log(data)
    var pie = d3.pie()
    console.log(pie(data))


}