import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
         <br/>
         <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: {total}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
            >
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCheckbox,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [addressSaved, setAddressSaved] = useState(false);

//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     getUserCart(user.token).then((res) => {
//       console.log("user cart res", JSON.stringify(res.data, null, 4));
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });
//   }, [user.token]);

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({ type: "ADD_TO_CART", payload: [] });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       toast.success("Cart is empty. Continue shopping.");
//     });
//   };

//   const saveAddressToDb = () => {
//     saveUserAddress(user.token, address).then((res) => {
//       if (res.data.ok) {
//         setAddressSaved(true);
//         toast.success("Address saved");
//       }
//     });
//   };

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         {/* Billing Details */}
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Billing Details</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBRow className="mb-4">
//                   <MDBCol>
//                     <MDBInput label="First name" type="text" />
//                   </MDBCol>
//                   <MDBCol>
//                     <MDBInput label="Last name" type="text" />
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBInput label="Company name" type="text" className="mb-4" />
//                 <MDBTextArea
//                   label="Delivery Address"
//                   rows={4}
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="mb-4"
//                 />
//                 <MDBBtn onClick={saveAddressToDb} color="primary">
//                   Save Address
//                 </MDBBtn>
//                 <hr />
//                 <h5>Coupon</h5>
//                 <MDBInput label="Enter Coupon Code" type="text" className="mb-4" />
//                 <MDBBtn color="secondary">Apply Coupon</MDBBtn>
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         {/* Summary Section */}
//         <MDBCol md="4" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Summary</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem key={i} className="d-flex justify-content-between align-items-center">
//                     {p.product.title} x {p.count}
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between align-items-center">
//                   <strong>Total</strong>
//                   <span><strong>${total}</strong></span>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               <div className="d-flex gap-2 mt-3">
//                 <MDBBtn
//                   color="success"
//                   size="md"
//                   block
//                   disabled={!addressSaved || !products.length}
//                 >
//                   Place Order
//                 </MDBBtn>
//                 <MDBBtn
//                   color="danger"
//                   size="md"
//                   block
//                   disabled={!products.length}
//                   onClick={emptyCart}
//                 >
//                   Empty Cart
//                 </MDBBtn>
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
// import {
//   MDBBtn,
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
// import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [formErrors, setFormErrors] = useState({
//     firstName: false,
//     lastName: false,
//     address: false,
//   });

//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state);

//   useEffect(() => {
//     if (user?.token) {
//       getUserCart(user.token)
//         .then((res) => {
//           setProducts(res.data.products);
//           setTotal(res.data.cartTotal);
//         })
//         .catch((err) => console.error("Failed to fetch cart data", err));
//     }
//   }, [user?.token]);

//   const emptyCart = () => {
//     if (!user?.token) {
//       return;
//     }
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({ type: "ADD_TO_CART", payload: [] });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//     });
//   };

//   const saveAddressToDb = () => {
//     if (!user?.token) return;

//     if (!address.trim()) {
//       setFormErrors((prev) => ({ ...prev, address: true }));
//       return;
//     }

//     saveUserAddress(user.token, address).then((res) => {
//       if (res.data.ok) {
//         setAddressSaved(true);
//       }
//     });
//   };

//   const validateForm = () => {
//     const errors = {
//       firstName: !document.getElementById("firstName")?.value.trim(),
//       lastName: !document.getElementById("lastName")?.value.trim(),
//       address: !address.trim(),
//     };
//     setFormErrors(errors);
//     return !errors.firstName && !errors.lastName && !errors.address;
//   };

//   const handlePlaceOrder = () => {
//     if (!user?.token) return;

//     if (!validateForm()) {
//       return;
//     }
//   };

