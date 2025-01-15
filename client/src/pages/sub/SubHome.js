
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSub } from "../../functions/subCategory";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = () => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams(); // Use useParams to get the slug

  useEffect(() => {
    setLoading(true);
    getSub(slug)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setSub(res.data.sub || {}); // Default to an empty object if undefined
        setProducts(res.data.products || []); // Default to an empty array if undefined
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sub category:", err);
        setLoading(false);
      });
  }, [slug]); // Add slug as a dependency to re-fetch when slug changes

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5  jumbotron" style={{ backgroundColor: "#f0f0f0" }}>
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5  jumbotron" style={{ backgroundColor: "#f0f0f0" }}>
              {products?.length || 0} Products in "{sub?.name || 'this'}" sub-category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products && products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <h5 className="text-center col-12">No products found in this sub-category.</h5>
        )}
      </div>
  
    </div>
  );
};

export default SubHome;
