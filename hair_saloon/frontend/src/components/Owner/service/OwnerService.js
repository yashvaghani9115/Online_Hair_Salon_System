import React, { useEffect, useState } from 'react';
import { Button, Table, Card, Nav, Modal, Dropdown } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import OwnerSidebar from '../OwnerSidebar';


function OwnerService() {
    const [list, setList] = useState([]);
    const [print_list, Setprintlist] = useState([]);
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [service, setService] = useState({
        service_name: "",
        price: 0,
        gender_type: true, //t : male,f:female
        category: "",
    });
    const dservice = {
        service_name: "",
        price: 0,
        gender_type: true, //t : male,f:female
        category: "",
    }
    let index = 0;
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg3.jpg')"
    }
    let shop_gender = JSON.parse(localStorage.getItem("shop")).salon_gender_type;
    console.log(shop_gender)



    async function getList() {
        var res = await fetch("http://localhost:9700/owner/listServices", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shop_id: JSON.parse(localStorage.getItem('shop'))._id
            }),
        });

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
            // setHeader("Something Wrong");
            // setMsg(res.message);
            // setShow(true);
        } else {
            if (res.stat) {
                // let shop = {name:res.shoplist[0].owner_id,location:res.shoplist[0].location_id,gender:res.shoplist[0].salon_gender_type,shop_name:res.shoplist[0].shop_name};
                setList(res.servicelist);
                const tmp = res.servicelist.filter((x) => x.category === "Hair Style")
                Setprintlist(tmp.map((o) => {

                    return (
                        <tr>
                            <th>
                                {++index}
                            </th>
                            <th>
                                {o.service_name}
                            </th>
                            <th>
                                {o.price} ₹
                            </th>
                            <th>
                                {o.gender_type ? "MALE" : "FEMALE"}
                            </th>

                            <th style={{ width: "35%" }}>
                                <Button size='sm' className='text-white' variant='orange' onClick={() => { editservice(o); }}>
                                    Edit
                                </Button>
                                <Button size='sm' variant='danger' onClick={() => { if (window.confirm("Delete the item?")) { deleteservice(o._id); } }}>
                                    Delete
                                </Button>
                            </th>
                        </tr>
                    );
                })
                )





            } else {
                // setHeader("Invalid");
                // setMsg(res.message);
                // setShow(true);
            }
        }
    }

    async function addService() {
        if (
            service.category &&
            service.price &&
            service.service_name
        ) {
            var res = await fetch("http://localhost:9700/owner/addService", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service_name: service.service_name,
                    gender_type: service.gender_type,
                    price: service.price,
                    category: service.category,
                    owner_id: JSON.parse(localStorage.getItem('owner'))._id
                }),
            });
            res = await res.json();
            if (res.wentWrong) {
                // alert(res.message);

                // setHeader("Something Wrong");
                setShow(false);

                alert(res.message);
                // setShow(true);
            } else {
                if (res.stat) {
                    //   setHeader("Success");
                    setHeader(false)
                    alert(res.message);
                    window.location.reload(true);


                    //   setShow(true);
                    // history.push('/ownerService');
                } else {
                    //   setHeader("Invalid");
                    setHeader(false);
                    alert(res.message);

                    //   setShow(true);
                }
            }
        } else {
            //   setHeader("Invalid");
            alert("Input Field can't be blank");
            //   setShow(true);
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;

        setService({
            ...service,
            [name]: value,
        });
    }
    function editservice(s) {
        setService(s);
        setShow(true);
        setHeader("Edit Service");
    }

    async function editService() {
        if (service) {
            var res = await fetch("http://localhost:9700/owner/editservice", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(service)
            })

            res = await res.json();
            console.log(res)
            if (res.wentWrong) {
                // alert(res.message);
                setShow(false);
                alert("Something Wrong");
            }
            else {
                if (res.stat) {
                    // alert(res.message);
                    setShow(false);
                    alert("Edit success");
                    setService({ ...dservice });
                    window.location.reload(true);

                    // history.push('/');
                }
                else {
                    // alert(res.message);
                    setShow(false);
                    alert(res.message);
                }
            }
        }
        else {
            setShow(false);
            alert("Input fields can't be blank.");
        }
    }
    async function deleteservice(s) {
        console.log(s);
        const owner_id = await JSON.parse(localStorage.getItem("owner"))._id;
        if (s) {
            var res = await fetch(`http://localhost:9700/owner/deleteService/${s}&${owner_id}`, {
                method: "DELETE",
            })

            res = await res.json();
            if (res.wentWrong) {
                // alert(res.message);
                alert("Something Wrong");
            }
            else {
                if (res.stat) {
                    // alert(res.message);
                    alert("Delete Success");
                    window.location.reload(true);
                    // history.push('/');
                }
                else {
                    // alert(res.message);
                    alert(res.message);
                }
            }
        }
        else {
            setShow(false);
            alert("Input fields can't be blank.");
        }
    }
    async function set_list(cat) {
        const tmp = list.filter((x) => x.category === cat)
        // console.log(tmp)
        Setprintlist(tmp.map((o) => {

            return (
                <tr>
                    <th>
                        {++index}
                    </th>
                    <th>
                        {o.service_name}
                    </th>
                    <th>
                        {o.price} ₹
                    </th>
                    <th>
                        {o.gender_type ? "MALE" : "FEMALE"}
                    </th>

                    <th style={{ width: "35%" }}>
                        <Button size='sm' className='text-white' variant='orange' onClick={() => { editservice(o); }}>
                            Edit
                        </Button>
                        <Button size='sm' variant='danger' onClick={() => { if (window.confirm("Delete the item?")) { deleteservice(o._id); } }}>
                            Delete
                        </Button>
                    </th>
                </tr>
            );
        })
        )


    }


    useEffect(() => {
        getList()

    }, []);

    return (
        <div className='container-fluid' style={style} >
            <div className='row'>
                <div className='col-auto p-0'>
                    <OwnerSidebar />
                </div>
                <div className='col-auto' style={{ width: "75%" }} >

                    <div>


                        <Card style={{ width: "80%", margin: "auto", marginTop: "2em" }} >
                            <Card.Header className="h1" style={{ backgroundColor: "#383838", color: "white" }}>
                                Sevices
                                <Button onClick={() => { setService({ ...dservice }); setHeader("Add Service"); setShow(true) }} className="btn btn-success float-right">
                                    Add Service
                                </Button>

                            </Card.Header>

                            <Card.Header >
                                <div >

                                    <Nav variant="pills" defaultActiveKey="Hair Style">
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Hair Style") }} eventKey="Hair Style">Hair Style</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Hair coloring") }} eventKey="Hair coloring" >Hair coloring</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Shaving") }} eventKey="Shaving" >Shaving</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Head Massage") }} eventKey="Head Massage" >Head Massage</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Facials and skin care") }} eventKey="Facials and skin care" >Facials and skin care</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Waxing") }} eventKey="Waxing" >Waxing</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Nail Treatments") }} eventKey="Nail Treatments" >Nail Treatments</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Combo Pack") }} eventKey="Combo Pack" >Combo Pack</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>

                            </Card.Header>
                            <Card.Body style={{ height: "50vh", overflow: "scroll" }}>
                                <Card.Text >
                                    <Table bordered hover >
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <th>
                                                    No.
                                                </th>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Price
                                                </th>
                                                <th>
                                                    Gender
                                                </th>

                                                <th>
                                                    Operation
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {!(print_list.length === 0) ?
                                                print_list
                                                : (<tr>
                                                    <td className='text-center' colSpan={5}>No list Found</td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </Card.Text>
                            </Card.Body>
                        </Card>
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
                                                <MDBInput containerClass="text-left text-dark" label="Service Name" type="text" name="service_name" value={service.service_name} onChange={handleChange} />
                                            </div>
                                            <div className="form-group col-auto">

                                                <MDBInput containerClass="text-left text-dark" label="Price" type="number" name="price" onChange={handleChange} value={service.price} />
                                            </div>
                                            <div className="form-group col-auto">


                                                {(shop_gender == "Both") ?
                                                    <Dropdown style={{ marginRight: "16px" }}>
                                                        <Dropdown.Toggle variant="dark" className="form-control p-2">
                                                            Select Gender
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className="bg-dark">
                                                            <Dropdown.Item
                                                                className="text-primary"
                                                                onClick={() => {
                                                                    setService({ ...service, gender_type: true });
                                                                }}
                                                            >
                                                                Male
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                className="text-primary"
                                                                onClick={() => {
                                                                    setService({ ...service, gender_type: false });
                                                                }}
                                                            >
                                                                Female
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                    : (shop_gender == "Male") ?
                                                        // <Dropdown style={{ marginRight: "16px" }}>
                                                        //  <Dropdown.Toggle variant="dark" className="form-control p-2">
                                                        //      Select Gender
                                                        //  </Dropdown.Toggle>
                                                        // <Dropdown.Menu className="bg-dark">
                                                        //         <Dropdown.Item
                                                        //             className="text-primary"
                                                        //             onClick={() => {
                                                        //                 setService({ ...service, gender_type: true });
                                                        //             }}
                                                        //         >
                                                        //             Male
                                                        //         </Dropdown.Item>
                                                        //         </Dropdown.Menu>
                                                        // </Dropdown>
                                                        <>
                                                            <p style={{ display: "none" }} onLoad={() => { setService({ ...service, gender_type: false }) }}></p>
                                                        </>


                                                        :
                                                        // <Dropdown style={{ marginRight: "16px" }}>
                                                        //  <Dropdown.Toggle variant="dark" className="form-control p-2">
                                                        //      Select Gender
                                                        //  </Dropdown.Toggle>
                                                        // <Dropdown.Menu className="bg-dark">
                                                        //         <Dropdown.Item
                                                        //             className="text-primary"
                                                        //             onClick={() => {
                                                        //                 setService({ ...service, gender_type: false });
                                                        //             }}
                                                        //         >
                                                        //             Female
                                                        //         </Dropdown.Item>
                                                        //         </Dropdown.Menu>
                                                        // </Dropdown>
                                                        <>
                                                            <p style={{ display: "none" }} onLoad={() => { setService({ ...service, gender_type: false }) }}></p>
                                                        </>

                                                }


                                                {/* </Dropdown> */}
                                                <MDBInput containerClass="text-left text-dark" label="Gender" value={service.gender_type ? "Male" : "Female"} title="please select from below" />
                                            </div>
                                            <div className="form-group col-auto">
                                                <Dropdown style={{ marginRight: "16px" }}>
                                                    <Dropdown.Toggle variant="dark" className="form-control p-2">
                                                        Select category
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="bg-dark">
                                                        {service.gender_type ? (
                                                            <>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Hair Style",
                                                                        });
                                                                    }}
                                                                >
                                                                    Hair Style
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Hair Coloring",
                                                                        });
                                                                    }}
                                                                >
                                                                    Hair coloring
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({ ...service, category: "Shaving" });
                                                                    }}
                                                                >
                                                                    Shaving
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Head Massage",
                                                                        });
                                                                    }}
                                                                >
                                                                    Head Massage
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Facials and skin care",
                                                                        });
                                                                    }}
                                                                >
                                                                    Facials and skin care
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Combo Pack",
                                                                        });
                                                                    }}
                                                                >
                                                                    Combo Pack
                                                                </Dropdown.Item>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Hair Style",
                                                                        });
                                                                    }}
                                                                >
                                                                    Hair Style
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Hair coloring",
                                                                        });
                                                                    }}
                                                                >
                                                                    Hair coloring
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({ ...service, category: "Waxing" });
                                                                    }}
                                                                >
                                                                    Waxing
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Head Massage",
                                                                        });
                                                                    }}
                                                                >
                                                                    Head Massage
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Nail Treatments",
                                                                        });
                                                                    }}
                                                                >
                                                                    Nail Treatments
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Facials and skin care",
                                                                        });
                                                                    }}
                                                                >
                                                                    Facials and skin care
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setService({
                                                                            ...service,
                                                                            category: "Combo Pack",
                                                                        });
                                                                    }}
                                                                >
                                                                    Combo Pack
                                                                </Dropdown.Item>
                                                            </>
                                                        )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <MDBInput containerClass="text-left text-dark" value={service.category} title="Please select from below " label="Category" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{ borderRadius: "20px", color: "white" }} variant="blue" onClick={() => { if (header === "Add Service") { addService(); } else { editService(); } setShow(false); }}>{header}</Button>
                            </Modal.Footer>
                        </Modal>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default OwnerService;