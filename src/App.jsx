import React, { useEffect, useState } from "react";
import data from "./data/data.json";
import "./index.css";
import { Chart as ChartJS, plugins } from 'chart.js/auto'
import {Pie} from 'react-chartjs-2'






function App() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    setSalesData(data);
  }, []);

  console.log(salesData);


  const wholesaler = salesData
    .filter((data) => data["SALE TYPE"] === "Wholesaler")
    .reduce((sum, data) => sum + Number(data["QUANTITY"]), 0); 
    ;

  console.log("wholesaler", wholesaler)
  
  const online = salesData
    .filter((data) => data["SALE TYPE"] === "Online")
    .reduce((sum, data) => sum + Number(data["QUANTITY"]), 0);
  
  console.log("online", online);

  const direct = salesData
    .filter((data) => data["SALE TYPE"] === "Direct Sales")
    .reduce((sum, data) => sum + Number(data["QUANTITY"]), 0);
  
  console.log("direct", direct);

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

  console.log(pieData);


  return (
    <>
      {/*PieChart based on salestype*/}
      <div>
        <h1 className="text-4xl text-center m-10 bg-teal-100 p-2 rounded-md font-serif">
          Sales Interface
        </h1>
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
