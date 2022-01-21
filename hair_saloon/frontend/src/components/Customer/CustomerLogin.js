import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button  } from 'react-bootstrap';
import { MDBInput} from 'mdbreact';
import { Modal } from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa';




function CustomerLogin({ setCust }) {
    // const history = useHistory()
    const [show,setShow] = useState(false);
    const [header,setHeader] = useState("");
    const [msg,setMsg] = useState("");
    const [customer, setCustomer] = useState({
        email: "",
        password: "",
        longitude:0.0,
        latitude:0.0
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

    async function login() {

        const { email, password,longitude,latitude } = customer;
        if (email && password) {
            var res = await fetch("http://localhost:9700/customer/customerLogin", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    longitude:longitude,
                    latitude:latitude
                })
            })

            res = await res.json();

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


    return (
        <div style={{height:"90vh",backgroundColor:"rgb(0, 98, 255)"}} className='main'>
        <div  className='d-flex justify-content-center'>
            
            <div className='border border-primary col-lg-5 bg-white' style={{borderRadius:"25px",boxShadow:"7px 7px gray"}}>
                <div className='mt-4 text-black'>
                        <h1 ><FaUserCircle/> Customer SignIn</h1>

                </div>
            
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left text-dark" label="Email Address" icon='user' type="text" name="email" value={customer.email} onChange={handlechange}  />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left text-dark" icon='unlock' label="Password" type='password' name="password" value={customer.password} onChange={handlechange} />
                    </div>
                <br />

                <Button  variant="blue" style={{borderRadius:"20px"}} className='col-6' onClick={login}>Log in</Button>
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
                
                <p className="text-right text-dark">
                    <br/>
                    Sign Up From <a href='/customerregister'>Here</a>
                </p>
            
            </div>

     </div>
     </div>

        
    )
}

export default CustomerLogin;