//   if (!user?.token) {
//     return (
//       <div className="text-center mt-5">
//         <h4>Please log in to access the checkout page.</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         {/* Billing Details */}
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Billing Details</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBRow className="mb-4">
//                   <MDBCol>
//                     <MDBInput
//                       id="firstName"
//                       label="First name"
//                       type="text"
//                       className={formErrors.firstName ? "is-invalid" : ""}
//                     />
//                     {formErrors.firstName && (
//                       <div className="text-danger small">First name is required</div>
//                     )}
//                   </MDBCol>
//                   <MDBCol>
//                     <MDBInput
//                       id="lastName"
//                       label="Last name"
//                       type="text"
//                       className={formErrors.lastName ? "is-invalid" : ""}
//                     />
//                     {formErrors.lastName && (
//                       <div className="text-danger small">Last name is required</div>
//                     )}
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBInput label="Company name" type="text" className="mb-4" />
//                 <MDBTextArea
//                   label="Delivery Address"
//                   rows={4}
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className={`mb-4 ${formErrors.address ? "is-invalid" : ""}`}
//                 />
//                 {formErrors.address && (
//                   <div className="text-danger small">Address is required</div>
//                 )}
//                 <MDBBtn onClick={saveAddressToDb} color="primary">
//                   Save Address
//                 </MDBBtn>
//                 <hr />
//                 <h5>Coupon</h5>
//                 <MDBInput label="Enter Coupon Code" type="text" className="mb-4" />
//                 <MDBBtn color="secondary">Apply Coupon</MDBBtn>
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         {/* Summary Section */}
//         <MDBCol md="4" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Summary</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem key={i} className="d-flex justify-content-between align-items-center">
//                     {p.product.title} x {p.count}
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between align-items-center">
//                   <strong>Total</strong>
//                   <span><strong>${total}</strong></span>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               <div className="d-flex gap-2 mt-3">
//                 <MDBBtn
//                   color="success"
//                   size="md"
//                   block
//                   disabled={!addressSaved || !products.length}
//                   onClick={handlePlaceOrder}
//                 >
//                   Place Order
//                 </MDBBtn>
//                 <MDBBtn
//                   color="danger"
//                   size="md"
//                   block
//                   disabled={!products.length}
//                   onClick={emptyCart}
//                 >
//                   Empty Cart
//                 </MDBBtn>
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
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCheckbox,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [addressError, setAddressError] = useState(false); // New state for validation

//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     getUserCart(user.token).then((res) => {
//       console.log("user cart res", JSON.stringify(res.data, null, 4));
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });
//   }, [user.token]);

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({ type: "ADD_TO_CART", payload: [] });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart Emptied",
//         text: "Your cart has been successfully emptied.",
//       });
//     });
//   };

//   const saveAddressToDb = () => {
//     if (!address.trim()) {
//       setAddressError(true);
//       return;
//     }
//     saveUserAddress(user.token, address).then((res) => {
//       if (res.data.ok) {
//         setAddressSaved(true);
//         setAddressError(false);
//         toast.success("Address saved");
//       }
//     });
//   };

//   const handlePlaceOrder = () => {
//     Swal.fire({
//       icon: "success",
//       title: "Order Placed",
//       text: "Your order has been successfully placed.",
//     });
//   };

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         {/* Billing Details */}
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Billing Details</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBRow className="mb-4">
//                   <MDBCol>
//                     <MDBInput label="First name" type="text" />
//                   </MDBCol>
//                   <MDBCol>
//                     <MDBInput label="Last name" type="text" />
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBInput label="Company name" type="text" className="mb-4" />
//                 <MDBTextArea
//                   label="Delivery Address"
//                   rows={4}
//                   value={address}
//                   onChange={(e) => {
//                     setAddress(e.target.value);
//                     if (addressError && e.target.value.trim()) {
//                       setAddressError(false);
//                     }
//                   }}
//                   className={`mb-2 ${addressError ? "border border-danger" : ""}`}
//                 />
//                 {addressError && (
//                   <p className="text-danger mb-4">Address is required.</p>
//                 )}
//                 <MDBBtn onClick={saveAddressToDb} color="primary">
//                   Save Address
//                 </MDBBtn>
//                 <hr />
//                 <h5>Coupon</h5>
//                 <MDBInput label="Enter Coupon Code" type="text" className="mb-4" />
//                 <MDBBtn color="secondary">Apply Coupon</MDBBtn>
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         {/* Summary Section */}
//         <MDBCol md="4" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Summary</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem key={i} className="d-flex justify-content-between align-items-center">
//                     {p.product.title} x {p.count}
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem className="d-flex justify-content-between align-items-center">
//                   <strong>Total</strong>
//                   <span><strong>${total}</strong></span>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               <div className="d-flex gap-2 mt-3">
//                 <MDBBtn
//                   color="success"
//                   size="md"
//                   block
//                   disabled={!addressSaved || !products.length}
//                   onClick={handlePlaceOrder}
//                 >
//                   Place Order
//                 </MDBBtn>
//                 <MDBBtn
//                   color="danger"
//                   size="md"
//                   block
//                   disabled={!products.length}
//                   onClick={emptyCart}
//                 >
//                   Empty Cart
//                 </MDBBtn>
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
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCheckbox,
//   MDBCol,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRow,
//   MDBTextArea,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//   });

