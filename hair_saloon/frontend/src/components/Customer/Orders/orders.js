import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBCardText, MDBBadge, MDBBtn } from 'mdb-react-ui-kit'
import { useHistory } from 'react-router-dom';


function CustomerOrders() {
    const history = useHistory()
    const [orderList, setOrderList] = useState([]);
    const [response, setResponse] = useState(true)
    const cust = JSON.parse(localStorage.getItem("customer"));
    const prefixLink = JSON.parse(localStorage.getItem("prefixLink"));
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundImage: "url('/img/bg3.jpg')"
    }
    async function fetchOrders() {
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
                                <Button className='float-right btn btn-dark' onClick={()=>{history.goBack()}} >Back</Button>
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
                                    : orderList.map((o, index) => {
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
                                        )
                                    })}
                        </Card.Body>
                    </Card>
                </center>

            </div>

        </>
    )

}

export default CustomerOrders;