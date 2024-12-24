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
        "#FFB3B3", // Sáng hơn #FFC1C1 (Đỏ nhạt hơn)
        "#FFEB8C", // Sáng hơn #FFD8A8 (Vàng cam sáng hơn)
        "#A6FFB3", // Sáng hơn #C1FFC1 (Xanh lá sáng hơn)
        "#D6A6FF", // Sáng hơn #E5C1FF (Tím sáng hơn)
        "#A6C9FF", // Sáng hơn #C1E1FF (Xanh dương sáng hơn)
        "#E6E6E6", // Sáng hơn #E0E0E0 (Xám sáng hơn)
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
