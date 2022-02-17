import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

function AboutSalon({selectedSalon}) {
    return (
        <MDBCard id='about' className='shadow-sm about-card'>
        <MDBCardBody>
          <MDBCardTitle><span className="address-title">Address</span></MDBCardTitle>
          <MDBCardText><span className="address">near post office abc , opposite xyz bank ,rajkot</span></MDBCardText>
          <br></br>
          <MDBCardTitle><span className='phone-num-title'>Phone no.</span></MDBCardTitle>
          <MDBCardText><span className="phone-num">+91 9999999999</span></MDBCardText>
        </MDBCardBody>
      </MDBCard>
    )
}

export default AboutSalon;