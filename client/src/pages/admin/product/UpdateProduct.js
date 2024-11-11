import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import Swal from 'sweetalert2';
import "./ProductCreate.css"
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories ,getCategorySubs} from '../../../functions/category';
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";  // Import useNavigate
import {useParams} from 'react-router-dom';
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";


const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS" ,"HP"],
  color: "",
  brand: "",
};

const UpdateProduct = ({match}) => {

  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();  // Initialize navigate
  //redux to the token
  const { user } = useSelector((state) => ({...state}));
  let {slug} = useParams()


  useEffect(()=>{
    loadProduct()
  },[])

  const loadProduct = () =>{
    getProduct(slug)
    .then(p =>{
      // console.log('Single product ', p)
      setValues({...values, ...p.data})
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };


  return (
   
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 responsive-margin">
        <h3>Product Update</h3>
        <div className="card  shadow p-3 mb-5  bg-white rounded " style={{ borderRadius: '10px'}}>
        <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
          />
          <hr />
        </div>
        </div>
            
    </div>
    </div>
  
  );
};

export default UpdateProduct;
