async function init() {
    var data = await d3.csv("courses.csv");
    // console.log(data)
    var pie = d3.pie()
    pie(data)
    console.log(pie)


}