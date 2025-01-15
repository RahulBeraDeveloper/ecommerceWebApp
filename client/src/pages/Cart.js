
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { userCart } from "../functions/user";
// import {
//   Button,
//   Card,
//   Col,
//   InputNumber,
//   List,
//   Row,
//   Typography,
//   Image,
// } from "antd";
// import { CloseOutlined, CarOutlined } from "@ant-design/icons";


// const { Text } = Typography;

// const Cart = () => {
//   const { cart, user } = useSelector((state) => ({ ...state }));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const getTotal = () => {
//     return cart.reduce((currentValue, nextValue) => {
//       return currentValue + nextValue.count * nextValue.price;
//     }, 0);
//   };

//   const handleQuantityChange = (productId, count, quantity) => {
//     if (count > quantity) {
//       toast.error(`Max available quantity: ${quantity}`);
//       return;
//     }

//     let updatedCart = cart.map((item) =>
//       item._id === productId ? { ...item, count: count } : item
//     );

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     dispatch({ type: "ADD_TO_CART", payload: updatedCart });
//   };

//   const handleRemove = (productId) => {
//     let updatedCart = cart.filter((item) => item._id !== productId);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     dispatch({ type: "ADD_TO_CART", payload: updatedCart });
//   };



//   const saveOrderToDb = () => {
//     // console.log("cart", JSON.stringify(cart, null, 4));
//     userCart(cart, user.token)
//       .then((res) => {
//         console.log("CART POST RES", res);
//         if (res.data.ok)  navigate("/checkout");
//       })
//       .catch((err) => console.log("cart save err", err));
//   };


//   return (
//     <Row gutter={[16, 16]} className="cart-container" style={{ padding: "3%" }}>
//       {/* Left Section (Cart Items) */}
//       <Col xs={24} lg={16}>
//         <Card
//           title={`Cart - ${cart.length} ${cart.length === 1 ? "item" : "items"}`}
//           bordered
//         >
//           {cart.length ? (
//             <List
//               itemLayout="vertical"
//               dataSource={cart}
//               renderItem={(item) => (
//                 <List.Item>
//                   <Row align="middle" gutter={[16, 16]}>
//                     {/* Product Image */}
//                     <Col xs={24} sm={6} lg={5}  style={{ textAlign: "center" }}>
//                       <Image
//                         src={
//                           item.images.length
//                             ? item.images[0].url
//                             : "https://via.placeholder.com/150"
//                         }
//                         alt={item.title}
//                         width="100%"
//                         height="auto"
//                         style={{
//                           objectFit: "cover",
//                           maxWidth: "120px", // Default size for small screens
//                         }}
//                       />
//                     </Col>

//                     {/* Product Details */}
//                     <Col xs={24} sm={10} lg={9}>
//                       <Text strong>{item.title}</Text>
//                       <br />
//                       <Text>Brand: {item.brand}</Text>
//                       <br />
//                       <Text>Color: {item.color}</Text>
//                     </Col>

//                     {/* Actions (Count, Price, Remove) */}
//                     <Col xs={24} sm={8} lg={10}>
//                       <Row align="middle" justify="space-between">
//                         <Col>
//                           <InputNumber
//                             min={1}
//                             max={item.quantity}
//                             value={item.count}
//                             onChange={(value) =>
//                               handleQuantityChange(
//                                 item._id,
//                                 value,
//                                 item.quantity
//                               )
//                             }
//                           />
//                         </Col>
//                         <Col>
//                           <Text strong>${item.count * item.price}</Text>
//                         </Col>
//                         <Col>
//                           <Button
//                             type="link"
//                             danger
//                             icon={<CloseOutlined />}
//                             onClick={() => handleRemove(item._id)}
//                           />
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>
//                 </List.Item>
//               )}
//             />
//           ) : (
//             <Text>
//               No products in the cart. <Link to="/shop">Continue shopping.</Link>
//             </Text>
//           )}
//         </Card>
//       </Col>

//       {/* Right Section (Summary) */}
//       <Col xs={24} lg={8}>
//         <Card title="Summary" bordered>
//           <Row justify="space-between">
//             <Col>
//               <Text>Products</Text>
//             </Col>
//             <Col>
//               <Text>${getTotal()}</Text>
//             </Col>
//           </Row>
//           <Row justify="space-between" style={{ marginTop: 8 }}>
//             <Col>
//               <Text>Shipping</Text>
//             </Col>
//             <Col>
//               <CarOutlined style={{ fontSize: "16px", marginRight: 4 }} />
//               <Text>Gratis</Text>
//             </Col>
//           </Row>
//           <Row justify="space-between" style={{ marginTop: 8, marginBottom: 16 }}>
//             <Col>
//               <Text strong>Total Amount (including VAT)</Text>
//             </Col>
//             <Col>
//               <Text strong>${getTotal()}</Text>
//             </Col>
//           </Row>
//           {user ? (
//             <Button type="primary" block onClick={saveOrderToDb}>
//               Proceed to Checkout
//             </Button>
//           ) : (
//             <Button type="primary" block>
//               <Link
//                 to={{
//                   pathname: "/login",
//                   state: { from: "cart" },
//                 }}
//                 style={{ color: "white", textDecoration: "none" }}
//               >
//                 Login to Checkout
//               </Link>
//             </Button>
//           )}
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default Cart;





