import React, { useState, useEffect } from 'react';
import OwnerSidebar from '../Home/OwnerSidebar';
import { Navbar, Container, Button, Table } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import ModalInterface from '../../Modal/ModalInterface';

function Barbermanagement() {
    const [show, setShow] = useState(false);
    let index = 0;

    // const history = useHistory();
    const [header, setHeader] = useState("");
    const [modalheader, setModalheader] = useState("");
    const [modalmsg, setModalmsg] = useState("");
    const [modalshow, setModalshow] = useState(false);
    const [barberList, setbarberList] = useState([]);
    const [barber, setBarber] = useState({
        name: "",
        mobile_num: "",
        email: ""
    })
    const dbarber = {
        name: "",
        mobile_num: "",
        email: ""
    }
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg3.jpg')"
    }

    function handlechange(e) {
        const { name, value } = e.target;

        setBarber(
            {
                ...barber,
                [name]: value
            }
        )
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
                setbarberList(res.barbers);
                console.log(res.barbers);
            } else {

            }
        }

    }
    async function addBarber() {

        const { name, mobile_num, email } = barber;
        if (name && mobile_num && email) {
            var res = await fetch("http://localhost:9700/owner/addBarber", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mobile_num: mobile_num,
                    owner_id: await JSON.parse(localStorage.getItem("owner"))._id
                })
            })

            res = await res.json();
            console.log(res)
            if (res.wentWrong) {
                // alert(res.message);
                setShow(false);
                setModalheader("Something Wrong");
                setModalmsg(res.message);
                setModalshow(true);
            }
            else {
                if (res.stat) {
                    // alert(res.message);
                    setShow(false);
                    setModalheader("Success");
                    setModalmsg(res.message);
                    setModalshow(true);
                    setBarber({ ...dbarber });
                    fetchBarberList();
                    // history.push('/');
                }
                else {
                    // alert(res.message);
                    setShow(false);
                    setModalheader("Invalid");
                    setModalmsg(res.message);
                    setModalshow(true);
                }
            }
        }
        else {
            setShow(false);
            setModalheader("Invalid");
            setModalmsg("Input fields can't be blank.");
            setModalshow(true);
        }

    }
    function editBarber(s) {
        setBarber(s);
        setShow(true);
        setHeader("Edit Barber");
    }
    async function editbarber() {
        if (barber) {
            var res = await fetch("http://localhost:9700/owner/editBarber", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(barber)
            })

            res = await res.json();
            console.log(res)
            if (res.wentWrong) {
                // alert(res.message);
                setShow(false);
                setModalheader("Something Wrong");
                setModalmsg(res.message);
                setModalshow(true);
            }
            else {
                if (res.stat) {
                    // alert(res.message);
                    setShow(false);
                    setModalheader("Success");
                    setModalmsg(res.message);
                    setModalshow(true);
                    setBarber({ ...dbarber });
                    fetchBarberList();
                    // history.push('/');
                }
                else {
                    // alert(res.message);
                    setShow(false);
                    setModalheader("Invalid");
                    setModalmsg(res.message);
                    setModalshow(true);
                }
            }
        }
        else {
            setShow(false);
            setModalheader("Invalid");
            setModalmsg("Input fields can't be blank.");
            setModalshow(true);
        }
    }
    async function deleteBarber(s) {
        console.log(s);
        const owner_id = await JSON.parse(localStorage.getItem("owner"))._id;
        if (s) {
            var res = await fetch(`http://localhost:9700/owner/deleteBarber/${s}&${owner_id}`, {
                method: "DELETE",
            })

            res = await res.json();
            if (res.wentWrong) {
                setModalheader("Something Wrong");
                setModalmsg(res.message);
                setModalshow(true);
            }
            else {
                if (res.stat) {
                    // alert(res.message);
                    setModalheader("Success");
                    setModalmsg(res.message);
                    setModalshow(true);
                    fetchBarberList();
                    // history.push('/');
                }
                else {
                    setModalheader("Invalid");
                    setModalmsg(res.message);
                    setModalshow(true);
                }
            }
        }
        else {
            setModalheader("Invalid");
            setModalmsg("Input fields can't be blank.");
            setModalshow(true);
        }
    }

    useEffect(() => {
        fetchBarberList();
    }, []);


    const td = barberList.map((s) => {
        return (
            <tr key={s._id} style={{ color: "white" }}>
                <td><strong>{++index}</strong></td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.mobile_num}</td>
                <td>
                    <Button variant="primary" size="sm" onClick={() => { editBarber(s); }}>
                        Edit
                    </Button>
                </td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => { if (window.confirm("Delete this item ?")) { deleteBarber(s._id); } }}>
                        Delete
                    </Button>
                </td>
            </tr>
        );
    });


    return (<>
        <div className='container-fluid' style={style}>
            <div className='row'>
                <div className='col-auto p-0'>
                    <OwnerSidebar />
                </div>
                <div className='col-auto' style={{ width: "75%" }} >
                    <Navbar bg="dark" className='mt-4 rounded'>
                        <Container>
                            <Navbar.Brand className='text-light ml-3'>Employee Details</Navbar.Brand>
                            <Button variant="success" onClick={() => { setBarber({ ...dbarber }); setHeader("Add Barber"); setShow(true) }} className="rounded my-0 align-items-end">Add Employee</Button>
                        </Container>
                    </Navbar>
                    <div className='col-auto overflow-auto'>

                        <Table className='text-center rounded'>
                            <thead>
                                <tr style={{ color: "white" }}>
                                    <th>#</th>
                                    <th>Employee Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{td}</tbody>
                        </Table>
                    </div>

                    <ModalInterface show={modalshow} setShow={setModalshow} header={modalheader} msg={modalmsg} />
                    <Modal
                        size="lg"
                        show={show}
                        onHide={() => setShow(false)}
                        className='text-center'

                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                {header}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='bg-light'>
                            <div className='main' style={style} >
                                <div className='d-flex justify-content-center' style={{ textAlign: "center" }}>
                                    <div className='col-lg-8 bg-white ' style={{ borderRadius: "25px", boxShadow: "0px 0px 1px 5px white" }} >
                                        <div className="form-group col-auto">
                                            <MDBInput containerClass="text-left" icon='user' label="Email Address" type="text" name="email" value={barber.email} onChange={handlechange} />
                                        </div>
                                        <div className="form-group col-auto">

                                            <MDBInput containerClass="text-left" icon='id-card-alt' label="Barber Name" type="text" name="name" value={barber.name} onChange={handlechange} />
                                        </div>
                                        <div className="form-group col-auto">
                                            <MDBInput containerClass="text-left" icon='mobile-alt' label="Mobile Number" type="text" name="mobile_num" value={barber.mobile_num} onChange={handlechange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{ borderRadius: "20px" }} variant="blue" onClick={() => { if (header === "Add Barber") { addBarber(); } else { editbarber(); } setShow(false); }}>{header}</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    </>
    )
}

export default Barbermanagement;