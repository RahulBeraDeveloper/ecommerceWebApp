import React, { useEffect, useState } from "react";
import { getProducts } from "../functions/product";
import Jumbotron from "../components/cards/Jumbotron";
import ProductBanner from "./ProductBanner";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import Loader from "../components/cards/Loader";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts('createdAt','desc',4).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (



<>

{loading ? (
  <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Loader />
  </div>
) : (
  // Show the content after loading is complete
  <>
    <div
      className="card shadow p-2 mb-5 bg-white rounded"
      style={{ borderRadius: "5px" }}
    >
      <ProductBanner />
    </div>
    <div
      className="jumbotron text-danger h1 font-weight-bold text-center"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
    </div>

    <h3
      className="text-center p-3 mt-5 mb-5  jumbotron"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      New Arrivals
    </h3>
    <NewArrivals />

    <h4
      className="text-center p-3 mt-5 mb-5  jumbotron"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      Best Sellers
    </h4>
    <BestSellers />

    <br />
    <br />
  </>
)}
</>
);
};

export default Home;
