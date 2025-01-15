
import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonPlus, Person, BoxArrowRight } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Import custom CSS for hover effects
import { getAuth } from 'firebase/auth'; // Correct Firebase import for authentication
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6
import Search from "../forms/Search";
import {
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Badge } from "antd"; // Correct import for Badge component from Ant Design

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let navigate = useNavigate(); // useNavigate hook from React Router v6
  let { user , cart} = useSelector((state) => ({ ...state }));

  const handleSelect = (eventKey) => {
    setCurrent(eventKey);
  };

  const logout = () => {
    const auth = getAuth(); // Get the auth instance
    auth.signOut().then(() => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      navigate('/login'); // use navigate instead of history.push
    });
  };

  return (
    <Navbar bg="light" expand="lg" onSelect={handleSelect}>
      {/* <Navbar.Brand as={Link} to="/"> <i className="bi bi-gem me-3 icon-animated"></i></Navbar.Brand> */}
      <Navbar.Brand as={Link} to="/"> 
  <i className="bi bi-gem me-3 icon-animated"></i>
</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" activeKey={current}>
          <Nav.Link as={Link} to="/shop" eventKey="home" className="nav-link-custom">
          <ShoppingOutlined style={{ marginRight: "8px" }} />
          Shop
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/cart" eventKey="cart" className="nav-link-custom" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Badge count={cart ? cart.length : 0} offset={[0, -2]} style={{ backgroundColor: '#FF0000' }}>
        <ShoppingCartOutlined style={{ fontSize: '20px' }} />
      </Badge>
      <span style={{ marginLeft: '5px' }}>Cart</span>
      </Nav.Link> */}
      <Nav.Link
  as={Link}
  to="/cart"
  eventKey="cart"
  className="nav-link-custom"
>
  <Badge
    count={cart ? cart.length : 0}
    offset={[0, -2]}
    style={{ backgroundColor: '#FF0000' }}
  >
    <ShoppingCartOutlined style={{ fontSize: '20px' }} />
  </Badge>
  <span>Cart</span>
</Nav.Link>



        </Nav>

        <Nav className="ms-auto">
          {
            user && (
              <NavDropdown 
                title={user.email && user.email.split("@")[0]} 
                id="basic-nav-dropdown" 
                className="nav-link-custom"
              >
                {user && user.role === 'subscriber' && (
                  <NavDropdown.Item as={Link} to="/user/history">
                    Dashboard
                  </NavDropdown.Item>
                )}
                {user && user.role === 'admin' && (
                  <NavDropdown.Item as={Link} to="/admin/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={logout} eventKey="logout">
                  <BoxArrowRight /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )
          }

       <span className="float-right p-1" style={{marginRight:"40px"}} >

         <Search />

       
         </span>

          {!user && (
            <>
              <Nav.Link as={Link} to="/register" eventKey="register" className="nav-link-custom">
                <PersonPlus /> Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login" eventKey="login" className="nav-link-custom">
                <Person /> Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>


    </Navbar>
  );
};

export default Header;