//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     if (!user || !user.token) {
//       // If there's no user or token, you can show an error or redirect
//       return;
//     }
//     getUserCart(user.token).then((res) => {
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });
//   }, [user.token]);

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.firstName.trim()) errors.firstName = "First name is required";
//     if (!formData.lastName.trim()) errors.lastName = "Last name is required";
//     if (!formData.companyName.trim()) errors.companyName = "Company name is required";
//     if (!address.trim()) errors.address = "Address is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({ type: "ADD_TO_CART", payload: [] });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart Emptied",
//         text: "Your cart has been successfully emptied.",
//       });
//     });
//   };

//   const saveAddressToDb = () => {
//     if (!validateForm()) return;
//     saveUserAddress(user.token, address).then((res) => {
//       if (res.data.ok) {
//         setAddressSaved(true);
//         toast.success("Address saved");
//       }
//     });
//   };

//   const handlePlaceOrder = () => {
//     if (!validateForm()) return;
//     Swal.fire({
//       icon: "success",
//       title: "Order Placed",
//       text: "Your order has been successfully placed.",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setFormErrors({ ...formErrors, [name]: "" });
//   };

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         {/* Billing Details */}
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Billing Details</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBRow className="mb-4">
//                   <MDBCol>
//                     <MDBInput
//                       label="First name"
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className={formErrors.firstName ? "border border-danger" : ""}
//                     />
//                     {formErrors.firstName && <p className="text-danger">{formErrors.firstName}</p>}
//                   </MDBCol>
//                   <MDBCol>
//                     <MDBInput
//                       label="Last name"
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className={formErrors.lastName ? "border border-danger" : ""}
//                     />
//                     {formErrors.lastName && <p className="text-danger">{formErrors.lastName}</p>}
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBInput
//                   label="Company name"
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                   className={`mb-4 ${formErrors.companyName ? "border border-danger" : ""}`}
//                 />
//                 {formErrors.companyName && <p className="text-danger">{formErrors.companyName}</p>}
//                 <MDBTextArea
//                   label="Delivery Address"
//                   rows={4}
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className={`mb-2 ${formErrors.address ? "border border-danger" : ""}`}
//                 />
//                 {formErrors.address && <p className="text-danger">{formErrors.address}</p>}
//                 <MDBBtn onClick={saveAddressToDb} color="primary">
//                   Save Address
//                 </MDBBtn>
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         {/* Summary Section */}
//         <MDBCol md="4" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Summary</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem key={i} className="d-flex justify-content-between">
//                     {p.product.title} x {p.count}
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem>
//                   <strong>Total</strong>
//                   <span><strong>${total}</strong></span>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               <div className="d-flex gap-2 mt-3">
//                 <MDBBtn color="success" onClick={handlePlaceOrder}>Place Order</MDBBtn>
//                 <MDBBtn color="danger" onClick={emptyCart}>Empty Cart</MDBBtn>
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
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import {
//   MDBBtn,
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
// import { getUserCart, emptyUserCart, saveUserAddress, getUserAddress } from "../functions/user";

// const Checkout = () => {
//   const [products, setProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [addressSaved, setAddressSaved] = useState(false); // Track if the address is saved
//   const [formErrors, setFormErrors] = useState({});
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//   });

//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     if (!user || !user.token) {
//       toast.error("You need to be logged in to access your cart.");
//       return;
//     }
//     // Fetch cart data if user is logged in
//     getUserCart(user.token).then((res) => {
//       setProducts(res.data.products);
//       setTotal(res.data.cartTotal);
//     });

//     // Fetch saved address if any
//     getUserAddress(user.token).then((res) => {
//       if (res.data.address) {
//         const { firstName, lastName, companyName, address } = res.data.address;
//         setFormData({ firstName, lastName, companyName });
//         setAddress(address);
//       }
//     });
//   }, [user]);

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.firstName.trim()) errors.firstName = "First name is required";
//     if (!formData.lastName.trim()) errors.lastName = "Last name is required";
//     if (!formData.companyName.trim()) errors.companyName = "Company name is required";
//     if (!address.trim()) errors.address = "Address is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const emptyCart = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("cart");
//     }
//     dispatch({ type: "ADD_TO_CART", payload: [] });
//     emptyUserCart(user.token).then(() => {
//       setProducts([]);
//       setTotal(0);
//       Swal.fire({
//         icon: "success",
//         title: "Cart Emptied",
//         text: "Your cart has been successfully emptied.",
//       });
//     });
//   };

