import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { Modal } from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa';



function CustomerRegister({ setCust }) {
    const history = useHistory()
    const [show,setShow] = useState(false);
    const [header,setHeader] = useState("");
    const [msg,setMsg] = useState("");

    const [customer, setCustomer] = useState({
        name: "",
        mobile_num: "",
        email: "",
        password: "",
        cpassword: "",
        longitude: 0.0,
        latitude: 0.0
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

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getPosInState,failAccess);
        } 
    }
    
    function failAccess(){
        setHeader("Fail to Access");
        setMsg(`Unable to access your location !
        Please enable it`);
        setShow(true);
    }   
    function getPosInState(position) {
        console.log(position.coords.longitude);
        setCustomer({...customer, longitude:position.coords.longitude, latitude:position.coords.latitude})
    }
    useEffect(() => {
        getLocation();
    }, []);
    async function register() {

        const { name, mobile_num, email, password, longitude,latitude } = customer;
        console.log(customer);
        if (name && mobile_num && email && password && longitude && latitude) {
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
                    longitude:longitude,
                    latitude:latitude
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
        <div className='main'>
        <div className='d-flex justify-content-center '>
            <div className='col-lg-5 bg-white ' style={{borderRadius:"25px",boxShadow:"0px 0px 1px 5px white"}} >

                <div className='mt-4 text-black'>
                        <h1 > Customer SignUp</h1>

                </div>
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
        </div>

    )
}

export default CustomerRegister;
