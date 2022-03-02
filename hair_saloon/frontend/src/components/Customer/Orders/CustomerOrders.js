import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBCardText, MDBBadge, MDBBtn } from 'mdb-react-ui-kit'
import { useHistory } from 'react-router-dom';
import Order from './Order';
import ModalInterface from '../../Modal/ModalInterface';

function CustomerOrders() {
    const history = useHistory()
    const [orderList, setOrderList] = useState([]);
    const [response, setResponse] = useState(true);
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState();
    const [msg, setMsg] = useState();

    const cust = JSON.parse(localStorage.getItem("customer"));
    const prefixLink = JSON.parse(localStorage.getItem("prefixLink"));
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundImage: "url('/img/bg3.jpg')"
    }
    async function fetchOrders(msg) {
        if (msg) {
            setHeader("Rating Submitted.");
            setMsg(msg);
            setShow(true);
        }
        setResponse(false)
        var res = await fetch("http://localhost:9700/customer/listorders", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cust_id: cust._id
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
            // setHeader("Something Wrong");
            // setMsg(res.message);
            // setShow(true);
        } else {
            if (res.stat) {
                // console.log(res.orders)
                setOrderList(res.orders);
                setResponse(true)
                // setCustomer(cust);
                // setTurn()
            } else {
                // setHeader("Invalid");
                // setMsg(res.message);
                // setShow(true);
            }
        }



    }
    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <>

            <div className='pt-5' style={style}>
                <center>
                    <Card style={{ maxWidth: "70%", maxWeight: "400px", textAlign: "left" }}>
                        <Card.Header className='bg-success text-white'>
                            <h1>
                                Your Orders
                                <Button className='float-right btn btn-dark' onClick={() => { history.goBack() }} >Back</Button>
                            </h1>
                        </Card.Header>
                        <Card.Body className='bg-dark'>
                            {!response ?
                                <center>
                                    <div class="spinner-border text-primary " role="status"></div>
                                    <span class="text-white">Loading...</span>
                                </center>
                                :
                                orderList.length == 0 ?
                                    <div className='form-control text-center'>No List Found</div>
                                    : orderList.map((o, index) =>
                                        <Order o={o} index={index} prefixLink={prefixLink} cust={cust} fetchOrders={fetchOrders} />)}
                        </Card.Body>
                    </Card>
                </center>
                <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />

            </div>

        </>
    )

}

export default CustomerOrders;