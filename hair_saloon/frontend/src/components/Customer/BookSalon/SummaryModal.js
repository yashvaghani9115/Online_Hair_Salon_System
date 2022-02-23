import React from "react";
import { Modal, Button } from "react-bootstrap";

function SummaryModal({ show, setShow, selectedSalon, selectedBarber }) {

    async function BookBarber() {
        setShow(false);
        var res = await fetch("http://localhost:9700/customer/bookbarber", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cust_id: JSON.parse(localStorage.getItem("customer"))._id,
                barber_id: selectedBarber._id,
                shop_id : selectedSalon._id
            }),
        });
        res = await res.json();
        if (res.wentWrong) {
            alert(res.message);
            setShow(false);
        } else {
            if (res.stat) {
                alert(res.message);
            } else {
             
                alert(res.message);
            }
        }
}

return (
    <>
        <Modal show={show} onHide={() => { setShow(false); }}>
            <Modal.Header closeButton>
                <Modal.Title>Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Shop Name : {selectedSalon.shop_name}<br />
                Address : {selectedSalon.address}<br />
                Your Turn : {selectedBarber.customer_ids.length + 1}<br />
                Barber Name : {selectedBarber.name}<br />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={BookBarber}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
}


export default SummaryModal;