import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userCart } from "../functions/user";
import {
  Button,
  Card,
  Col,
  InputNumber,
  List,
  Row,
  Typography,
  Image,
} from "antd";
import { CloseOutlined, CarOutlined } from "@ant-design/icons";


const { Text } = Typography;

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleQuantityChange = (productId, count, quantity) => {
    if (count > quantity) {
      toast.error(`Max available quantity: ${quantity}`);
      return;
    }

    let updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, count: count } : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({ type: "ADD_TO_CART", payload: updatedCart });
  };

  const handleRemove = (productId) => {
    let updatedCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({ type: "ADD_TO_CART", payload: updatedCart });
  };



  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok)  navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };


 
  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok)  navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };



  return (
    <Row gutter={[16, 16]} className="cart-container" style={{ padding: "3%" }}>
      {/* Left Section (Cart Items) */}
      <Col xs={24} lg={16}>
        <Card
          title={`Cart - ${cart.length} ${cart.length === 1 ? "item" : "items"}`}
          bordered
        >
          {cart.length ? (
            <List
              itemLayout="vertical"
              dataSource={cart}
              renderItem={(item) => (
                <List.Item>
                  <Row align="middle" gutter={[16, 16]}>
                    {/* Product Image */}
                    <Col xs={24} sm={6} lg={5}  style={{ textAlign: "center" }}>
                      <Image
                        src={
                          item.images.length
                            ? item.images[0].url
                            : "https://via.placeholder.com/150"
                        }
                        alt={item.title}
                        width="100%"
                        height="auto"
                        style={{
                          objectFit: "cover",
                          maxWidth: "120px", // Default size for small screens
                        }}
                      />
                    </Col>

                    {/* Product Details */}
                    <Col xs={24} sm={10} lg={9}>
                      <Text strong>{item.title}</Text>
                      <br />
                      <Text>Brand: {item.brand}</Text>
                      <br />
                      <Text>Color: {item.color}</Text>
                    </Col>

                    {/* Actions (Count, Price, Remove) */}
                    <Col xs={24} sm={8} lg={10}>
                      <Row align="middle" justify="space-between">
                        <Col>
                          <InputNumber
                            min={1}
                            max={item.quantity}
                            value={item.count}
                            onChange={(value) =>
                              handleQuantityChange(
                                item._id,
                                value,
                                item.quantity
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Text strong>${item.count * item.price}</Text>
                        </Col>
                        <Col>
                          <Button
                            type="link"
                            danger
                            icon={<CloseOutlined />}
                            onClick={() => handleRemove(item._id)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          ) : (
            <Text>
              No products in the cart. <Link to="/shop">Continue shopping.</Link>
            </Text>
          )}
        </Card>
      </Col>

      {/* Right Section (Summary) */}
      <Col xs={24} lg={8}>
        <Card title="Summary" bordered>
          <Row justify="space-between">
            <Col>
              <Text>Products</Text>
            </Col>
            <Col>
              <Text>${getTotal()}</Text>
            </Col>
          </Row>
          <Row justify="space-between" style={{ marginTop: 8 }}>
            <Col>
              <Text>Shipping</Text>
            </Col>
            <Col>
              <CarOutlined style={{ fontSize: "16px", marginRight: 4 }} />
              <Text>Gratis</Text>
            </Col>
          </Row>
          <Row justify="space-between" style={{ marginTop: 8, marginBottom: 16 }}>
            <Col>
              <Text strong>Total Amount (including VAT)</Text>
            </Col>
            <Col>
              <Text strong>${getTotal()}</Text>
            </Col>
          </Row>
          {user ? (
                <>
             <Button type="primary" block onClick={saveOrderToDb}>
                Pay online
            </Button>
              <br/>
              <br/>
              <Button type="" 
               style={{ backgroundColor: "#441752", color: "white", border: "none" }}
               block onClick={saveCashOrderToDb}>
                 Pay Cash on Delivery
            </Button>
              </>
           
          ) : (
            <Button type="primary" block>
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
                style={{ color: "white", textDecoration: "none" }}
              >
                Login to Checkout
              </Link>
            </Button>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;




