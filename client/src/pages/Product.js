import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
const Product = () => {
  const [product, setProduct] = useState({});
  const { slug } = useParams(); // Get the 'slug' parameter from the URL
  const [star, setStar] = useState(0);
    // redux
    const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);


  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  
  const loadSingleProduct = () => {
    getProduct(slug)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  };


  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };


  return <>   
   <div className="container-fluid">
  <div className="row pt-4">
    <SingleProduct
     product={product}
     onStarClick={onStarClick}
     star={star}

     />
  </div>

  <div className="row">
    <div>Related products</div>
  </div>
</div></>;
};

export default Product;
