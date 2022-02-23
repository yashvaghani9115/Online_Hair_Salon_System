import { Modal, Button } from "react-bootstrap";
import MapPicker from 'react-google-map-picker';
import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
const DefaultLocation = { lat: 21.101472400442564, lng: 72.82393134493594 };
const DefaultZoom = 10;

function AboutSalon({ selectedSalon, location }) {
  const mapType = "roadmap"
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }
  function handleResetLocation() {
    setDefaultLocation({ lat: location.latitude, lng: location.longitude })
    setZoom(DefaultZoom)

  }
  return (
    <>
      <MDBCard id='about' className='shadow-sm about-card'>
        <MDBCardBody>
          
            <MDBCardTitle><span className='phone-num-title'>Phone no.</span></MDBCardTitle>
          <MDBCardText><span className="phone-num">+91 9999999999</span></MDBCardText>
              
          <hr/>
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
              <Button variant="outline-orange" onClick={() => { setShow(true);handleResetLocation() }}><b>Show On Map</b></Button>
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