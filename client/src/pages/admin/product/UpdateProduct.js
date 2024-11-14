import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getProduct , updateProduct} from "../../../functions/product";
import Swal from 'sweetalert2';
import "./ProductCreate.css"
import {getCategories ,getCategorySubs} from '../../../functions/category';
import { useNavigate } from "react-router-dom";  // Import useNavigate
import {useParams} from 'react-router-dom';
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import {LoadingOutlined} from '@ant-design/icons'


const initialState = {
  title: "",
  description: "",
  price: "",
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
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({...state}));
  const [loading, setLoading] = useState(false);

  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  let {slug} = useParams()


  useEffect(()=>{
    loadProduct();
    loadCategories();
  
  },[])

  const loadProduct = () =>{
    getProduct(slug)
    .then(p =>{
      // console.log('Single product ', p)
      setValues({...values, ...p.data})


      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); // required for ant design select to work
    });
  };



  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGORY values.category", values.category);

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

   
  // const loadCategories = () =>
  //   getCategories().then((c) => setValues({ ...values, categories: c.data })); 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
  
    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        Swal.fire({
          title: 'Success!',
          text: `"${res.data.title}" is updated`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/admin/products"); // useNavigate hook for navigation
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: err.response.data.err,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };
  const loadCategories = () =>{
    getCategories().then((c) => setCategories(c.data));
  }
   
  

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
        {loading ? <LoadingOutlined className="text-danger h1"/>: <h4>Product create</h4> }
        <div className="card  shadow p-3 mb-5  bg-white rounded " style={{ borderRadius: '10px'}}>
        <div>
              <FileUpload 
              values ={values} 
              setValues= {setValues}
              setLoading={setLoading}
              />
            </div>
        <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            handleCategoryChange ={handleCategoryChange}
            values={values}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
        </div>
            
    </div>
    </div>
  
  );
};

export default UpdateProduct;
