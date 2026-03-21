const canvas = d3.select("#canvas");//.canvas is just the class name, not canvas element

const svg = canvas.append("svg").attr("width", 600).attr("height", 600);

//Create group:
const group = svg.append("g")

group.append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 100)
    .attr("height", 200)
    .attr("fill", "red")
    .attr("stroke", "black");
group.append("circle")
    .attr("cx", 250)
    .attr("cy", 200)
    .attr("r", 50)
    .attr("fill", "cyan")
    .attr("stroke", "black");
group.append("line")
    .attr("x1", 400)
    .attr("y1", 200)
    .attr("x2", 350)
    .attr("y2", 350)
    .attr("stroke", "black");

svg.append("text")
    .attr("x", 250)
    .attr("y", 100)
    .attr("fill", "green")
    .attr("class", "teksti")
    .text("Place your SVG text here")