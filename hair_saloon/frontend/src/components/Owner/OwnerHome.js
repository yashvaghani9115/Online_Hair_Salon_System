import React from "react";
import { Button, Navbar, Container } from "react-bootstrap";
function ownerhome() {
  return (
    <div>
      <Navbar bg="primary">
        <Container>
          <Navbar.Brand href="">
            <Button className="btn btn-success" href="/ownerservice">
              Services
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default ownerhome;
