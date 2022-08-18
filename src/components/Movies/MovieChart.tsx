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
      categories: chartNames,
      gridLineWidth: 0,
      tickColor: "white",
    },
    yAxis: {
      min: 0,
      tickAmount: 5,
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
        name: "Movies",
        type: chartType == "bar" ? "bar" : "column",
        data: chartData,
        colorByPoint: true,
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
};
export default MovieChart;
