
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { getUserCart, emptyUserCart, saveUserAddress ,applyCoupon , createCashOrderForUser } from "../functions/user";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import { useNavigate  } from 'react-router-dom'; // Import useNavigate
// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({});
//   const [addressSaved, setAddressSaved] = useState(false);
//    const [coupon, setCoupon] = useState("");
//   const navigate = useNavigate(); // Use navigate
  
//   //discount price
//   // discount price
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
//   const [discountError, setDiscountError] = useState("");

//   const errorTimeoutRef = React.useRef(null);
//   const couponErrorTimeoutRef = React.useRef(null);
//   const dispatch = useDispatch();
//   const { user , COD } = useSelector((state) => ({ ...state }));
//   const couponTrueOrFalse = useSelector((state) => state.coupon);
//   useEffect(() => {
//     getUserCart(user.token).then((res) => {
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });
//   }, []);

  

//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       errorTimeoutRef.current = setTimeout(() => {
//         setErrors({});
//       }, 10000);
//     }

//     return () => {
//       clearTimeout(errorTimeoutRef.current);
//     };
//   }, [errors]);

//   useEffect(() => {
//     if (discountError) {
//       couponErrorTimeoutRef.current = setTimeout(() => {
//         setDiscountError("");
//       }, 10000);
//     }

