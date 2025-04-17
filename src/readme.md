{/*import { useState, useEffect } from "react";
import { Chart as ChartJS, defaults, elements } from "chart.js/auto";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function App() {
  const [products, setProducts] = useState([]);
  const [menClothing, setMenClothing] = useState([]);
  const [womenClothing, setWomenClothing] = useState([]);
  const [jewelCategory, setJewelCategory] = useState([]);
  const [electronics, setElectronics] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Products:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setMenClothing(
        products.filter((product) => product.category === "men's clothing")
      );
      setWomenClothing(
        products.filter((product) => product.category === "women's clothing")
      );
      setJewelCategory(
        products.filter((product) => product.category === "jewelery")
      );
      setElectronics(
        products.filter((product) => product.category === "electronics")
      );
    }
  }, [products]);

  const barData = {
    labels: menClothing.map((item) => item.title),
    datasets: [
      {
        label: "Men's Clothing Prices",
        data: menClothing.map((item) => item.price),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: womenClothing.map((item) => item.title),
    datasets: [
      {
        label: "Women's Clothing Prices",
        data: womenClothing.map((item) => item.price),
        backgroundColor: womenClothing.map(() => "rgba(255, 99, 132, 0.5)"),
        borderColor: womenClothing.map(() => "rgba(255, 99, 132, 1)"),
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: electronics.map((item) => item.title),
    datasets: [
      {
        label: "Electronics Prices",
        data: electronics.map((item) => item.price),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const jewelData = {
    labels: jewelCategory.map((item) => item.title),
    datasets: [
      {
        label: "Jewelry Prices",
        data: jewelCategory.map((item) => item.price),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-5">
      <div className="text-center m-5 font-bold text-2xl">
        Men's Clothing Prices
      </div>
      <div className="chart-wrapper">
        <Bar data={barData} />
      </div>

      <div className="text-center m-5 font-bold text-2xl">
        Women's Clothing Prices
      </div>
      <div className="chart-wrapper">
        <Pie data={pieData} />
      </div>

      <div className="text-center m-5 font-bold text-2xl">
        Electronics Prices
      </div>
      <div className="chart-wrapper">
        <Line data={lineData} />
      </div>

      <div className="text-center m-5 font-bold text-2xl">Jewelry Prices</div>
      <div className="chart-wrapper">
        <Doughnut data={jewelData} />
      </div>
    </div>
  );
}

export default App;
*/}
