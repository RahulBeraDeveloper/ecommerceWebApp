import React,{useEffect, useState} from 'react'
import AdminNav from "../../components/nav/AdminNav";


const AdminDashboard = () => {



  return (
<div className='container-fluid'>
  <div className="row">
    <div className="col-md-2">
      <AdminNav />
    </div>
     <div className='col-md-10'>
          <h2>Admin DashBoard</h2>
     </div>
  </div>
</div>

  )
}

export default AdminDashboard