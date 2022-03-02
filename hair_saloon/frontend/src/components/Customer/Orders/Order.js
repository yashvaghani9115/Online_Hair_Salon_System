import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBCardText, MDBBadge, MDBBtn } from 'mdb-react-ui-kit'
import { useHistory } from 'react-router-dom';
import CustomerRating from '../CustomerRating/CustomerRating';

function Order({ o, index,prefixLink, cust ,fetchOrders}) {
    return (
        <div key={index} className='my-2'>
            <MDBCard >
                <MDBRow className='g-0'>
                    <MDBCol md='3'>

                        <MDBCardImage className='m-2' src={prefixLink + o.shop.images_pub_ids[0] + ".png"} height="180px" width="200px" />

                    </MDBCol>
                    <MDBCol md='5'>
                        <MDBCardBody>
                            <MDBCardTitle className='h2 text-black'>{o.shop.shop_name}</MDBCardTitle>
                            <MDBCardText>
                                <h5><></>{o.shop.address}</h5>
                                Barber :{o.barber.name}
                                <br />
                                Email:{o.barber.email}
                                {o.status=="completed" &&
                                    <div className='mt-3'><CustomerRating o={o} fetchOrders={fetchOrders}/></div>
                                }
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol className='position-relative' md="4">
                        <div className='h5' style={{ right: "30px", position: "absolute", top: "30px" }}>
                            Booked Date : {!o.date ? "no date" : o.date.slice(0, 10)}
                        </div>
                        <h2>
                            <div style={{ position: "absolute", bottom: "50px", right: "30px" }}>
                                {
                                    o.status == "completed" ?
                                        <MDBBadge color='success'>{o.status}</MDBBadge> :
                                        o.status == "waiting" ?
                                            <>

                                                <MDBBadge color="warning">{o.status}</MDBBadge>
                                                <MDBBadge notification pill color='danger'>
                                                    <span style={{ fontSize: "15px" }}> {o.barber.customer_ids.indexOf(cust._id) + 1}</span>
                                                </MDBBadge>

                                            </>
                                            :
                                            o.status == "cancel" ? <MDBBadge color='danger'>{o.status}</MDBBadge> :
                                                <span ><MDBBadge>{o.status}</MDBBadge></span>

                                }
                            </div>
                        </h2>

                    </MDBCol>
                </MDBRow>
            </MDBCard>

        </div>
    );
}

export default Order;
