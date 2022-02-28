import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselElement } from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SalonCarousel({ selectedSalon, prefixLink }) {
    const history = useHistory();
    const caraousel_items = selectedSalon.images_pub_ids.map((pub_id, index) => {
        if (index == 0) {
            return (
                <MDBCarouselItem className='active' key={index}>
                    <MDBCarouselElement style={{ height: '450px' }} src={prefixLink + pub_id + ".png"} alt='...' />
                </MDBCarouselItem>
            );
        }
        else{
            return (
                <MDBCarouselItem key={index}>
                    <MDBCarouselElement style={{ height: '450px' }} src={prefixLink + pub_id + ".png"} alt='...' />
                </MDBCarouselItem>
            );
        }
    });
    return (
        <div className='container shadow pt-3  rounded' style={{ width: '100vw' }}>
            <MDBCard className='mb-3'>
                <MDBCardBody>
                    <MDBCardTitle id="carousel-title">{selectedSalon.shop_name}
                    <Button onClick={()=>{
                        history.goBack()
                    }} className="float-right btn btn-dark">Back</Button>
                    </MDBCardTitle>
                    <MDBCardText>
                        {selectedSalon.address}
                    </MDBCardText>
                </MDBCardBody>
                <MDBCarousel showControls fade>
                    <MDBCarouselInner>
                        {caraousel_items}
                    </MDBCarouselInner>
                </MDBCarousel>
                <br />
            </MDBCard>
        </div>
    )
}

export default SalonCarousel;