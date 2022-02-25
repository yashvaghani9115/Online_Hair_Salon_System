import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaPowerOff, FaHistory } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { BsShop } from "react-icons/bs";
import "./Header.css";

function Header({ setLogin }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const header = ("Our Top Services");
  const msg = (
    <div className="row">
      <div className="col-md-4">
        <h2 className="text-light text-center">User Service</h2>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            style={{ borderRadius: "20px" }}
          >

            <img src="/img/user.jpg"
              alt="user"
              style={{ borderRadius: "20px" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="bg-dark">
            <Dropdown.Item className="text-primary" href="/customerlogin">
              Sign In
            </Dropdown.Item>
            <Dropdown.Item className="text-primary" href="/customerregister">
              Sign Up
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
      <div className="col-md-4">
        <h2 className="text-light text-center">Owner Service</h2>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            style={{ borderRadius: "20px" }}
          >
            <img src="/img/owner.png" alt="owner" style={{ borderRadius: "20px" }} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-dark">
            <Dropdown.Item className="text-primary" href="/ownerlogin">
              Owner SignIn
            </Dropdown.Item>
            <Dropdown.Item className="text-primary" href="/ownerregister">
              Owner SignUp
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="col-md-4">
        <h2 className="text-light text-center">Admin Service</h2>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            style={{ borderRadius: "20px" }}
          >
            <img src="/img/admin.jpg" alt="admin" style={{ borderRadius: "20px" }} />

          </Dropdown.Toggle>

          <Dropdown.Menu className="bg-dark">
            <Dropdown.Item className="text-primary" href="/adminlogin">
              Sign In
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

      </div>
    </div>
  );
  function logout() {
    console.log("log out called")
    localStorage.clear();
    setLogin(false);
    window.location.replace("/")
  }
  function orders() {
    history.push("/orders");
  }
  function editshop() {
    history.push("/editShop")
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            style={{ border: "1px solid gray", borderRadius: "10px" }}
            href="/"
            className="p-2 text-white h1"
          >
            Hair Saloon
          </Navbar.Brand>
          <Nav>
            {(localStorage.getItem("customer") ||
              localStorage.getItem("owner") ||
              localStorage.getItem("admin")) ? (<>
                {(localStorage.getItem("customer")) ?
                  <Nav.Item
                    style={{ borderRadius: "25px" }}
                    className="btn btn-success"
                    onClick={orders}>
                    <FaHistory /> Orders History
                  </Nav.Item>

                  : (localStorage.getItem("owner") && localStorage.getItem("shop")) ?
                    <Nav.Item
                      style={{ borderRadius: "25px" }}
                      className="btn btn-success"
                      onClick={editshop}>
                      <BsShop className="mr-2 mb-1" size="20px" /> Edit Shop
                    </Nav.Item>
                    :
                    <></>}
                <Nav.Item
                  style={{ borderRadius: "25px" }}
                  className="btn btn-danger"
                  onClick={logout}
                >

                  <FaPowerOff className="mr-2 mb-1" size="20px"/> Logout
                </Nav.Item></>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setShow(true);
                  }}
                  style={{ borderRadius: "25px" }}
                  className="btn btn-blue"
                >
                  <MdOutlineMiscellaneousServices className="mr-1" style={{ fontSize: "25px" }} />Services
                </Button>
                <Modal size="xl" show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      {header}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="bg-dark ">{msg}</Modal.Body>
                  <Modal.Footer>
                    <Button
                      style={{ borderRadius: "20px" }}
                      onClick={() => setShow(false)}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
