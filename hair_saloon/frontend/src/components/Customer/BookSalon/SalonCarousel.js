import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselElement } from 'mdb-react-ui-kit';

function SalonCarousel({ selectedSalon }) {
    return (
        <div className='container shadow my-4 rounded' style={{ width: '60vw' }}>
            <MDBCard className='mb-3'>
                <MDBCardBody>
                    <MDBCardTitle id="carousel-title">Crystal Saloon</MDBCardTitle>
                    <MDBCardText>
                        near post-office rajkot
                    </MDBCardText>
                </MDBCardBody>
                <MDBCarousel showControls fade>
                    <MDBCarouselInner>
                        <MDBCarouselItem className='active'>
                            <MDBCarouselElement style={{height:'450px'}} src={require('../images/hs2.png')} alt='...' />
                        </MDBCarouselItem>
                        <MDBCarouselItem>
                            <MDBCarouselElement style={{height:'450px'}} src={require('../images/hs4.png')} alt='...' />
                        </MDBCarouselItem>
                        <MDBCarouselItem>
                            <MDBCarouselElement style={{height:'450px'}} src={require('../images/hs5.png')} />
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
                <br/>
            </MDBCard>
        </div>
    )
}

export default SalonCarousel;