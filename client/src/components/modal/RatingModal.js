
import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate ,useParams } from "react-router-dom";  // Import useNavigate
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

  let {slug} = useParams();
  
  const handleOk = () => {


    setModalVisible(false);
    Swal.fire({
      icon: "success",
      title: "Thanks for your review!",
      text: "It will appear soon.",
      confirmButtonText: "OK",
    });
  };

  const handleModel = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate('/login', { state: { from: `/product/${slug}` } });
    }
  };
  

  return (
    <>
      <div onClick={handleModel}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
