import React,{useEffect, useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import {getProductsByCount, removeProduct} from '../../../functions/product';
import { useSelector } from 'react-redux';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import Swal from 'sweetalert2';
import "./ProductCreate.css"

const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

 //useEffect
  useEffect(() => {
    loadAllProducts()
  }, []);


  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsByCount(10);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleRemove = async (slug) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await removeProduct(slug, user.token);
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
          loadAllProducts(); // Reload products after deletion
        } catch (err) {
          console.error("Error removing product:", err);
          Swal.fire('Error!', 'Failed to delete the product.', 'error');
        } finally {
          setLoading(false);
        }
      }
    });
  };
   
  return (
<div className='container-fluid'>
  <div className="row">
    <div className="col-md-2">
      <AdminNav />
    </div>
    <div className="col-md-10  responsive-margin">
      {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>All Products</h4>}
      <div className="card  shadow p-3 mb-5  bg-white rounded " style={{ borderRadius: '10px'}}>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 pb-3">
            <AdminProductCard product={product} handleRemove={handleRemove} />
          </div>
        ))}
      </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default AllProducts