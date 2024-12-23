import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef, useState, useEffect } from "react";

export default function LineChart({ series, title, tooltip }) {
  const [optionChart, setOptionChart] = useState({});
  async function getData() {
    try {
      const options = {
        chart: {
          height: 300,
          marginLeft: 0,
          zooming: { type: "x" },
          panning: {
            enabled: true,
            type: "x",
          },
          panKey: "shift",
        },
        title: {
          text: title,
          style: {
            color: "black",
            fontSize: "16px",
          },
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            month: "%b",
          },
          categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          labels: {
            enabled: true,
          },
        },

        yAxis: {
          labels: {
            enabled: true, // Đảm bảo nhãn trên trục Y được bật
          },
          type: "linear", // Hoặc "linear" nếu cần
          labels: {
            enabled: true,
          },
        },
        legend: {
          enabled: false,
        },

        tooltip: tooltip,
        series: series,
      };
      setOptionChart(options);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, [series]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={optionChart}
    ></HighchartsReact>
  );
}
