// import React from "react";
// import { Link } from "react-router-dom";

// const ProductListItems = ({ product }) => {
//   const {
//     price,
//     category,
//     subs,
//     shipping,
//     color,
//     brand,
//     quantity,
//     sold,
//   } = product;

//   return (
//     <ul className="list-group">
//       <li className="list-group-item">
//         Price{" "}
//         <span className="label label-default label-pill pull-xs-right">
//           $ {price}
//         </span>
//       </li>

//       {category && (
//         <li className="list-group-item">
//           Category{" "}
//           <Link
//             to={`/category/${category.slug}`}
//             className="label label-default label-pill pull-xs-right"
//           >
//             {category.name}
//           </Link>
//         </li>
//       )}

//       {subs && (
//         <li className="list-group-item">
//           Sub Categories
//           {subs.map((s) => (
//             <Link
//               key={s._id}
//               to={`/sub/${s.slug}`}
//               className="label label-default label-pill pull-xs-right"
//             >
//               {s.name}
//             </Link>
//           ))}
//         </li>
//       )}

//       <li className="list-group-item">
//         Shipping{" "}
//         <span className="label label-default label-pill pull-xs-right">
//           {shipping}
//         </span>
//       </li>

//       <li className="list-group-item">
//         Color{" "}
//         <span className="label label-default label-pill pull-xs-right">
//           {color}
//         </span>
//       </li>

//       <li className="list-group-item">
//         Brand{" "}
//         <span className="label label-default label-pill pull-xs-right">
//           {brand}
//         </span>
//       </li>

//       <li className="list-group-item">
//         Available{" "}
//         <span className="label label-default label-pill pull-xs-right">
//           {quantity}
//         </span>
//       </li>

//       <li className="list-group-item">
//         Sold{" "}
//         <span className="label label-default label-pill pull-xs-right">
//           {sold}
//         </span>
//       </li>
//     </ul>
//   );
// };

// export default ProductListItems;
import React from "react";
import { Link } from "react-router-dom";
import "./ProductListItems.css"; // Importing external CSS for styles

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } = product;

  return (
    <ul className="list-group product-list">
      <li className="list-group-item">
        <span className="list-label">Price</span>
        <span className="list-value">$ {price}</span>
      </li>

      {category && (
        <li className="list-group-item">
          <span className="list-label">Category</span>
          <Link to={`/category/${category.slug}`} className="list-value link">
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          <span className="list-label">Sub Categories</span>
          <span className="list-value">
            {subs.map((s, index) => (
              <Link
                key={s._id}
                to={`/sub/${s.slug}`}
                className="link"
              >
                {s.name}
                {index < subs.length - 1 && ", "}
              </Link>
            ))}
          </span>
        </li>
      )}

      <li className="list-group-item">
        <span className="list-label">Shipping</span>
        <span className="list-value">{shipping}</span>
      </li>

      <li className="list-group-item">
        <span className="list-label">Color</span>
        <span className="list-value">{color}</span>
      </li>

      <li className="list-group-item">
        <span className="list-label">Brand</span>
        <span className="list-value">{brand}</span>
      </li>

      <li className="list-group-item">
        <span className="list-label">Available</span>
        <span className="list-value">{quantity}</span>
      </li>

      <li className="list-group-item">
        <span className="list-label">Sold</span>
        <span className="list-value">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
