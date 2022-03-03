import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { Modal } from 'react-bootstrap';

function ShopDetailsModal(props) {

    const { show, onHide, listObj, prefixLink } = props;
    const shop = listObj.shop;
    const owner = listObj.owner;
    return (
        <Modal show={show} onHide={onHide} size="lg"  aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>{shop.shop_name}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container h-auto" >
                    <h3><center>Images</center></h3>
                    <div className="row my-1" style={{ backgroundColor: '#f0f8ff' }}>
                        {shop.images_pub_ids.map((pub_id, i) => {
                            return (
                                <div key={i} className="col-4 col my-2 cntr">
                                    <img
                                        src={prefixLink + pub_id + ".png"}
                                        alt="chosen"
                                        style={{ height: '130px', width: '210px' }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <h3><center>Details</center></h3>
                    <div className="row p-3 mt-3">
                        <div className="col-md-12 border pt-1"  >
                            <p style={{ fontSize: "22px", fontFamily: "Monaco", }}>
                                <b>Owner Email : </b>
                                {owner.email}
                                <br />
                                <b>Owner Name : </b>
                                {owner.name}
                                <br />
                                <hr />
                                <b>Shop Name : </b>
                                {shop.shop_name}
                                <br />
                                <b>Gender : </b> {shop.salon_gender_type}
                                <br />
                                <b>Time : </b>
                                {shop.opening_time} to {shop.closing_time}
                                <br />
                                <b>Seat Capacity : </b>
                                {shop.capacity_seats}
                                <br />
                                <b>Address : </b>
                                {shop.address}
                                <br />
                            </p>
                        </div>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button size="lg" onClick={onHide}>Done</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ShopDetailsModal;