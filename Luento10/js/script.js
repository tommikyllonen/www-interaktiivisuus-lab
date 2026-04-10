// etsi svg elementti
const svg = d3.select("svg");

const margins = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100
};

const graphHeight = 600 - margins.top - margins.bottom;
const graphWidth = 600 - margins.left - margins.right;

const graphGroup = svg.append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margins.left},${margins.top})`);
// lue data

d3.json("dogsinfi.json").then(dataset => {
  const max = d3.max(dataset, d => d.count);

  const yScale = d3.scaleLinear()
    .domain([0, max])
    .range([graphHeight, 0]);

  const xScale = d3.scaleBand()
    .domain(dataset.map(item => item.breed))
    .range([0, graphWidth])
    .paddingInner(0.1);

  console.log(xScale.bandwidth());
  console.log(xScale("Saksanpaimenkoira"));
  const rects = graphGroup.selectAll("rect")
    .data(dataset);
  rects.attr("width", xScale.bandwidth())
    .attr("height", d => graphHeight - yScale(d.count))
    .attr("fill", "red")
    .attr("x", d => xScale(d.breed))
    .attr("y", d => yScale(d.count));

  rects.enter().append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", d => graphHeight - yScale(d.count))
    .attr("fill", "red")
    .attr("x", d => xScale(d.breed))
    .attr("y", d => yScale(d.count));

  const xAxisGroup = graphGroup.append("g")
    .attr("transform", `translate(0, ${graphHeight})`);
  const yAxisGroup = graphGroup.append("g");

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup.selectAll("text")
    .attr("transform", "rotate(-30)")
    .attr("text-anchor", "end");

});