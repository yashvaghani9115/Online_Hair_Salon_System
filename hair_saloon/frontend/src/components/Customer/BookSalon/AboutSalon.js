import { Modal, Button } from "react-bootstrap";
import MapPicker from 'react-google-map-picker';
import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
const DefaultLocation = { lat: 21.101472400442564, lng: 72.82393134493594 };
const DefaultZoom = 10;

function AboutSalon({ selectedSalon, location }) {
  const mapType = "roadmap";
  const [owner, setOwner] = useState({});

  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }
  async function getOwner() {
    var res = await fetch("http://localhost:9700/customer/getowner", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        owner_id: selectedSalon.owner_id
      })
    })

    res = await res.json();

    if (res.wentWrong) {
      alert(res.message);
      // setHeader("Something Wrong");
      // setMsg(res.message);
      // setShow(true);
    } else {
      if (res.stat) {
        setOwner(res.owner);
      } else {
        // setHeader("Invalid");
        // setMsg(res.message);
        // setShow(true);
      }
    }
  }
  function handleResetLocation() {
    setDefaultLocation({ lat: location.latitude, lng: location.longitude })
    setZoom(DefaultZoom)

  }
  useEffect(() => {
    getOwner()
  },[])
  return (
    <>
      <MDBCard id='about' className='shadow-sm about-card'>
        <MDBCardBody>

          <MDBCardTitle><span>Owner of shop : {owner.name}</span></MDBCardTitle>
          <MDBCardText><span>Email : {owner.email}</span></MDBCardText>
          <MDBCardText><span>Contact no. : {owner.mobile_num}</span></MDBCardText>

          <hr />
          <div className="row">
            <div className="col-md-8">
              <MDBCardTitle>

                <span className="address-title">Address</span>
              </MDBCardTitle>

              <MDBCardText>

                <span className="text-dark">{selectedSalon.address}</span>
              </MDBCardText>
            </div>
            <div className="col-md-4">
              <Button variant="outline-orange" onClick={() => { setShow(true); handleResetLocation() }}><b>Show On Map</b></Button>
            </div>

          </div>


        </MDBCardBody>
      </MDBCard>
      <Modal size="m" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          Shop Location
        </Modal.Header>
        <Modal.Body>
          <MapPicker defaultLocation={defaultLocation}
            zoom={zoom}
            containerElement={<div style={{ height: '100%' }} />}
            mapTypeId={mapType}
            style={{ height: '300px' }}
            onChangeZoom={handleChangeZoom}
            apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { setShow(false) }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AboutSalon;