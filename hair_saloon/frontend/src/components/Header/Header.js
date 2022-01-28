import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FaHome, FaPowerOff, FaUser } from "react-icons/fa";
import { MdControlCamera, MdOutlineMiscellaneousServices } from "react-icons/md";
import { Modal } from "react-bootstrap";
import "./Header.css";

function Header({ setCust }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const header = ("Our Top Services");
  const msg = (
    <div className="row">
      <div className="col-4">
        <h2 className="text-light text-center">User Service</h2>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            style={{ borderRadius: "20px" }}
          >

            <img src="/img/user.jpg"
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
      <div className="col-4">
        <h2 className="text-light text-center">Owner Service</h2>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            style={{ borderRadius: "20px" }}
          >
            <img src="/img/owner.png" style={{ borderRadius: "20px" }} />
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
      <div className="col-4">
        <h2 className="text-light text-center">Admin Service</h2>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            style={{ borderRadius: "20px" }}
          >
            <img src="/img/admin.jpg" style={{ borderRadius: "20px" }} />

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
    localStorage.clear();
    setCust(null);
    history.push("/");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            style={{ border: "1px solid gray", borderRadius: "25px" }}
            href="/"
            className="p-2 text-white h1"
          >
            Hair Saloon
          </Navbar.Brand>
          <Nav>
            {localStorage.getItem("customer") ||
              localStorage.getItem("owner") ||
              localStorage.getItem("admin") ? (<>

              <Nav.Item
                style={{ borderRadius: "25px" }}
                className="btn btn-danger"
                onClick={logout}
              >
                <FaPowerOff className="mr-1" /> Logout
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
