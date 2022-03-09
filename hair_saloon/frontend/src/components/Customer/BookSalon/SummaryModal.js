import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModalInterface from "../../Modal/ModalInterface";

function SummaryModal({ show, setShow, selectedSalon, selectedBarber }) {
    const [modalheader,setModalheader] = useState("");
    const [modalmsg,setModalmsg] = useState("");
    const [modalshow, setModalshow] = useState(false);
    const customer = JSON.parse(localStorage.getItem("customer"))
    async function BookBarber() {
        setShow(false);
        var res = await fetch("http://localhost:9700/customer/bookbarber", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cust_id: customer._id,
                barber_id: selectedBarber._id,
                shop_id: selectedSalon._id
            }),
        });
        res = await res.json();
        if (res.wentWrong) {
            setShow(false);
            setModalheader("Something Wrong");
            setModalmsg(res.message);
            setModalshow(true);
        } else {
            if (res.stat) {
                setShow(false);
                setModalheader("Success");
                setModalmsg(res.message);
                setModalshow(true);
                sendMail()
            } else {
                setShow(false);
                setModalheader("Invalid");
                setModalmsg(res.message);
                setModalshow(true);
            }
        }
    }
    async function sendMail() {
        var res = await fetch("http://localhost:9700/customer/sendmail", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                otp: -1,
                cust_mail: customer.email,
                customer_name:customer.name,
                salon_name:selectedSalon.shop_name,
                salon_add:selectedSalon.address,
                barber_name:selectedBarber.name,
                barber_email:selectedBarber.email,
                turn:selectedBarber.customer_ids.length + 1
            })
        })
        res = await res.json();
        console.log(res)
        if (res.wentWrong) {
            setModalheader("Something Wrong");
            setModalmsg(res.message);
            setModalshow(true);
        }
        else {
            if (res.stat) {
                setModalheader("Success");
                setModalmsg(res.message);
                setModalshow(true);
            }
            else {
                setModalheader("Invalid");
                setModalmsg(res.message);
                setModalshow(true);
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
                    Your Name : {customer.name}<br/>
                    Shop Name : {selectedSalon.shop_name}<br />
                    Address : {selectedSalon.address}<br />
                    Employee Name : {selectedBarber.name}<br />
                    Employee Email : {selectedBarber.email}<br />
                    Number In Queue :<strong> {selectedBarber.customer_ids.length + 1}</strong><br />
                    <hr/>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={BookBarber}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalInterface show={modalshow} setShow={setModalshow} header={modalheader} msg={modalmsg} />

        </>
    );
}


export default SummaryModal;