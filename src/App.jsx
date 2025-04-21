import React, { useEffect, useState } from "react";
import data from "./data/data.json";
import "./index.css";
import { Chart as ChartJS, plugins } from 'chart.js/auto'
import {Pie, Line, Bar} from 'react-chartjs-2'



function App() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    setSalesData(data);
  }, []);

  //console.log(salesData);

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

  const [profitList, setProfitList] = useState([]);
  const [totalBuy, setTotalBuy] = useState([]);
  const [totalSell, setTotalSell] = useState([]);

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
    let profits = [];
    let buyList = [];
    let sellList = [];

    for (let idx = 0; idx < months.length; idx++) {
      janQuantity = salesData.filter((data) => data["MONTH"] === months[idx]);
      //console.log("----------------", idx);
      let janBuy = janQuantity
        .map((data) => data["TOTAL Buying value"])
        .map((data) => data.replace("$", ""))
        .map((data) => data.replace(",", ""))
        .map((data) => parseInt(data))
        .reduce((sum, data) => sum + data, 0);
      buyList.push(janBuy);
      setTotalBuy(buyList);
      //console.log("janbuy", buyList)
      let janSell = janQuantity
        .map((data) => data["TOTAL Selling value"])
        .map((data) => data.replace("$", ""))
        .map((data) => data.replace(",", ""))
        .map((data) => parseInt(data))
        .reduce((sum, data) => sum + data, 0);
      sellList.push(janSell);
      setTotalSell(sellList);
      //console.log("janSell", sellList);
      var calculateProfit = janSell - janBuy;
      //console.log(`--------${months[idx]}`, calculateProfit);
      profits.push(calculateProfit);
    }
    setProfitList(profits);
    setTotalBuy(buyList);
    setTotalSell(sellList);
    //console.log(profitList);
  }, [salesData]);

  const lineData = {
    labels: [...new Set(salesData.map((data) => data["MONTH"]))],
    datasets: [
      {
        label: "MONTHLY WISE SALES",
        data: profitList,
      },
      {
        label: "TOTAL BUYING SALES",
        data: totalBuy,
      },
      {
        label: "TOTAL SELLING SALES",
        data: totalSell,
      },
    ],
  };
  //successfully running category
  const [category, setCategory] = useState(0);
  useEffect(() => {
    let countCategory = [];
    const categoryArray = [];
    const categoryData = [
      "Category01",
      "Category02",
      "Category03",
      "Category04",
      "Category05",
    ];
    for (let idx = 0; idx < categoryData.length; idx++) {
      let categoryField = salesData.filter(
        (data) => data["CATEGORY"] === categoryData[idx]
      );
      countCategory.push(categoryField);
    }
    //console.log(countCategory)

    for (let i = 0; i < countCategory.length; i++) {
      categoryArray.push(countCategory[i].length);
    }
    //console.log(categoryArray)
    setCategory(categoryArray);
  }, [salesData]);

  const barData = {
    //labels: [...new Set(salesData.map((data) => data["CATEGORY"]))],
    labels: [
      "Category01",
      "Category02",
      "Category03",
      "Category04",
      "Category05",
    ],
    datasets: [
      {
        label: "SUCCESSFULLY RUNNING CATEGORY",
        data: category,
        backgroundColor: "rgba(50, 142, 222, 0.4)",
      },
    ],
  };

  //successfully running product
  const [product, setProduct] = useState([]);
  const [countQuantity, setCountQuantity] = useState([]);
  const productField = [];
  const productCount = [];

  useEffect(() => {
    const products = [...new Set(salesData.map((data) => data["PRODUCT"]))];
    for (let idx = 0; idx < products.length; idx++) {
      productField.push(
        salesData.filter((data) => data["PRODUCT"] === products[idx])
      );
    }
    for (let i = 0; i < productField.length; i++) {
      productCount.push(productField[i].length);
    }
    setProduct(productCount);

    let quantityField = [];
    let quantityCount = [];

    for (let i = 0; i < products.length; i++) {
      quantityField = salesData
        .filter((data) => data["PRODUCT"] === products[i])
        .map((data) => data["QUANTITY"])
        .map((data) => parseInt(data))
        .reduce((sum, data) => sum + data, 0);
      quantityCount.push(quantityField);
    }
    setCountQuantity(quantityCount)
    //console.log("qc", quantityCount);

  }, [salesData]);

  const productQuantityData = {
    labels: [...new Set(salesData.map((data) => data["PRODUCT"]))],
    datasets: [
      {
        label: "SUCCESSFULLY RUNNING PRODUCT",
        data: product,
        // backgroundColor:"rgba(200, 10, 90, 0.7)"
      },
      {
        label: "SUCCESSFULLY RUNNING QUANTITY",
        data: countQuantity,
        // backgroundColor:"rgb(20, 250, 175)"
      },
    ],
  };
  const productQuantityOptions = {
    plugins: {
      legend: { position: "top" },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  //daily in month sales
  const months = [
    "Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ]
  const labelData = [salesData
    .filter((data) => data["MONTH"] === months[0] && data["YEAR"] === "2021")
    .map((data)=> data["DAY "])
  ]
  console.log(labelData);
  const labelValue = [salesData
    .filter((data) => data["MONTH"] === months[0] && data["YEAR"] === "2021")
    .map((data)=> data["QUANTITY"])
  ]
  console.log("lv", labelValue)
  
  const dailyData = {
    labels: labelData,
    datasets: [
      {
        label: "Daily Sales",
        data: labelValue,
      }
    ]
  }

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
            <h3 className="bg-teal-600 text-white font-bold px-2 py-2 text-xl rounded-md">
              TOTAL PROFIT
            </h3>
            <div className="bg-teal-50 mt-4 px-2 py-2 font-semibold">
              Profit : ${profit}
            </div>
          </div>
          {/*Monthly section*/}
          <div className="w-[50%] h-130 ml-10 p-5 rounded-md bg-teal-100">
            <h1 className="bg-teal-600 text-white font-bold px-2 py-2 text-xl rounded-md">
              Monthly profit chart
            </h1>
            <Line data={lineData} />
          </div>
          <div className="bg-teal-100 rounded-md p-5 ml-10 w-[30%]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        {/*daily in a month sales*/}
        <div className="ml-10 p-5 rounded-md bg-teal-100">
          <div className="flex gap-150 bg-teal-600 rounded-md">
            <h3 className="font-bold text-white px-2 py-2 text-xl ">
              Daily Monthly Sales
            </h3>
            <select className="border-1">
              <option>January</option>
              <option>Febraury</option>
              <option>March</option>
              <option>April</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>September</option>
              <option>September</option>
            </select>
          </div>

          <div>
            <div>
              <Bar data={dailyData} />
            </div>
          </div>
        </div>

        {/*Running successful product*/}
        <div className="flex  m-10">
          <div className="bg-teal-100 w-[30%] mr-10 rounded-lg">
            <h3 className="m-5 bg-teal-600 text-white font-bold px-2 py-2 text-xl rounded-md">
              Running successful category
            </h3>
            <Bar data={barData} />
          </div>
          {/*Running products products and quantity*/}
          <div className="bg-teal-100 w-[70%] rounded-lg">
            <h3 className="bg-teal-600 m-5 text-white font-bold px-2 py-2 text-xl rounded-md">
              Running successful product
            </h3>
            <Bar data={productQuantityData} options={productQuantityOptions} />
          </div>
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
