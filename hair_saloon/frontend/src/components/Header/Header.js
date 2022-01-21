import React from "react";
import { Dropdown } from "react-bootstrap";
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom';
import {FaHome ,FaPowerOff,FaUser,FaPeopleArrows,} from 'react-icons/fa';
import {FcSettings} from 'react-icons/fc';
import {MdControlCamera} from 'react-icons/md';

import './Header.css'

function Header({setCust}) {
    const history = useHistory()
    function logout() {
        localStorage.clear();
        setCust(null);
        history.push("/");
    }


    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="text-white h1">Hair Saloon</Navbar.Brand>
                    <Nav>
                        <Link to="/"  className="btn btn-light text-dark"  style={{borderRadius:"25px"}} > <FaHome className="mr-1 " style={{fontSize:"25px"}}/>Home</Link>
                        {
                            localStorage.getItem("customer") || localStorage.getItem("owner") || localStorage.getItem("admin")  ?
                            <Nav.Item style={{borderRadius:"25px"}} className="btn btn-danger" onClick={logout}><FaPowerOff className="mr-1"/> Logout</Nav.Item>
                                : 
                                
                                   
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle style={{borderRadius:"25px"}} variant="success" id="dropdown-basic">
                                        <FaUser className="mr-1 " style={{fontSize:"25px"}}/>User 
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="bg-dark">
                                            <Dropdown.Item className="text-primary" href="/customerlogin">Sign In</Dropdown.Item>
                                            <Dropdown.Item className="text-primary" href="/customerregister">Sign Up</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown>
                                        <Dropdown.Toggle style={{borderRadius:"25px"}} variant="success" id="dropdown-basic">
                                        <MdControlCamera className="mr-1 "  style={{fontSize:"25px"}}/>Partner  
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="bg-dark">
                                            <Dropdown.Item className="text-primary" href="/ownerlogin">Owner SignIn</Dropdown.Item>
                                            <Dropdown.Item className="text-primary" href="/ownerregister">Owner SignUp</Dropdown.Item>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item className="text-primary" href="/adminlogin">Admin</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    
                                </>
                        }
                        
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;