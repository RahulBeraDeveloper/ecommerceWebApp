import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import Swal from 'sweetalert2';
import "./ProductCreate.css"
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories ,getCategorySubs} from '../../../functions/category';
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";  // Import useNavigate
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

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize navigate
  //redux to the token
  const { user } = useSelector((state) => ({...state}));
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    // loadSubCategories();
  }, []);

  //To get the categories
  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data })); 
  // const loadSubCategories = () =>
  //   getCategorySubs().then((c) => setValues({ ...values, subs: c.data })); 



  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Product Created!',
          text: 'Your product has been created successfully.',
        });
        navigate("/admin/products");  // Redirect to /admin/products
      
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an issue creating the product. Please try again.',
        });
      });
  };
  

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value});
    console.log(e.target.name,'values---->')
  };
  

  const handleCategoryChange =(e)=>{
    e.preventDefault();
    setValues({...values,subs: [],category:e.target.value});
    getCategorySubs(e.target.value).then(res =>{
      console.log("This sub data", res)
     setSubOptions(res.data)
    })
    setShowSub(true);
  }
  return (
   
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10  responsive-margin">
         {loading ? <LoadingOutlined className="text-danger h1"/>: <h4>Product create</h4> }
          {/* <hr /> */}
          <div className="card  shadow p-3 mb-5  bg-white rounded " style={{ borderRadius: '10px'}}>
            <div>
              <FileUpload 
              values ={values} 
              setValues= {setValues}
              setLoading={setLoading}
              />
            </div>
            <ProductCreateForm 
            handleSubmit={handleSubmit} 
            handleChange={handleChange}  
            values={values}  
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            />
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default ProductCreate;
