// import React from "react";
// import "./Carousel.css"; // Custom styles for the arrows and layout
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import banner1 from "../images/banner1.jpg";
// import banner2 from "../images/banner2.jpg";
// import banner3 from "../images/banner3.jpg"
// import banner4 from "../images/banner4.jpg"
// import banner10 from "../images/banner10.jpg"
// import banner13 from "../images/banner13.jpg"
// const ProductBanner = () => {
//   const settings = {
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };

//   return (
//     <div id="slider">
//       <Slider {...settings}>
//         <div className="slide">
//         <img
//             src={banner10}
//             alt="Banner 10"
//           />
//         </div>
//         <div className="slide">
//           <img
//             src={banner4}
//             alt="Banner 4"
//           />
//         </div>
//         <div className="slide">
//           <img
//        src={banner3}
//             alt="Banner 3"
//           />
//         </div>
//         <div className="slide">
//           <img
//        src={banner1}
//             alt="Banner 1"
//           />
//         </div>

//         <div className="slide">
//           <img
//        src={banner13}
//             alt="Banner 13"
//           />
//         </div>
//       </Slider>
//     </div>
//   );
// };

// const SampleNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", zIndex: 999 }}
//       onClick={onClick}
//     >
//       →
//     </div>
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", zIndex: 999 }}
//       onClick={onClick}
//     >
//       ←
//     </div>
//   );
// };




// export default ProductBanner;
import React from "react";
import "./Carousel.css"; // Custom styles for the arrows and layout
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.jpg";
import banner10 from "../images/banner10.jpg";
import banner13 from "../images/banner13.jpg";

const ProductBanner = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enables auto-slide
    autoplaySpeed: 3000, // Time interval for auto-slide in milliseconds
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div id="slider">
      <Slider {...settings}>
        <div className="slide">
          <img src={banner2} alt="Banner 2" />
        </div>
        <div className="slide">
          <img src={banner4} alt="Banner 4" />
        </div>
        <div className="slide">
          <img src={banner3} alt="Banner 3" />
        </div>
        <div className="slide">
          <img src={banner1} alt="Banner 1" />
        </div>
        <div className="slide">
          <img src={banner13} alt="Banner 13" />
        </div>
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 999 }}
      onClick={onClick}
    >
      →
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 999 }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

export default ProductBanner;
