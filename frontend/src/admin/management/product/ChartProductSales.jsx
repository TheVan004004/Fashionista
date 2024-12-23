import React, { useEffect, useState } from "react";
import LineChart from "../../../components/LineChart";

export default function ChartProductSales({ data }) {
  const [series, setSeries] = useState({});
  const [tooltip, setTooltip] = useState({});
  useEffect(() => {
    const seriesChart = [
      {
        name: "Buyturn",
        type: "line",
        data: data,
      },
    ];
    setSeries(seriesChart);
    const tooltipChart = {
      formatter() {
        let result = `<div style="min-width:50px; padding:8px 8px 1px 8px; "> `;
        this.points.forEach((element) => {
          result += `<div style="margin-bottom:7px;">
                                   <div style="font-size:16px; color: ${
                                     element.color
                                   };font-weight:600; font-family:'Open Sans', sans-serif;">Tháng ${
            element.x
          }</div>
                                  <div style="color: ${
                                    element.color
                                  };font-weight:400; font-family:'Open Sans', sans-serif;">${element.y.toLocaleString(
            "vi-VN"
          )} VNĐ </div>
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
    };
    setTooltip(tooltipChart);
  }, [data]);

  return <LineChart series={series} title={""} tooltip={tooltip} />;
}
