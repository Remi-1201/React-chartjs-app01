import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const App = () => {
  const [dataChart, setDataChart] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let confirmedCases = [];
      let dateOfCases = [];
      await axios
        .get("https://api.covid19api.com/dayone/country/japan/status/confirmed")
        .then((res) => {
          for (let dataObj of res.data) {
            confirmedCases.push(parseInt(dataObj.Cases, 0));
            let tempDate = new Date(dataObj.Date);
            dateOfCases.push(
              tempDate.getUTCMonth() + 1 + "/" + tempDate.getUTCDate()
            );
          }
        });
      setDataChart({
        type: "line",
        labels: dateOfCases, //x軸ラベル
        datasets: [
          {
            // 修正-　y軸のラベル名を短く
            label: "感染者数",
            // 修正-　ラインの背景色を透明に
            backgroundColor: "transparent",
            //追加-　点のスタイルを"line"に変更
            pointStyle: "line",
            // 修正-　線の色を紅色に変更
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
            data: confirmedCases //y軸ラベル
          }
        ]
      });
    };
    fetchData();
  }, []);

  const options = {
    legend: {
      display: true,
      //修正- ラベルは右側に書いたほうが認知されやすい
      position: "right" as const,
      //追加-　ラベルを最も右上に
      align: "start",

      //追加-　labelsのカスタマイズ
      labels: {
        color: "rgb(255, 99, 132)",
        // 追加-　ラベルボックスに点のスタイルを適用
        usePointStyle: true
      }
    },
    scales: {
      yAxes: [
        {
          //追加- y軸ラベル表示
          scaleLabel: {
            display: true,
            labelString: "人数"
          },
          // 追加-　y軸のデータのmax, minを設定
          ticks: {
            max: 160000,
            min: 0
          }
        }
      ],
      xAxes: [
        {
          //追加- x軸ラベル表示
          scaleLabel: {
            display: true,
            labelString: "2021年度"
          },

          type: "time",
          time: {
            unit: "month",
            // 追加-　1か月ごとの遷移を描画
            stepSize: 1,
            // 修正- 軸ラベルはなるべく傾けないように
            displayFormats: {
              month: "MMM"
            }
          },
          // 追加-　x軸のデータのmax, minを設定
          ticks: {
            min: "1",
            max: "12"
          }
        }
      ]
    },
    title: {
      display: true,
      //修正-　ラベル名は長かったのでタイトル名にしました
      text: ["新型コロナウイルス", "感染者数の推移（2021年）"]
    }
  };

  return (
    <div className="bg-light p-5">
      <Line data={dataChart} options={options} />
    </div>
  );
};

export default App;
