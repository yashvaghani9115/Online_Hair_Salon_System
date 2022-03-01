import React from "react";
import { Modal, Button } from "react-bootstrap";

function SummaryModal({ show, setShow, selectedSalon, selectedBarber }) {
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
            alert(res.message);
            setShow(false);
        } else {
            if (res.stat) {
                sendMail()
                alert(res.message);
            } else {

                alert(res.message);
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
            alert(res.message);
        }
        else {
            if (res.stat) {
                alert(res.message);
                // setHeader("Success");
                // setMsg(res.message);
                // setShow(true);

                // history.push('/orders');
            }
            else {
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
                    Your Name : {customer.name}<br/>
                    Shop Name : {selectedSalon.shop_name}<br />
                    Address : {selectedSalon.address}<br />
                    Barber Name : {selectedBarber.name}<br />
                    Barber Email : {selectedBarber.email}<br />
                    Number In Queue :<strong> {selectedBarber.customer_ids.length + 1}</strong><br />
                    <hr/>
                    
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