import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { Modal } from 'react-bootstrap';


function CustomerRegister({ setCust }) {
    // const history = useHistory()
    const [show,setShow] = useState(false);
    const [header,setHeader] = useState("");
    const [msg,setMsg] = useState("");

    const [customer, setCustomer] = useState({
        name: "",
        mobile_num: "",
        email: "",
        password: "",
        cpassword: "",
        location: ""
    })

    function handlechange(e) {
        const { name, value } = e.target;

        setCustomer(
            {
                ...customer,
                [name]: value
            }
        )
    }

    async function register() {

        const { name, mobile_num, email, password, location } = customer;
        if (name && mobile_num && email && password && location) {
            var res = await fetch("http://localhost:9700/customer/customerRegister", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mobile_num: mobile_num,
                    password: password,
                    location: location
                })
            })

            res = await res.json();
            console.log(res)
            if (res.wentWrong) {
                // alert(res.message);
                setHeader("Something Wrong");
                setMsg(res.message);
                setShow(true);
            }
            else {
                if (res.stat) {
                    localStorage.setItem("customer", JSON.stringify(res.customer));
                    // alert(res.message);
                    setHeader("Success");
                    setMsg(res.message);
                    setShow(true);
                    setCust(res.customer);
                    // history.push('/');
                }
                else {
                    // alert(res.message);
                    setHeader("Invalid");
                    setMsg(res.message);
                    setShow(true);
                }
            }
        }
        else {
            setHeader("Invalid");
            setMsg("Input fields can't be blank.");
            setShow(true);
        }

    }

    return (
        <div className='row d-flex mt-5 justify-content-center'>
            <div className='border border-primary col-lg-5 bg-white ' style={{borderRadius:"25px",boxShadow:"7px 7px gray"}} >

                <h1 style={{color:'black',marginTop:"20px"}}>Customer SignUp</h1>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='user' label="Email Address" type="text" name="email" value={customer.email} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                   
                    <MDBInput containerClass="text-left" icon='id-card-alt' label="User Name"   type="text" name="name" value={customer.name} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='mobile-alt' label="Mobile Number" type="text" name="mobile_num" value={customer.mobile_num} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='key' label="Password" type="password" name="password" value={customer.password} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='unlock' label="Confirm Password" type="text" name="cpassword" value={customer.cpassword} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='map-marker-alt' label="Location" type="text" name="location" value={customer.location} onChange={handlechange} />
                </div>
                <br />
                <Button className='col-6' style={{borderRadius:"20px"}} variant="blue" onClick={register}>Register</Button>
                <Modal
                    size="md"
                    show={show}
                    onHide={() => setShow(false)}
                    
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {header}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-light'>{msg}</Modal.Body>
                    <Modal.Footer>
                        <Button style={{borderRadius:"20px"}} onClick={()=>setShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <p className="text-right">
                    <br />
                    Already Loged In Click <a href='/customerlogin'>Here</a>
                </p>


            </div>
        </div>

    )
}

export default CustomerRegister;
