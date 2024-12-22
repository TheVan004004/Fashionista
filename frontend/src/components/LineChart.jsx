import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef, useState, useEffect } from "react";

export default function LineChart({ series, title }) {
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
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          labels: {
            enabled: true,
          },
        },

        // yAxis: {
        //   type: "logarithmic",
        // },
        legend: {
          enabled: false,
        },

        tooltip: {
          formatter() {
            let result = `<div style="min-width:50px; padding:8px 8px 1px 8px; "> `;
            this.points.forEach((element) => {
              result += `<div style="margin-bottom:7px;">
                                     <div style="font-size:16px; color: ${element.color};font-weight:600; font-family:'Open Sans', sans-serif;">Tháng ${element.x}</div>
                                    <div style="color: ${element.color};font-weight:400; font-family:'Open Sans', sans-serif;">${element.y} lượt mua</div>
                                </div>`;
            });
            result += "</div>";
            return result;
          },
          style: {
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "12px",
          },
          shadow: {
            color: "#0000001F",
            offsetX: 0,
            offsetY: 0,
            opacity: 0.2,
            width: 6,
          },
          backgroundColor: "white",
          borderRadius: 10,
          borderWidth: 0,
          shared: true,
          useHTML: true,
        },
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