//   const saveAddressToDb = () => {
//     if (!validateForm()) return;
//     const { firstName, lastName, companyName } = formData;
//     const addressData = { firstName, lastName, companyName, address };

//     saveUserAddress(user.token, addressData).then((res) => {
//       if (res.data.ok) {
//         setAddressSaved(true); // Set addressSaved to true
//         toast.success("Address saved successfully");
//         // After saving, fetch the address from the backend and update the state
//         getUserAddress(user.token).then((res) => {
//           if (res.data.address) {
//             const { firstName, lastName, companyName, address } = res.data.address;
//             setFormData({ firstName, lastName, companyName });
//             setAddress(address);
//           }
//         });
//       }
//     });
//   };

//   const handlePlaceOrder = () => {
//     if (!validateForm()) return;
//     Swal.fire({
//       icon: "success",
//       title: "Order Placed",
//       text: "Your order has been successfully placed.",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setFormErrors({ ...formErrors, [name]: "" });
//   };

//   return (
//     <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
//       <MDBRow>
//         {/* Billing Details */}
//         <MDBCol md="8" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Billing Details</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <form>
//                 <MDBRow className="mb-4">
//                   <MDBCol>
//                     <MDBInput
//                       label="First name"
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className={formErrors.firstName ? "border border-danger" : ""}
//                     />
//                     {formErrors.firstName && <p className="text-danger">{formErrors.firstName}</p>}
//                   </MDBCol>
//                   <MDBCol>
//                     <MDBInput
//                       label="Last name"
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className={formErrors.lastName ? "border border-danger" : ""}
//                     />
//                     {formErrors.lastName && <p className="text-danger">{formErrors.lastName}</p>}
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBInput
//                   label="Company name"
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                   className={`mb-4 ${formErrors.companyName ? "border border-danger" : ""}`}
//                 />
//                 {formErrors.companyName && <p className="text-danger">{formErrors.companyName}</p>}
//                 <MDBTextArea
//                   label="Delivery Address"
//                   rows={4}
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className={`mb-2 ${formErrors.address ? "border border-danger" : ""}`}
//                 />
//                 {formErrors.address && <p className="text-danger">{formErrors.address}</p>}
//                 <MDBBtn onClick={saveAddressToDb} color="primary" className="w-100">
//                   Save Address
//                 </MDBBtn>
//                 {/* Conditionally render a success message if address is saved */}
//                 {addressSaved && <p className="text-success mt-2">Address has been saved successfully!</p>}
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         {/* Summary Section */}
//         <MDBCol md="4" className="mb-4">
//           <MDBCard className="mb-4">
//             <MDBCardHeader className="py-3">
//               <MDBTypography tag="h5" className="mb-0">Summary</MDBTypography>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <MDBListGroup flush>
//                 {products.map((p, i) => (
//                   <MDBListGroupItem key={i} className="d-flex justify-content-between">
//                     {p.product.title} x {p.count}
//                     <span>${p.product.price * p.count}</span>
//                   </MDBListGroupItem>
//                 ))}
//                 <MDBListGroupItem>
//                   <strong>Total</strong>
//                   <span><strong>${total}</strong></span>
//                 </MDBListGroupItem>
//               </MDBListGroup>
//               <div className="d-flex gap-2 mt-3">
//                 <MDBBtn color="success" onClick={handlePlaceOrder} className="w-100">
//                   Place Order
//                 </MDBBtn>
//                 <MDBBtn color="danger" onClick={emptyCart} className="w-100">
//                   Empty Cart
//                 </MDBBtn>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </div>
//   );
// };

// export default Checkout;

