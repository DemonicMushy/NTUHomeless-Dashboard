import React from "react";

var PieChart = require("react-chartjs").Pie;

const COLORS = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
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
      setData(
        props.data.map((val, idx) => {
          return { ...val, color: COLORS[idx], highlight: COLORS[idx] };
        })
      );
    }
  }, [props.data]);
  return (
    <React.Fragment>
      {props.data && <PieChart data={data} options={chartOptions} />}
    </React.Fragment>
  );
}
