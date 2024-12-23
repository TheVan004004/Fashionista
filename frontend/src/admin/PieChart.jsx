import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";

export default function PieChart(props) {
  const [data, setData] = useState([]);
  const [optionsChart, setOptionsChart] = useState("");
  console.log(data);
  useEffect(() => {
    if (props.data) {
      setData(loadDataChart);
    }
  }, [props.data]);
  useEffect(() => {
    if (props.data) {
      loadOptionsChart();
    }
  }, [data]);
  const loadDataChart = useMemo(() => {
    let sumPercentageOther = 0;
    let dataProps = [];
    props.data.forEach((d, index) => {
      if (props.limitPoint && index + 1 > props.limitPoint) {
        sumPercentageOther += d.valuePercentage;
        return;
      }
      dataProps.push([d.title, d.valuePercentage]);
    });
    if (props.limitPoint) dataProps.push(["other", sumPercentageOther]);
    return dataProps;
  }, [props.data]);
  const loadOptionsChart = () => {
    const options = {
      chart: {
        type: "pie",
        margin: [0, 0, 0, 0],
        height: "100%",
      },
      tooltip: {
        pointFormat: "<b>{point.percentage:.2f}%</b>",
        backgroundColor: "#000000a6",
        style: {
          color: "white",
        },
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false, // Tắt nhãn hiển thị và tia chỉ
          },
          borderWidth: 0,
          innerSize: "80%", // Tạo hiệu ứng "donut chart"
          size: "100%",
        },
      },
      colors: [
        "#FFC1C1",
        "#FFD8A8",
        "#C1FFC1",
        "#E5C1FF",
        "#C1E1FF",
        "#E0E0E0",
      ],
      series: [
        {
          type: "pie",
          data: data,
          states: {
            hover: {
              halo: null, // Tắt hiệu ứng viền khi hover
            },
          },
          borderRadius: 0,
        },
      ],
    };
    if (props.colors) options.colors = props.colors;
    setOptionsChart(options);
  };

  return <HighchartsReact highcharts={Highcharts} options={optionsChart} />;
}
