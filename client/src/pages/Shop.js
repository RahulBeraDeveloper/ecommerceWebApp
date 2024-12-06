import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">search/filter menu</div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

// import React, { useState, useEffect } from "react";
// import { getProductsByCount } from "../functions/product";
// import { useSelector, useDispatch } from "react-redux";
// import ProductCard from "../components/cards/ProductCard";
// import './Shop.css'
// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showFilter, setShowFilter] = useState(false); // State for filter panel visibility

//   useEffect(() => {
//     loadAllProducts();
//   }, []);

//   const loadAllProducts = () => {
//     getProductsByCount(12).then((p) => {
//       setProducts(p.data);
//       setLoading(false);
//     });
//   };

//   const toggleFilterPanel = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleSearch = (query) => {
//     // Implement the logic to search/filter products based on the query
//     console.log("Search for:", query);
//     setShowFilter(false); // Hide the panel after the search
//   };

//   return (
//     <div className="shop-container">
//       {/* Button to open filter/search panel on small screens */}
//       <button
//         className="btn btn-primary d-md-none"
//         onClick={toggleFilterPanel}
//         style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1050 }}
//       >
//         Search/Filter
//       </button>

//       {/* Sliding filter/search panel */}
//       <div
//         className={`filter-panel ${showFilter ? "visible" : ""}`}
//         onClick={toggleFilterPanel}
//       >
//         <div className="filter-content">
//           <h4>Search/Filter Menu</h4>
//           {/* Add search and filter controls here */}
//           <button
//             className="btn btn-secondary"
//             onClick={() => handleSearch("example query")}
//           >
//             Perform Search
//           </button>
//         </div>
//       </div>

//       <div className={`content ${showFilter ? "overlay" : ""}`}>
//         <div className="container-fluid">
//           <div className="row">
//             {/* Hide filter on small screens */}
//             <div className="col-md-3 d-none d-md-block">Search/Filter Menu</div>

//             <div className="col-md-9">
//               {loading ? (
//                 <h4 className="text-danger">Loading...</h4>
//               ) : (
//                 <h4 className="text-danger">Products</h4>
//               )}

//               {products.length < 1 && <p>No products found</p>}

//               <div className="row pb-5">
//                 {products.map((p) => (
//                   <div key={p._id} className="col-md-4 mt-3">
//                     <ProductCard product={p} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;
