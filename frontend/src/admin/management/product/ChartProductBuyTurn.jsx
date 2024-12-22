import React, { useEffect, useState } from "react";
import LineChart from "../../../components/LineChart";

export default function ChartProductBuyTurn({ data }) {
  const [series, setSeries] = useState({});
  useEffect(() => {
    const seriesChart = [
      {
        name: "Buyturn",
        type: "line",
        data: data,
      },
    ];
    setSeries(seriesChart);
  }, [data]);

  return <LineChart series={series} title={"Lượt mua theo tháng"} />;
}
