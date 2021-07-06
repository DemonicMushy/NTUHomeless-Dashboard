import React from "react";

var BarChart = require("react-chartjs").Bar;

// const chartData = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       fillColor: "rgba(220,220,220,0.5)",
//       strokeColor: "rgba(220,220,220,0.8)",
//       highlightFill: "rgba(220,220,220,0.75)",
//       highlightStroke: "rgba(220,220,220,1)",
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };

const chartOptions = {
  type: "bar",
  options: {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
      },
    },
  },
};

export default function MyComponent(props) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    if (props.data) {
      var datasets = [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: props.data.dataArray,
        },
      ];
      setData({
        labels: props.data.labels,
        datasets: datasets,
      });
    }
  }, [props.data]);
  return (
    <React.Fragment>
      {data && <BarChart data={data} options={chartOptions} />}
    </React.Fragment>
  );
}
