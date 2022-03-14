import React, { useEffect, useState } from 'react';
import OwnerSidebar from './OwnerSidebar';
import { Card, Dropdown, Badge } from 'react-bootstrap';
import ModalInterface from '../../Modal/ModalInterface';

function OwnerHome() {
    const [selectedbarber, setSelectedBarber] = useState();
    const [barberList, setBarberList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");

    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg3.jpg')"
    }
    async function fetchBarberList() {
        var res = await fetch("http://localhost:9700/owner/listBarbers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                owner_id: await JSON.parse(localStorage.getItem("owner"))._id
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);

        } else {
            if (res.stat) {
                setBarberList(res.barbers);
                setSelectedBarber(res.barbers[0]);
                fetchCustomers(res.barbers[0]._id);
            } else {
                alert(res.message);
            }
        }
    }

    async function fetchCustomers(b_id) {
        var res = await fetch("http://localhost:9700/owner/listCustomers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                b_id: b_id
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);

        } else {
            if (res.stat) {
                setCustomerList(res.customers);
            } else {
                alert(res.message);
            }
        }
    }

    async function ordercomplete(b_id, c_id) {
        var res = await fetch("http://localhost:9700/owner/ordercomplete", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                barber_id: b_id,
                cust_id: c_id
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            setHeader("Something Wrong");
            setMsg(res.message);
            setShow(true);

        } else {
            if (res.stat) {
                setHeader("Success");
                setMsg(res.message);
                setShow(true);
            } else {
                setHeader("Invalid");
                setMsg(res.message);
                setShow(true);
            }
        }
        fetchCustomers(selectedbarber._id);
    }

    async function orderdelete(b_id, c_id) {
        var res = await fetch("http://localhost:9700/owner/orderdelete", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                barber_id: b_id,
                cust_id: c_id
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            setHeader("Something Wrong");
            setMsg(res.message);
            setShow(true);

        } else {
            if (res.stat) {
                setHeader("Success");
                setMsg(res.message);
                setShow(true);
            } else {
                setHeader("Invalid");
                setMsg(res.message);
                setShow(true);
            }
        }
        fetchCustomers(selectedbarber._id);

    }

    useEffect(() => {
        fetchBarberList();
    }, [])

    return (
        <>
            <div className='container-fluid' style={style} >
                <div className='row'>
                    <div className='col-auto p-0'>
                        <OwnerSidebar />
                    </div>
                    <div className='col-auto' style={{ width: "75%" }} >
                        <div>
                            <Card style={{ width: "80%", margin: "auto", marginTop: "2em" }} >
                                <Card.Header className="h1 row m-0" style={{ backgroundColor: "#383838", color: "white" }}>
                                    <div className='col-md-8 h2'>
                                        {selectedbarber ? selectedbarber.name : "No Barber"}
                                    </div>
                                    <div className='col-md-4 text-right'>
                                        <Dropdown style={{ marginRight: "16px" }}>
                                            <Dropdown.Toggle variant="success" >
                                                Select Barber
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="bg-white">
                                                {barberList.map((b, index) => {
                                                    return (<Dropdown.Item
                                                        key={index}
                                                        className="text-primary"
                                                        onClick={() => { setSelectedBarber(b); fetchCustomers(b._id); }}
                                                    >
                                                        {b.name}
                                                    </Dropdown.Item>)
                                                })}

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                </Card.Header>
                                <Card.Body style={{ height: "60vh", overflow: "auto" }}>
                                    <Card.Text >
                                        {customerList.length === 0 ? <div className='form-control text-center text-dark'>Customer not found</div> : customerList.map((c, index) => <>
                                            <div className="container ml-0 " style={{ position: 'relative' }}>
                                                <div className="row border my-2" style={{ backgroundColor: '#e3e3e3' }}>
                                                    <div className="row mb-2 mt-3">
                                                        <div className="col-md-6 pl-3">
                                                            <h4><Badge bg="dark">{index + 1}</Badge> <span className='ml-3 '>{c.name}</span></h4>
                                                        </div>
                                                        <div className="col-md-6 text-right">
                                                            <span>
                                                                <span className="col-md-5 btn btn-sm btn-primary" onClick={() => { ordercomplete(selectedbarber._id, c._id) }}> Done</span>
                                                            </span>
                                                            <span>
                                                                <span className="col-md-5 btn btn-sm btn-danger" onClick={() => { orderdelete(selectedbarber._id, c._id) }}> Remove</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        )}

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />

        </>

    )
}

export default OwnerHome;
