import React from "react";

var PieChart = require("react-chartjs").Pie;

const COLORS = [
  "#4dc9f6", //light blue
  "#f67019", //orange
  "#f53794", //pink
  "#537bc4", //less light blue
  "#acc236", //lime?
  "#166a8f", //less less light blue
  "#00a950", //green
  "#58595b", //grey
  "#8549ba", //purple
  "#c9c420", //yellow
  "#8c262d", //red
];

// const chartData = [
//   {
//     value: 100,
//     color: "#FFFFFF",
//     highlight: "#FFFFFF",
//     label: "Placeholder",
//   },
// ];

const chartOptions = {
  type: "pie",
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: "Chart.js Pie Chart",
      },
    },
  },
};

export default function MyComponent(props) {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    if (props.data) {
      var temp = props.data.map((val, idx) => {
        return { ...val, color: COLORS[idx], highlight: COLORS[idx] };
      });
      var temp2 = temp.sort((a, b) => a.value < b.value);
      setData(temp2);
    }
  }, [props.data]);
  return (
    <React.Fragment>
      {props.data && (
        <PieChart
          // style={{ width: "100%", height: "100%" }}
          data={data}
          options={chartOptions}
          width="600%"
          height="100%"
        />
      )}
    </React.Fragment>
  );
}
