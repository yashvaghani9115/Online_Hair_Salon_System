import React from "react";
import {Modal,Button} from "react-bootstrap";

function SummaryModal({ show, setShow,selectedSalon,selectedBarber}) {

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Shop Name : {selectedSalon.shop_name}<br/>
                    Address : {selectedSalon.address}<br/>
                    Your Turn : {selectedBarber.customer_ids.length + 1 }<br/>
                    Barber Name : {selectedBarber.name}<br/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default SummaryModal;