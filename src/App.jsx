import React, { useEffect, useState } from "react";
import data from "./data/data.json";
import "./index.css";
import { Chart as ChartJS, plugins } from 'chart.js/auto'
import {Pie, Line} from 'react-chartjs-2'



function App() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    setSalesData(data);
  }, []);

  //onsole.log(salesData);

  const wholesaler = salesData
    .filter((data) => data["SALE TYPE"] === "Wholesaler")
    .reduce((sum, data) => sum + Number(data["QUANTITY"]), 0);
  //console.log("wholesaler", wholesaler)

  const online = salesData
    .filter((data) => data["SALE TYPE"] === "Online")
    .reduce((sum, data) => sum + Number(data["QUANTITY"]), 0);

  //console.log("online", online);

  const direct = salesData
    .filter((data) => data["SALE TYPE"] === "Direct Sales")
    .reduce((sum, data) => sum + Number(data["QUANTITY"]), 0);

  //console.log("direct", direct);

  const pieData = {
    labels: [...new Set(salesData.map((data) => data["SALE TYPE"]))],
    datasets: [
      {
        label: "SALES TYPES",
        data: [wholesaler, online, direct],
        // backgroundColor: [
        //   "#FF6347",
        //   "#32CD32",
        //   "#1E90FF",
        // ],
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "SALES",
        font: {
          size: 20,
          weight: "bold",
          family: "sans-serif",
        },
        color: "#333",
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
  };

  //console.log(pieData);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const totalBuying = salesData
      .map((data) => data["TOTAL Buying value"])
      .map((data) => data.replace("$", ""))
      .map((data) => data.replace(",", ""))
      .map((data) => parseFloat(data))
      .reduce((sum, data) => sum + data, 0);
    //console.log("totalbuy", totalBuying);
    const totalSelling = salesData
      .map((data) => data["TOTAL Selling value"])
      .map((data) => data.replace("$", ""))
      .map((data) => data.replace(",", ""))
      .map((data) => parseFloat(data))
      .reduce((sum, data) => sum + data, 0);
    //console.log("totalsell", totalSelling);

    const calculateProfit = totalSelling - totalBuying;
    setProfit(calculateProfit.toFixed(2));
  }, [salesData]);



  const [profitList, setProfitList] = useState([])

  useEffect(() => {
   
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let janQuantity = 0;
    let profits = []
      for (let idx = 0; idx < months.length; idx++) {
        janQuantity = salesData.filter((data) => data["MONTH"] === months[idx]);
        console.log("----------------", idx);
        let janBuy = janQuantity
          .map((data) => data["TOTAL Buying value"])
          .map((data) => data.replace("$", ""))
          .map((data) => data.replace(",", ""))
          .map((data) => parseInt(data))
          .reduce((sum, data) => sum + data, 0);
        let janSell = janQuantity
          .map((data) => data["TOTAL Selling value"])
          .map((data) => data.replace("$", ""))
          .map((data) => data.replace(",", ""))
          .map((data) => parseInt(data))
          .reduce((sum, data) => sum + data, 0);
        var calculateProfit = janSell - janBuy;
        console.log(`--------${months[idx]}`, calculateProfit);
        profits.push(calculateProfit)
      }
    setProfitList(profits);

    console.log(profitList)

  }, [salesData])

  const lineData = {
    labels: [...new Set(salesData.map((data) => data["MONTH"]))],
    datasets: [
      {
        label: "MONTHLY WISE SALES",
        data: profitList,
      },
    ],
  };

  return (
    <>
      {/*PieChart based on salestype*/}
      <div>
        <h1 className="text-4xl text-center m-10 bg-teal-100 p-2 rounded-md font-serif">
          Sales Interface
        </h1>
        {/*profit section*/}
        <div className="flex m-10">
          <div className="w-[20%] h-50 p-5 rounded-md bg-teal-100">
            <h3 className="bg-teal-500 text-white font-bold px-2 py-2 text-xl rounded-md">
              TOTAL PROFIT
            </h3>
            <div className="bg-teal-50 mt-4 px-2 py-2 font-semibold">
              Profit : ${profit}
            </div>
          </div>
          {/*Monthly section*/}
          <div className="w-[80%] h-200  ml-10 p-5 rounded-md bg-teal-100">
            <h1 className="bg-teal-500 text-white font-bold px-2 py-2 text-xl rounded-md">
              Monthly profit chart
            </h1>
            <Line data={lineData} />
          </div>
        </div>
        {/*Running*/}
        <div className="bg-teal-100 rounded-md p-5 m-10 w-[30%]">
          <Pie data={pieData} options={pieOptions} />
        </div>

        <table className="m-10 border-1 border-teal-50 bg-teal-100 rounded-sm">
          <thead>
            <tr className="text-sm text-center">
              <th className="border-2 border-teal-50 px-3 py-2">Sl.No</th>
              {salesData && salesData.length > 0 ? (
                Object.keys(salesData[0]).map((key, idx) => (
                  <th key={idx} className="border-2 border-teal-50 px-3 py-2">
                    {key}
                  </th>
                ))
              ) : (
                <th>No data available</th>
              )}
            </tr>
          </thead>
          <tbody>
            {salesData && salesData.length > 0 ? (
              salesData.map((item, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="border-2 border-teal-50 px-3 py-2 text-center">
                    {rowIdx + 1}
                  </td>
                  {Object.values(item).map((data, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="border-2 border-teal-50 px-3 py-2"
                    >
                      {data}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="100%"
                  className="border-2 border-teal-50 px-3 py-2"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
