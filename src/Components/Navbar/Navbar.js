import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/Auth";
import './Navbar.css';

const MyNavbar = ()=> {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedin);
    const unReadMessage = useSelector(state=>state.mail.unReadMessage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = (e) => {
      e.preventDefault();
      dispatch(authActions.logout());
      alert("logout successful");
      navigate('/login');
    }
  return (
    <>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className=" p-3 fixed-top "
        >
          <Container>
            <Navbar.Brand>Mail-Box</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="h6"><NavLink to="/home" className='navbar-link'>
                  Home
                </NavLink></Nav.Link>
                {isLoggedIn && <Nav.Link className="h6"><NavLink to="/compose" className='navbar-link'>
                  Compose
                </NavLink></Nav.Link>}
                {isLoggedIn && <Nav.Link className="h6"><NavLink to="/inbox" className='navbar-link'>
                  Inbox {unReadMessage>0?unReadMessage:''}
                </NavLink></Nav.Link>}
                {isLoggedIn && <Nav.Link className="h6"><NavLink to="/sent" className='navbar-link'>
                  Sent
                </NavLink></Nav.Link>}
                {isLoggedIn && <Nav.Link className="h6"><NavLink className='navbar-link' to="/logout" onClick={logoutHandler}>
                  Logout
                </NavLink></Nav.Link>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default MyNavbar;