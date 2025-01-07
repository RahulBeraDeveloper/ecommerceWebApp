// import React, { useState, useEffect } from "react";
// import UserNav from "../../components/nav/UserNav";
// import { getWishlist, removeWishlist } from "../../functions/user";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { DeleteOutlined } from "@ant-design/icons";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     loadWishlist();
//   }, []);

//   const loadWishlist = () =>
//     getWishlist(user.token).then((res) => {
//       // console.log(res);
//       setWishlist(res.data.wishlist);
//     });

//   const handleRemove = (productId) =>
//     removeWishlist(productId, user.token).then((res) => {
//       loadWishlist();
//     });

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-2">
//           <UserNav />
//         </div>
//         <div className="col">
//           <h4>Wishlist</h4>

//           {wishlist.map((p) => (
//             <div key={p._id} className="alert alert-secondary">
//               <Link to={`/product/${p.slug}`}>{p.title}</Link>
//               <span
//                 onClick={() => handleRemove(p._id)}
//                 className="btn btn-sm float-right"
//               >
//                 <DeleteOutlined className="text-danger" />
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wishlist;
import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user?.token) {
      loadWishlist();
    }
  }, [user?.token]); // Ensure the token is available before fetching

  const loadWishlist = () => {
    getWishlist(user.token)
      .then((res) => {
        setWishlist(res.data?.wishlist || []); // Fallback to an empty array
      })
      .catch((err) => {
        console.error("Failed to load wishlist:", err);
        setWishlist([]); // Ensure it's an array even on error
      });
  };

  const handleRemove = (productId) => {
    removeWishlist(productId, user.token)
      .then((res) => {
        loadWishlist();
      })
      .catch((err) => {
        console.error("Failed to remove item from wishlist:", err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Wishlist</h4>

          {wishlist.length > 0 ? (
            wishlist.map((p) => (
              <div key={p._id} className="alert alert-secondary">
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                  onClick={() => handleRemove(p._id)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
              </div>
            ))
          ) : (
            <p>No items in your wishlist yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
