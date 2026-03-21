const dataset = [
    { width: 100, height: 300, fill: "red" },
    { width: 100, height: 200, fill: "green" },
    { width: 100, height: 100, fill: "blue" },
    { width: 100, height: 50, fill: "pink" }
]
const svg = d3.select("svg")

//select all rectangles from the html, if there are none, still creates the variable and use the first list element ( The red one ) 
const rects = svg.selectAll("rect")
    .data(dataset)// this adds the dataset
    .attr("width", (d) => { return d.width })//automatically passes the dataset to the function
    .attr("height", (d) => { return d.height })
    .attr("fill", (d) => { return d.fill })


rects.enter()//enter is basically loop that loops throug the rects _enter attribute ( this is a list, console.log(rect) to see it)
    .append("rect")//!!!IMPORTANT: enter() only loops throug the unused list elements
    .attr("width", (d) => { return d.width })//automatically passes the dataset to the function
    .attr("height", (d) => { return d.height })
    .attr("fill", (d) => { return d.fill })
console.log(rects)