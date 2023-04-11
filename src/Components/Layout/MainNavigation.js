import React from 'react'
import {Button, Container , Nav , Navbar } from 'react-bootstrap';
import { authAction} from '../store/Auth-slice';
import { useDispatch , useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';


 const MainNavigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const show = useSelector(state=>state.auth.isLoggedIn)
    const unReadMessage = useSelector(state=>state.mail.unReadMessage)
    const logoutHandler=()=>{
        dispatch(authAction.logout())
        navigate('/')
    }
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand >Sravani`s MailBox</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {show && <NavLink to='/compose'>Compose Email</NavLink>}
          {show && <NavLink to='/inbox' >Inbox Email {unReadMessage}</NavLink>}
          {show && <NavLink to='/sent' >Sent Email</NavLink>}

        </Nav>
        {show && <Button onClick={logoutHandler} className='float-right mr-3'>Logout</Button>}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
export default MainNavigation;