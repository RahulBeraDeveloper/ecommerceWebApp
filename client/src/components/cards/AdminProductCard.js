import React from "react";
import { Card } from "antd";
import defaultImageOfLaptop  from "../../images/laptop.png";
import { EditOutlined  , DeleteOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const AdminProductCard = ({ product , handleRemove }) => {
  // destructure
  const { title, description, images ,slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : defaultImageOfLaptop}
          style={{ height: "240px", objectFit: "cover" }}
          className="p-3"
        />
      }
      actions={
        [
          <Link to={`/admin/product/${slug}`}>
           <EditOutlined key="edit" className="text-warning" />,
          </Link>,
         
          <DeleteOutlined className="text-danger" onClick={() => handleRemove(slug)} />
        ]
      }
    >
      <Meta title={title} description={`${description && description.substring(0,60)}...`} />
    </Card>
  );
};

export default AdminProductCard;
