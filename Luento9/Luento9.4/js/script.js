const svg = d3.select("svg");

d3.json("example.json").then(dataset => {
    const circles = svg.selectAll("circle")
        .data(dataset)
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("r", d => d.population / 2000)
        .attr("fill", d => d.fill);


    circles.enter()
        .append("circle")
        .attr("cx", 300)
        .attr("cy", d => 600 - d.population / 2000)
        .attr("r", (d) => d.population / 2000)
        .attr("fill", (d) => d.fill)
})


