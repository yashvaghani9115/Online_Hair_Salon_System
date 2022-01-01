import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useHistory } from 'react-router-dom';
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
            <Navbar bg="dark" variant="light">
                <Container>
                    <Navbar.Brand className="text-white">Hair Saloon</Navbar.Brand>
                    <Nav className="justify-content-end nav_bar_wrapper">
                        <Link to="/" >Home</Link>
                        {
                            localStorage.getItem("customer") ?
                            <Nav.Item className="logut-span" onClick={logout}>Logout</Nav.Item>
                                : 
                                <>
                                    <Link to='/customerlogin'>SignIn</Link>
                                    <Link to='/customerregister'>SignUp</Link>
                                </>
                        }
                        
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;