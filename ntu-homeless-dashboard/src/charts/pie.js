import React from "react";

var PieChart = require("react-chartjs").Pie;

var COLORS = require("../utils/utils").COLORS

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
        display: false
      },
      title: {
        display: false,
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
