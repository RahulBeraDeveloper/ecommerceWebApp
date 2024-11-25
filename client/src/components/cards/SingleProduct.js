import React, { lazy } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "./SingleProduct.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from '../../images/laptop.png';
import ProductListItems from "./ProductListItems";
const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;

  return (
    <>
      <div className="col-md-7">
       { images && images.length ?(
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
        </Carousel>) :(
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}
        
       
       
      </div>

      <div className="col-md-5">
      <h3 className="p-3"  style={{ backgroundColor: "#D4BEE4"}}>{title}</h3>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
           <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;