//     return () => {
//       clearTimeout(couponErrorTimeoutRef.current);
//     };
//   }, [discountError]);

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: [],
//     });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart is Empty",
//         text: "Continue shopping!",
//       });
//     });
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     if (!phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits";
//     }

//     if (!address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveAddressToDb = () => {
//     if (validateFields()) {
//       saveUserAddress(user.token, address ,phone).then((res) => {
//         if (res.data.ok) {
//           setAddressSaved(true);
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Address saved successfully!",
//           });
//         }
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please correct the errors before proceeding.",
//       });
//     }
//   };

//   const applyDiscountCoupon = () => {
//     console.log("send coupon to backend", coupon);
//     applyCoupon(user.token, coupon).then((res) => {
//       console.log("RES ON COUPON APPLIED", res.data);
//       if (res.data) {
//         setTotalAfterDiscount(res.data);
//         // update redux coupon applied
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: true,
//         });
//       }
//       // error
//       if (res.data.err) {
//         setDiscountError(res.data.err);
//         // update redux coupon applied
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: false,
//         });
//       }
//     });
//   };
//   const createCashOrder = () => {
//     createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
//       console.log("USER CASH ORDER CREATED RES ", res);
//       // empty cart form redux, local Storage, reset coupon, reset COD, redirect
//       if (res.data.ok) {
//         // empty local storage
//         if (typeof window !== "undefined") localStorage.removeItem("cart");
//         // empty redux cart
//         dispatch({
//           type: "ADD_TO_CART",
//           payload: [],
//         });
//         // empty redux coupon
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: false,
//         });
//         // empty redux COD
//         dispatch({
//           type: "COD",
//           payload: false,
//         });
//         // mepty cart from backend
//         emptyUserCart(user.token);
//         // redirect
//         setTimeout(() => {
//           navigate("/user/history");
//         }, 1000);
//       }
//     });
//   };
//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         {/* Address & Coupon Section */}
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Delivery Details
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 {/* Email Field */}
//                 <MDBInput
//                   placeholder="Enter your email"
//                   type="email"
//                   className="mb-4"
//                   value={user?.email || ""}
//                   disabled
//                 />

//                 {/* Phone Number Field */}
//                 <div className="mb-4">
//                   <MDBInput
//                     placeholder="Enter your number"
//                     type="text"
//                     value={phone}
//                     onChange={(e) => {
//                       const input = e.target.value;
//                       if (/^\d*$/.test(input) && input.length <= 10) {
//                         setPhone(input);
//                       }
//                     }}
//                     style={{
//                       borderColor: errors.phone ? "red" : "",
//                     }}
//                   />
//                   {errors.phone && (
//                     <small className="text-danger">{errors.phone}</small>
//                   )}
//                 </div>

//                 {/* Address Field */}
//                 <div className="mb-4">
//                   <MDBTextArea
//                     placeholder="Enter your address"
//                     rows={4}
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     style={{
//                       borderColor: errors.address ? "red" : "",
//                     }}
//                   />
//                   {errors.address && (
//                     <small className="text-danger">{errors.address}</small>
//                   )}
//                 </div>

//                 {/* Save Address Button */}
//                 <button
//                   type="button"
//                   className="btn btn-primary mb-3"
//                   onClick={saveAddressToDb}
//                 >
//                   Save Address
//                 </button>
//                 <hr />

//                 {/* Coupon Section */}
//                 <MDBTypography tag="h5" className="mb-3">
//                   Got a Coupon?
//                 </MDBTypography>
//                 <MDBInput
//                   placeholder="Enter coupon code"
//                   type="text"
//                   className="mb-3"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-info"
//                   onClick={applyDiscountCoupon}
//                 >
//                   Apply Coupon
//                 </button>
//                 {discountError && (
//                   <p className="text-danger mt-2">{discountError}</p>
//                 )}
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         {/* Order Summary Section */}
//         <MDBCol md="4" className="mb-4">
//           <MDBCard>
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Order Summary
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem
//                     key={i}
//                     className="d-flex justify-content-between"
//                   >
//                     <span>
//                       {p.product.title} ({p.color}) x {p.count}
//                     </span>
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between">
//                   <strong>Total:</strong>
//                   <strong>${total}</strong>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               {totalAfterDiscount > 0 && (
//                 <p className="bg-success text-white p-2 mt-2 rounded">
//                   Discount Applied: Total Payable: ${totalAfterDiscount}
//                 </p>
//               )}
//               <div className="d-flex justify-content-between mt-3">
//               {COD ? (
//   <button
//     className="btn btn-success"
//     disabled={!addressSaved || !products.length}
//     onClick={createCashOrder}
//   >
//     Place Order
//   </button>
// ) : (
//   <button
//     type="button"
//     className="btn btn-success"
//     disabled={!addressSaved || !products.length}
//     onClick={() => navigate("/payment")}
//   >
//     Place Order
//   </button>
// )}

//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={emptyCart}
//                   disabled={!products.length}
//                 >
//                   Empty Cart
//                 </button>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </div>
//   );
// };

// export default Checkout;














// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   getUserCart,
//   emptyUserCart,
//   saveUserAddress,
//   applyCoupon,
//   createCashOrderForUser,
//   getUserDetails,
// } from "../functions/user";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({});
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [coupon, setCoupon] = useState("");
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
//   const [discountError, setDiscountError] = useState("");

//   const errorTimeoutRef = React.useRef(null);
//   const couponErrorTimeoutRef = React.useRef(null);
//   const dispatch = useDispatch();
//   const { user, COD } = useSelector((state) => ({ ...state }));
//   const couponTrueOrFalse = useSelector((state) => state.coupon);
//   const navigate = useNavigate();

//   const isFormValid = address.trim() && phone.trim().length === 10;

//   useEffect(() => {
//     // Fetch cart details
//     getUserCart(user.token).then((res) => {
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });

//     // Fetch user details for phone and address
//     getUserDetails(user.token).then((res) => {
//       if (res.data) {
//         setPhone(res.data.phone || "");
//         setAddress(res.data.address || "");
//       }
//     });
//   }, [user.token]);

//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       errorTimeoutRef.current = setTimeout(() => {
//         setErrors({});
//       }, 10000);
//     }
//     return () => {
//       clearTimeout(errorTimeoutRef.current);
//     };
//   }, [errors]);

//   useEffect(() => {
//     if (discountError) {
//       couponErrorTimeoutRef.current = setTimeout(() => {
//         setDiscountError("");
//       }, 10000);
//     }
//     return () => {
//       clearTimeout(couponErrorTimeoutRef.current);
//     };
//   }, [discountError]);

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: [],
//     });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart is Empty",
//         text: "Continue shopping!",
//       });
//     });
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     if (!phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits";
//     }

//     if (!address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveAddressToDb = () => {
//     if (validateFields()) {
//       saveUserAddress(user.token, address, phone).then((res) => {
//         if (res.data.ok) {
//           setAddressSaved(true);
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Address saved successfully!",
//           });
//         }
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please correct the errors before proceeding.",
//       });
//     }
//   };

//   const applyDiscountCoupon = () => {
//     applyCoupon(user.token, coupon).then((res) => {
//       if (res.data) {
//         setTotalAfterDiscount(res.data);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: true,
//         });
//       }
//       if (res.data.err) {
//         setDiscountError(res.data.err);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: false,
//         });
//       }
//     });
//   };

//   const createCashOrder = () => {
//     createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
//       if (res.data.ok) {
//         if (typeof window !== "undefined") localStorage.removeItem("cart");
//         dispatch({ type: "ADD_TO_CART", payload: [] });
//         dispatch({ type: "COUPON_APPLIED", payload: false });
//         dispatch({ type: "COD", payload: false });
//         emptyUserCart(user.token);
//         setTimeout(() => {
//           navigate("/user/history");
//         }, 1000);
//       }
//     });
//   };

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Delivery Details
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBInput
//                   placeholder="Enter your email"
//                   type="email"
//                   className="mb-4"
//                   value={user?.email || ""}
//                   disabled
//                 />
//                 <div className="mb-4">
//                   <MDBInput
//                     placeholder="Enter your number"
//                     type="text"
//                     value={phone}
//                     onChange={(e) => {
//                       const input = e.target.value;
//                       if (/^\d*$/.test(input) && input.length <= 10) {
//                         setPhone(input);
//                       }
//                     }}
//                     style={{
//                       borderColor: errors.phone ? "red" : "",
//                     }}
//                   />
//                   {errors.phone && (
//                     <small className="text-danger">{errors.phone}</small>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                   <MDBTextArea
//                     placeholder="Enter your address"
//                     rows={4}
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     style={{
//                       borderColor: errors.address ? "red" : "",
//                     }}
//                   />
//                   {errors.address && (
//                     <small className="text-danger">{errors.address}</small>
//                   )}
//                 </div>
//                 <button
//                   type="button"
//                   className="btn btn-primary mb-3"
//                   onClick={saveAddressToDb}
//                 >
//                   Save Address
//                 </button>
//                 <hr />
//                 <MDBTypography tag="h5" className="mb-3">
//                   Got a Coupon?
//                 </MDBTypography>
//                 <MDBInput
//                   placeholder="Enter coupon code"
//                   type="text"
//                   className="mb-3"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-info"
//                   onClick={applyDiscountCoupon}
//                 >
//                   Apply Coupon
//                 </button>
//                 {discountError && (
//                   <p className="text-danger mt-2">{discountError}</p>
//                 )}
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//         <MDBCol md="4" className="mb-4">
//           <MDBCard>
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Order Summary
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem
//                     key={i}
//                     className="d-flex justify-content-between"
//                   >
//                     <span>
//                       {p.product.title} ({p.color}) x {p.count}
//                     </span>
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between">
//                   <strong>Total:</strong>
//                   <strong>${total}</strong>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               {totalAfterDiscount > 0 && (
//                 <p className="bg-success text-white p-2 mt-2 rounded">
//                   Discount Applied: Total Payable: ${totalAfterDiscount}
//                 </p>
//               )}
//               <div className="d-flex justify-content-between mt-3">
//                 {COD ? (
//                   <button
//                     className="btn btn-success"
//                     disabled={!isFormValid || !products.length}
//                     onClick={createCashOrder}
//                   >
//                     Place Order
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     disabled={!isFormValid || !products.length}
//                     onClick={() => navigate("/payment")}
//                   >
//                     Place Order
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={emptyCart}
//                   disabled={!products.length}
//                 >
//                   Empty Cart
//                 </button>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </div>
//   );
// };

// export default Checkout;





// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   getUserCart,
//   emptyUserCart,
//   saveUserAddress,
//   applyCoupon,
//   createCashOrderForUser,
//   getUserDetails,
//   updateUserDetailsById, // Import the update function
// } from "../functions/user";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({});
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [coupon, setCoupon] = useState("");
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
//   const [discountError, setDiscountError] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false); // Track if the user is updating address/phone

//   const errorTimeoutRef = React.useRef(null);
//   const couponErrorTimeoutRef = React.useRef(null);
//   const dispatch = useDispatch();
//   const { user, COD } = useSelector((state) => ({ ...state }));
//   const couponTrueOrFalse = useSelector((state) => state.coupon);
//   const navigate = useNavigate();

//   const isFormValid = address.trim() && phone.trim().length === 10;

//   useEffect(() => {
//     getUserCart(user.token).then((res) => {
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });

//     getUserDetails(user.token).then((res) => {
//       if (res.data) {
//         setPhone(res.data.phone || "");
//         setAddress(res.data.address || "");
//       }
//     });
//   }, [user.token]);

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: [],
//     });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart is Empty",
//         text: "Continue shopping!",
//       });
//     });
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     if (!phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits";
//     }

//     if (!address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveAddressToDb = () => {
//     if (validateFields()) {
//       saveUserAddress(user.token, address, phone).then((res) => {
//         if (res.data.ok) {
//           setAddressSaved(true);
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Address saved successfully!",
//           });
//         }
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please correct the errors before proceeding.",
//       });
//     }
//   };

//   const applyDiscountCoupon = () => {
//     applyCoupon(user.token, coupon).then((res) => {
//       if (res.data) {
//         setTotalAfterDiscount(res.data);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: true,
//         });
//       }
//       if (res.data.err) {
//         setDiscountError(res.data.err);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: false,
//         });
//       }
//     });
//   };

//   const createCashOrder = () => {
//     createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
//       if (res.data.ok) {
//         if (typeof window !== "undefined") localStorage.removeItem("cart");
//         dispatch({ type: "ADD_TO_CART", payload: [] });
//         dispatch({ type: "COUPON_APPLIED", payload: false });
//         dispatch({ type: "COD", payload: false });
//         emptyUserCart(user.token);
//         setTimeout(() => {
//           navigate("/user/history");
//         }, 1000);
//       }
//     });
//   };

//   const updateUserDetails = () => {
//     if (validateFields()) {
//       updateUserDetailsById(user._id, { phone, address }, user.token).then(
//         (res) => {
//           if (res.data) {
//             Swal.fire({
//               icon: "success",
//               title: "Updated!",
//               text: "Your details have been updated.",
//             });
//             setIsUpdating(false); // Reset the update state
//           }
//         }
//       );
//     }
//   };

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Delivery Details
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBInput
//                   placeholder="Enter your email"
//                   type="email"
//                   className="mb-4"
//                   value={user?.email || ""}
//                   disabled
//                 />
//                 <div className="mb-4">
//                   <MDBInput
//                     placeholder="Enter your number"
//                     type="text"
//                     value={phone}
//                     onChange={(e) => {
//                       const input = e.target.value;
//                       if (/^\d*$/.test(input) && input.length <= 10) {
//                         setPhone(input);
//                       }
//                     }}
//                     style={{
//                       borderColor: errors.phone ? "red" : "",
//                     }}
//                   />
//                   {errors.phone && (
//                     <small className="text-danger">{errors.phone}</small>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                   <MDBTextArea
//                     placeholder="Enter your address"
//                     rows={4}
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     style={{
//                       borderColor: errors.address ? "red" : "",
//                     }}
//                   />
//                   {errors.address && (
//                     <small className="text-danger">{errors.address}</small>
//                   )}
//                 </div>
//                 <div className="d-flex justify-content-between mb-3">
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={saveAddressToDb}
//                     disabled={isUpdating || !address.trim() || !phone.trim()}
//                   >
//                     Save Address
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-info"
//                     onClick={updateUserDetails}
//                     disabled={isUpdating || !address.trim() || !phone.trim()}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//                 <hr />
//                 <MDBTypography tag="h5" className="mb-3">
//                   Got a Coupon?
//                 </MDBTypography>
//                 <MDBInput
//                   placeholder="Enter coupon code"
//                   type="text"
//                   className="mb-3"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-info"
//                   onClick={applyDiscountCoupon}
//                 >
//                   Apply Coupon
//                 </button>
//                 {discountError && (
//                   <p className="text-danger mt-2">{discountError}</p>
//                 )}
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//         <MDBCol md="4" className="mb-4">
//           <MDBCard>
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Order Summary
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem
//                     key={i}
//                     className="d-flex justify-content-between"
//                   >
//                     <span>
//                       {p.product.title} ({p.color}) x {p.count}
//                     </span>
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between">
//                   <strong>Total:</strong>
//                   <strong>${total}</strong>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               {totalAfterDiscount > 0 && (
//                 <p className="bg-success text-white p-2 mt-2 rounded">
//                   Discount Applied: Total Payable: ${totalAfterDiscount}
//                 </p>
//               )}
//               <div className="d-flex justify-content-between mt-3">
//                 {COD ? (
//                   <button
//                     className="btn btn-success"
//                     disabled={!isFormValid || !products.length}
//                     onClick={createCashOrder}
//                   >
//                     Place Order
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     disabled={!isFormValid || !products.length}
//                     onClick={() => navigate("/payment")}
//                   >
//                     Place Order
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={emptyCart}
//                   disabled={!products.length}
//                 >
//                   Empty Cart
//                 </button>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </div>
//   );
// };

// export default Checkout;
















// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   getUserCart,
//   emptyUserCart,
//   saveUserAddress,
//   applyCoupon,
//   createCashOrderForUser,
//   getUserDetails,
//   updateUserDetailsById,
// } from "../functions/user";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({});
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [coupon, setCoupon] = useState("");
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
//   const [discountError, setDiscountError] = useState("");

//   const [initialAddress, setInitialAddress] = useState("");
//   const [initialPhone, setInitialPhone] = useState("");

//   const errorTimeoutRef = React.useRef(null);
//   const couponErrorTimeoutRef = React.useRef(null);
//   const dispatch = useDispatch();
//   const { user, COD } = useSelector((state) => ({ ...state }));
//   const couponTrueOrFalse = useSelector((state) => state.coupon);
//   const navigate = useNavigate();

//   const isFormValid = address.trim() && phone.trim().length === 10;

//   useEffect(() => {
//     // Fetch cart details
//     getUserCart(user.token).then((res) => {
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });

//     // Fetch user details for phone and address
//     getUserDetails(user.token).then((res) => {
//       if (res.data) {
//         setPhone(res.data.phone || "");
//         setAddress(res.data.address || "");
//         setInitialPhone(res.data.phone || "");
//         setInitialAddress(res.data.address || "");
//       }
//     });
//   }, [user.token]);

//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       errorTimeoutRef.current = setTimeout(() => {
//         setErrors({});
//       }, 10000);
//     }
//     return () => {
//       clearTimeout(errorTimeoutRef.current);
//     };
//   }, [errors]);

//   useEffect(() => {
//     if (discountError) {
//       couponErrorTimeoutRef.current = setTimeout(() => {
//         setDiscountError("");
//       }, 10000);
//     }
//     return () => {
//       clearTimeout(couponErrorTimeoutRef.current);
//     };
//   }, [discountError]);

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: [],
//     });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart is Empty",
//         text: "Continue shopping!",
//       });
//     });
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     if (!phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits";
//     }

//     if (!address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveAddressToDb = () => {
//     if (validateFields()) {
//       saveUserAddress(user.token, address, phone).then((res) => {
//         if (res.data.ok) {
//           setAddressSaved(true);
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Address saved successfully!",
//           });
//         }
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please correct the errors before proceeding.",
//       });
//     }
//   };

//   const updateAddressToDb = () => {
//     if (validateFields()) {
//       updateUserDetailsById(user._id, { phone, address }, user.token).then(
//         (res) => {
//           if (res.data) {
//             setInitialPhone(phone);
//             setInitialAddress(address);
//             Swal.fire({
//               icon: "success",
//               title: "Success!",
//               text: "Address and Phone updated successfully!",
//             });
//           }
//         }
//       );
//     }
//   };

//   const applyDiscountCoupon = () => {
//     applyCoupon(user.token, coupon).then((res) => {
//       if (res.data) {
//         setTotalAfterDiscount(res.data);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: true,
//         });
//       }
//       if (res.data.err) {
//         setDiscountError(res.data.err);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: false,
//         });
//       }
//     });
//   };

//   const createCashOrder = () => {
//     createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
//       if (res.data.ok) {
//         if (typeof window !== "undefined") localStorage.removeItem("cart");
//         dispatch({ type: "ADD_TO_CART", payload: [] });
//         dispatch({ type: "COUPON_APPLIED", payload: false });
//         dispatch({ type: "COD", payload: false });
//         emptyUserCart(user.token);
//         setTimeout(() => {
//           navigate("/user/history");
//         }, 1000);
//       }
//     });
//   };

//   const isUpdateDisabled = !phone.trim() || !address.trim() || phone === initialPhone || address === initialAddress;
//   const isSaveDisabled = phone.trim() && address.trim() && phone !== initialPhone && address !== initialAddress;

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Delivery Details
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBInput
//                   placeholder="Enter your email"
//                   type="email"
//                   className="mb-4"
//                   value={user?.email || ""}
//                   disabled
//                 />
//                 <div className="mb-4">
//                   <MDBInput
//                     placeholder="Enter your number"
//                     type="text"
//                     value={phone}
//                     onChange={(e) => {
//                       const input = e.target.value;
//                       if (/^\d*$/.test(input) && input.length <= 10) {
//                         setPhone(input);
//                       }
//                     }}
//                     style={{
//                       borderColor: errors.phone ? "red" : "",
//                     }}
//                   />
//                   {errors.phone && (
//                     <small className="text-danger">{errors.phone}</small>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                   <MDBTextArea
//                     placeholder="Enter your address"
//                     rows={4}
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     style={{
//                       borderColor: errors.address ? "red" : "",
//                     }}
//                   />
//                   {errors.address && (
//                     <small className="text-danger">{errors.address}</small>
//                   )}
//                 </div>
//                 <button
//                   type="button"
//                   className="btn btn-primary mb-3"
//                   onClick={saveAddressToDb}
//                   disabled={isSaveDisabled}
//                 >
//                   Save Address
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning mb-3 ms-2"
//                   onClick={updateAddressToDb}
//                   disabled={isUpdateDisabled}
//                 >
//                   Update Address
//                 </button>
//                 <hr />
//                 <MDBTypography tag="h5" className="mb-3">
//                   Got a Coupon?
//                 </MDBTypography>
//                 <MDBInput
//                   placeholder="Enter coupon code"
//                   type="text"
//                   className="mb-3"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-info"
//                   onClick={applyDiscountCoupon}
//                 >
//                   Apply Coupon
//                 </button>
//                 {discountError && (
//                   <p className="text-danger mt-2">{discountError}</p>
//                 )}
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//         <MDBCol md="4" className="mb-4">
//           <MDBCard>
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Order Summary
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem
//                     key={i}
//                     className="d-flex justify-content-between"
//                   >
//                     <span>
//                       {p.product.title} ({p.color}) x {p.count}
//                     </span>
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between">
//                   <strong>Total:</strong>
//                   <strong>${total}</strong>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               {totalAfterDiscount > 0 && (
//                 <p className="bg-success text-white p-2 mt-2 rounded">
//                   Discount Applied: Total Payable: ${totalAfterDiscount}
//                 </p>
//               )}
//               <div className="d-flex justify-content-between mt-3">
//                 {COD ? (
//                   <button
//                     className="btn btn-success"
//                     disabled={!isFormValid || !products.length}
//                     onClick={createCashOrder}
//                   >
//                     Place Order
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     disabled={!isFormValid || !products.length}
//                     onClick={() => navigate("/payment")}
//                   >
//                     Place Order
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={emptyCart}
//                   disabled={!products.length}
//                 >
//                   Empty Cart
//                 </button>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </div>
//   );
// };

// export default Checkout;



// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   getUserCart,
//   emptyUserCart,
//   saveUserAddress,
//   applyCoupon,
//   createCashOrderForUser,
//   getUserDetails,
//   updateUserDetailsById,
// } from "../functions/user";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({});
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [coupon, setCoupon] = useState("");
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
//   const [discountError, setDiscountError] = useState("");

//   const [initialAddress, setInitialAddress] = useState("");
//   const [initialPhone, setInitialPhone] = useState("");
//   const [isAddressUpdated, setIsAddressUpdated] = useState(false); // Flag to track if address is updated

//   const errorTimeoutRef = React.useRef(null);
//   const couponErrorTimeoutRef = React.useRef(null);
//   const dispatch = useDispatch();
//   const { user, COD } = useSelector((state) => ({ ...state }));
//   const couponTrueOrFalse = useSelector((state) => state.coupon);
//   const navigate = useNavigate();

//   const isFormValid = address.trim() && phone.trim().length === 10;

//   useEffect(() => {
//     // Fetch cart details
//     getUserCart(user.token).then((res) => {
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });

//     // Fetch user details for phone and address
//     getUserDetails(user.token).then((res) => {
//       if (res.data) {
//         setPhone(res.data.phone || "");
//         setAddress(res.data.address || "");
//         setInitialPhone(res.data.phone || "");
//         setInitialAddress(res.data.address || "");
//       }
//     });
//   }, [user.token]);

//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       errorTimeoutRef.current = setTimeout(() => {
//         setErrors({});
//       }, 10000);
//     }
//     return () => {
//       clearTimeout(errorTimeoutRef.current);
//     };
//   }, [errors]);

//   useEffect(() => {
//     if (discountError) {
//       couponErrorTimeoutRef.current = setTimeout(() => {
//         setDiscountError("");
//       }, 10000);
//     }
//     return () => {
//       clearTimeout(couponErrorTimeoutRef.current);
//     };
//   }, [discountError]);

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: [],
//     });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart is Empty",
//         text: "Continue shopping!",
//       });
//     });
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     if (!phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits";
//     }

//     if (!address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveAddressToDb = () => {
//     if (validateFields()) {
//       saveUserAddress(user.token, address, phone).then((res) => {
//         if (res.data.ok) {
//           setAddressSaved(true);
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Address saved successfully!",
//           });
//         }
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please correct the errors before proceeding.",
//       });
//     }
//   };

//   const updateAddressToDb = () => {
//     if (validateFields()) {
//       updateUserDetailsById(user._id, { phone, address }, user.token).then(
//         (res) => {
//           if (res.data) {
//             setInitialPhone(phone);
//             setInitialAddress(address);
//             setIsAddressUpdated(false); // Reset address updated flag after the update
//             Swal.fire({
//               icon: "success",
//               title: "Success!",
//               text: "Address and Phone updated successfully!",
//             });
//           }
//         }
//       );
//     }
//   };

//   const applyDiscountCoupon = () => {
//     applyCoupon(user.token, coupon).then((res) => {
//       if (res.data) {
//         setTotalAfterDiscount(res.data);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: true,
//         });
//       }
//       if (res.data.err) {
//         setDiscountError(res.data.err);
//         dispatch({
//           type: "COUPON_APPLIED",
//           payload: false,
//         });
//       }
//     });
//   };

//   const createCashOrder = () => {
//     createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
//       if (res.data.ok) {
//         if (typeof window !== "undefined") localStorage.removeItem("cart");
//         dispatch({ type: "ADD_TO_CART", payload: [] });
//         dispatch({ type: "COUPON_APPLIED", payload: false });
//         dispatch({ type: "COD", payload: false });
//         emptyUserCart(user.token);
//         setTimeout(() => {
//           navigate("/user/history");
//         }, 1000);
//       }
//     });
//   };

//   // Determine whether to enable the "Update Address" button
//   const isUpdateDisabled =
//     !(address.trim() || phone.trim()) || (address === initialAddress && phone === initialPhone);

//   // Disable "Place Order" button if the address was updated but "Update Address" has not been clicked
//   const isPlaceOrderDisabled = isAddressUpdated && (address !== initialAddress || phone !== initialPhone);

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Delivery Details
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBInput
//                   placeholder="Enter your email"
//                   type="email"
//                   className="mb-4"
//                   value={user?.email || ""}
//                   disabled
//                 />
//                 <div className="mb-4">
//                   <MDBInput
//                     placeholder="Enter your number"
//                     type="text"
//                     value={phone}
//                     onChange={(e) => {
//                       const input = e.target.value;
//                       if (/^\d*$/.test(input) && input.length <= 10) {
//                         setPhone(input);
//                       }
//                     }}
//                     onBlur={() => setIsAddressUpdated(true)} // Flag updated when blur
//                     style={{
//                       borderColor: errors.phone ? "red" : "",
//                     }}
//                   />
//                   {errors.phone && (
//                     <small className="text-danger">{errors.phone}</small>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                   <MDBTextArea
//                     placeholder="Enter your address"
//                     rows={4}
//                     value={address}
//                     onChange={(e) => {
//                       setAddress(e.target.value);
//                       setIsAddressUpdated(true); // Mark as updated when address is typed
//                     }}
//                     style={{
//                       borderColor: errors.address ? "red" : "",
//                     }}
//                   />
//                   {errors.address && (
//                     <small className="text-danger">{errors.address}</small>
//                   )}
//                 </div>
//                 <button
//                   type="button"
//                   className="btn btn-primary mb-3"
//                   onClick={saveAddressToDb}
//                   disabled={isUpdateDisabled}
//                 >
//                   Save Address
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning mb-3 ms-2"
//                   onClick={updateAddressToDb}
//                   disabled={isUpdateDisabled}
//                 >
//                   Update Address
//                 </button>
//                 <hr />
//                 <MDBTypography tag="h5" className="mb-3">
//                   Got a Coupon?
//                 </MDBTypography>
//                 <MDBInput
//                   placeholder="Enter coupon code"
//                   type="text"
//                   className="mb-3"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-info"
//                   onClick={applyDiscountCoupon}
//                 >
//                   Apply Coupon
//                 </button>
//                 {discountError && (
//                   <p className="text-danger mt-2">{discountError}</p>
//                 )}
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//         <MDBCol md="4" className="mb-4">
//           <MDBCard>
//             <MDBCardHeader>
//               <MDBTypography tag="h5" className="mb-0">
//                 Order Summary
//               </MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem
//                     key={i}
//                     className="d-flex justify-content-between"
//                   >
//                     <span>
//                       {p.product.title} ({p.color}) x {p.count}
//                     </span>
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between">
//                   <strong>Total:</strong>
//                   <strong>${total}</strong>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               {totalAfterDiscount > 0 && (
//                 <p className="bg-success text-white p-2 mt-2 rounded">
//                   Discount Applied: Total Payable: ${totalAfterDiscount}
//                 </p>
//               )}
//               <div className="d-flex justify-content-between mt-3">
//                 {COD ? (
//                   <button
//                     className="btn btn-success"
//                     disabled={isPlaceOrderDisabled || !isFormValid || !products.length}
//                     onClick={createCashOrder}
//                   >
//                     Place Order
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     disabled={isPlaceOrderDisabled || !isFormValid || !products.length}
//                     onClick={() => navigate("/payment")}
//                   >
//                     Place Order
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={emptyCart}
//                   disabled={!products.length}
//                 >
//                   Empty Cart
//                 </button>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </div>
//   );
// };

// export default Checkout;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  getUserDetails,
  updateUserDetailsById,
} from "../functions/user";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");

  const [initialAddress, setInitialAddress] = useState("");
  const [initialPhone, setInitialPhone] = useState("");
  const [isAddressUpdated, setIsAddressUpdated] = useState(false); // Flag to track if address is updated
  const [isUpdating, setIsUpdating] = useState(false); // Flag to track if user is in update mode

  const errorTimeoutRef = React.useRef(null);
  const couponErrorTimeoutRef = React.useRef(null);
  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  const navigate = useNavigate();

  const isFormValid = address.trim() && phone.trim().length === 10;

  useEffect(() => {
    // Fetch cart details
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });

    // Fetch user details for phone and address
    getUserDetails(user.token).then((res) => {
      if (res.data) {
        setPhone(res.data.phone || "");
        setAddress(res.data.address || "");
        setInitialPhone(res.data.phone || "");
        setInitialAddress(res.data.address || "");
      }
    });
  }, [user.token]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorTimeoutRef.current = setTimeout(() => {
        setErrors({});
      }, 10000);
    }
    return () => {
      clearTimeout(errorTimeoutRef.current);
    };
  }, [errors]);

  useEffect(() => {
    if (discountError) {
      couponErrorTimeoutRef.current = setTimeout(() => {
        setDiscountError("");
      }, 10000);
    }
    return () => {
      clearTimeout(couponErrorTimeoutRef.current);
    };
  }, [discountError]);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    emptyUserCart(user.token).then(() => {
      setProducts([]);
      setTotal(0);
      Swal.fire({
        icon: "success",
        title: "Cart is Empty",
        text: "Continue shopping!",
      });
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAddressToDb = () => {
    if (validateFields()) {
      saveUserAddress(user.token, address, phone).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Address saved successfully!",
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please correct the errors before proceeding.",
      });
    }
  };

  const updateAddressToDb = () => {
    if (validateFields()) {
      updateUserDetailsById(user._id, { phone, address }, user.token).then(
        (res) => {
          if (res.data) {
            setInitialPhone(phone);
            setInitialAddress(address);
            setIsUpdating(false); // End update mode after successful update
            setIsAddressUpdated(false); // Reset address updated flag after the update
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Address and Phone updated successfully!",
            });
          }
        }
      );
    }
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  // const createCashOrder = () => {
  //   createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
  //     if (res.data.ok) {
  //       if (typeof window !== "undefined") localStorage.removeItem("cart");
  //       dispatch({ type: "ADD_TO_CART", payload: [] });
  //       dispatch({ type: "COUPON_APPLIED", payload: false });
  //       dispatch({ type: "COD", payload: false });
  //       emptyUserCart(user.token);
  //       setTimeout(() => {
  //         navigate("/user/history");
  //       }, 1000);
  //     }
  //   });
  // };

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      if (res.data.ok) {
        // Show a success message before navigating
        Swal.fire({
          icon: "success",
          title: "Order Placed By Cash On Delivery",
          text: "Your order has been successfully placed.",
          confirmButtonText: "Go to Order History",
        }).then(() => {
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          dispatch({ type: "ADD_TO_CART", payload: [] });
          dispatch({ type: "COUPON_APPLIED", payload: false });
          dispatch({ type: "COD", payload: false });
          emptyUserCart(user.token);
          setTimeout(() => {
            navigate("/user/history");
          }, 1000);
        });
      }
    });
  };
  

  // Determine whether to enable the "Update Address" button
  const isUpdateDisabled =
    !(address.trim() || phone.trim()) || (address === initialAddress && phone === initialPhone);

  // Disable "Place Order" button if the address was updated but "Update Address" has not been clicked
  const isPlaceOrderDisabled = isAddressUpdated && (address !== initialAddress || phone !== initialPhone);

  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
      <MDBRow>
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>
              <MDBTypography tag="h5" className="mb-0">
                Delivery Details
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <form>
                <MDBInput
                  placeholder="Enter your email"
                  type="email"
                  className="mb-4"
                  value={user?.email || ""}
                  disabled
                />
                <div className="mb-4">
                  <MDBInput
                    placeholder="Enter your number"
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d*$/.test(input) && input.length <= 10) {
                        setPhone(input);
                        setIsUpdating(true); // Flag user in update mode when typing
                      }
                    }}
                    onBlur={() => setIsAddressUpdated(true)} // Flag updated when blur
                    style={{
                      borderColor: errors.phone ? "red" : "",
                    }}
                  />
                  {errors.phone && (
                    <small className="text-danger">{errors.phone}</small>
                  )}
                </div>
                <div className="mb-4">
                  <MDBTextArea
                    placeholder="Enter your address"
                    rows={4}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setIsUpdating(true); // Flag user in update mode when typing
                    }}
                    onBlur={() => setIsAddressUpdated(true)} // Flag updated when blur
                    style={{
                      borderColor: errors.address ? "red" : "",
                    }}
                  />
                  {errors.address && (
                    <small className="text-danger">{errors.address}</small>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  onClick={saveAddressToDb}
                  disabled={isUpdateDisabled || isUpdating} // Disable Save button if in update mode
                >
                  Save Address
                </button>
                <button
                  type="button"
                  className="btn mb-3 ms-2"
                  style={{ backgroundColor: "#C30E59", color: "white" }}
                  onClick={updateAddressToDb}
                  disabled={isUpdateDisabled || !isUpdating} // Enable Update button only in update mode
                >
                  Update Address
                </button>
                <hr />
                <MDBTypography tag="h5" className="mb-3">
                  Got a Coupon?
                </MDBTypography>
                <MDBInput
                  placeholder="Enter coupon code"
                  type="text"
                  className="mb-3"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={applyDiscountCoupon}
                >
                  Apply Coupon
                </button>
                {discountError && (
                  <p className="text-danger mt-2">{discountError}</p>
                )}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCard>
            <MDBCardHeader>
              <MDBTypography tag="h5" className="mb-0">
                Order Summary
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                {products.map((p, i) => (
                  <MDBListGroupItem
                    key={i}
                    className="d-flex justify-content-between"
                  >
                    <span>
                      {p.product.title} ({p.color}) x {p.count}
                    </span>
                    <span>${p.product.price * p.count}</span>
                  </MDBListGroupItem>
                ))}
                <MDBListGroupItem className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>${total}</strong>
                </MDBListGroupItem>
              </MDBListGroup>
              {totalAfterDiscount > 0 && (
                <p className="bg-success text-white p-2 mt-2 rounded">
                  Discount Applied: Total Payable: ${totalAfterDiscount}
                </p>
              )}
              <div className="d-flex justify-content-between mt-3">
                {COD ? (
                  <button
                    className="btn btn-success"
                    disabled={isPlaceOrderDisabled || !isFormValid || !products.length}
                    onClick={createCashOrder}
                  >
                    Place Order
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    disabled={isPlaceOrderDisabled || !isFormValid || !products.length}
                    onClick={() => navigate("/payment")}
                  >
                    Place Order
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={emptyCart}
                  disabled={!products.length}
                >
                  Empty Cart
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Checkout;
