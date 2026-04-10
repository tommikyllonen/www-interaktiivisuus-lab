const svg = d3.select("svg");

d3.json("measures.json").then((dataset) => {
  const dataArray = [];
  for (let i in dataset) {
    const measure = dataset[i].Measures;
    dataArray.push(measure);
  }
  console.log(dataArray);
  const maxAirPressure = d3.max(dataArray, (d) =>
    parseFloat(d.AirPressure.replace(",", ".")),
  );
  const minAirPressure = d3.min(dataArray, (d) =>
    parseFloat(d.AirPressure.replace(",", ".")),
  );
  const maxtemp = d3.max(dataArray, (d) => d.Temp);
  const mintemp = d3.min(dataArray, (d) => d.Temp);
  const maxHumidity = d3.max(dataArray, (d) => d.Humidity);
  const minHumidity = d3.min(dataArray, (d) => d.Humidity);

  console.log(`${minAirPressure} mmHg`);
  console.log(`${maxAirPressure} mmHg`);
  console.log(`${mintemp} °C`);
  console.log(`${maxtemp} °C`);
  console.log(`${minHumidity} %`);
  console.log(`${maxHumidity} %`);
});

const colorPicker = (value, max, min) => {
  if (value > min && value < max) {
    return "green";
  } else {
    return value === max ? "red" : "blue";
  }
};

const margins = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100,
};

const graphHeight = 400 - margins.top - margins.bottom;
const graphWidth = 600 - margins.left - margins.right;

const graphGroup = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margins.left},${margins.top})`);

d3.json("measures2.json").then((dataset) => {
  const dataArray = [];
  for (let i in dataset) {
    const measure = dataset[i].Measures;
    dataArray.push(measure);
  }

  const max = d3.max(dataArray, (d) => parseFloat(d.Temp.replace(",", ".")));
  const min = d3.min(dataArray, (d) => parseFloat(d.Temp.replace(",", ".")));

  const yScale = d3.scaleLinear().domain([0, max]).range([graphHeight, 0]);
  const xScale = d3
    .scaleBand()
    .domain(dataArray.map((item) => item.Timestamp))
    .range([0, graphWidth])
    .paddingInner(0.1);
  skipperInt = 0;
  const rects = graphGroup.selectAll("rect").data(dataArray);
  rects
    .attr("width", xScale.bandwidth())
    .attr(
      "height",
      (d) => graphHeight - yScale(parseFloat(d.Temp.replace(",", "."))),
    )
    .attr("fill", (d) =>
      colorPicker(parseFloat(d.Temp.replace(",", ".")), max, min),
    )
    .attr("x", (d) => {
      xScale(d.Timestamp);
    })
    .attr("y", (d) => yScale(parseFloat(d.Temp.replace(",", "."))));

  rects
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr(
      "height",
      (d) => graphHeight - yScale(parseFloat(d.Temp.replace(",", "."))),
    )
    .attr("fill", (d) =>
      colorPicker(parseFloat(d.Temp.replace(",", ".")), max, min),
    )
    .attr("x", (d) => xScale(d.Timestamp))
    .attr("y", (d) => yScale(parseFloat(d.Temp.replace(",", "."))));

  const xAxisGroup = graphGroup
    .append("g")
    .attr("transform", `translate(0, ${graphHeight})`);
  const yAxisGroup = graphGroup.append("g");

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  const xAxisText = xAxisGroup.selectAll("text");

  xAxisText.each(function (_, i) {
    if (i % 4 !== 0) d3.select(this).remove();
  });

  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end")
    .attr("dx", "-1em");
});
