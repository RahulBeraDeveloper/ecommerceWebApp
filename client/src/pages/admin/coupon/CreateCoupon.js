// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import {
//   getCoupons,
//   removeCoupon,
//   createCoupon,
// } from "../../../functions/coupon";
// import "react-datepicker/dist/react-datepicker.css";
// import { DeleteOutlined } from "@ant-design/icons";
// import AdminNav from "../../../components/nav/AdminNav";

// const CreateCouponPage = () => {
//   const [name, setName] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [loading, setLoading] = useState("");

//   // redux
//   const { user } = useSelector((state) => ({ ...state }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // console.table(name, expiry, discount);
//     createCoupon({ name, expiry, discount }, user.token)
//       .then((res) => {
//         setLoading(false);
//         setName("");
//         setDiscount("");
//         setExpiry("");
//         toast.success(`"${res.data.name}" is created`);
//       })
//       .catch((err) => console.log("create coupon err", err));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-2">
//           <AdminNav />
//         </div>
        
//         <div className="col-md-10  responsive-margin">
//           <h4>Coupon</h4>
//           <div className="card  shadow p-3 mb-5  bg-white rounded " style={{ borderRadius: '10px'}}>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label className="text-muted">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 autoFocus
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="text-muted">Discount %</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(e) => setDiscount(e.target.value)}
//                 value={discount}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="text-muted">Expiry</label>
//               <br />
//               <DatePicker
//                 className="form-control"
//                 selected={new Date()}
//                 value={expiry}
//                 onChange={(date) => setExpiry(date)}
//                 required
//               />
//             </div>

//             <button className="btn btn-outline-primary">Save</button>
//           </form>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default CreateCouponPage;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import {
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        swal("Success!", `"${res.data.name}" is created`, "success");
      })
      .catch((err) => {
        setLoading(false);
        console.error("Create coupon error", err);
        swal("Error", "Something went wrong. Try again!", "error");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        
        <div className="col-md-10 responsive-margin">
          <h4>Coupon</h4>
          <div className="card shadow p-3 mb-5 bg-white rounded" style={{ borderRadius: '10px' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Discount %</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Expiry</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={expiry ? new Date(expiry) : null}
                  onChange={(date) => setExpiry(date)}
                  required
                />
              </div>
              <br/>
      
              <button className="btn btn-outline-primary" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
