import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

const MovieChart = ({
  chartNames,
  chartData,
  chartTitle,
  chartType,
}: {
  chartNames: any;
  chartData: any;
  chartTitle: string;
  chartType: string;
}) => {
  console.log(chartData);
  console.log(chartNames);
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  console.log(chartType);
  const chartOptions: Highcharts.Options = {
    chart: {
      type: chartType,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 50,
      backgroundColor: "#080808",
    },
    title: {
      text: "Top 10 movies by " + chartTitle,
      style: {
        color: "white",
        font: "Poppins",
        textAlign: "left",
      },
    },

    xAxis: {
      categories: chartData.map((data: any) => data.name),
      gridLineWidth: 0,
      tickColor: "white",
    },

    yAxis: {
      min: 0,
      tickAmount: 7,
      title: {
        text: "",
      },

      gridLineWidth: 0,
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span><br/>',
    },
    series: [
      {
        name: "Usage",
        type: "column",
        colorByPoint: true,
        // data: Object.values(obj)
        // or:
        data: chartData.map((data: any) => data.y),
      },
    ],
    legend: { enabled: false },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
};
export default MovieChart;
