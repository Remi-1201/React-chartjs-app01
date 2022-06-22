import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export const options = {
  legend: {
    display: true,
    position: "bottom" as const
  }
};

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
            confirmedCases.push(parseInt(dataObj.Cases, []));
            let tempDate = new Date(dataObj.Date);
            dateOfCases.push(
              tempDate.getUTCMonth() + 1 + "/" + tempDate.getUTCDate()
            );
          }
        });
      setDataChart({
        labels: dateOfCases, //x軸ラベル
        datasets: [
          {
            label: "新型コロナウイルス感染者数の推移（日本）", //y軸のラベル
            backgroundColor: "transparent", //グラフの色
            borderColor: "rgb(255, 99, 132)", //
            // borderWidth: 1,
            data: confirmedCases //y軸ラベル
          }
        ]
      });
    };
    fetchData();
  }, []);

  return (
    <div className="bg-light p-5">
      <Line data={dataChart} options={options} />
    </div>
  );
};

export default App;
