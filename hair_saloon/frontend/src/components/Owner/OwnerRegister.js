import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { Modal } from 'react-bootstrap';


function OwnerRegister({ setCust }) {
    // const history = useHistory()
    const [show,setShow] = useState(false);
    const [header,setHeader] = useState("");
    const [msg,setMsg] = useState("");

    const [owner, setOwner] = useState({
        name: "",
        mobile_num: "",
        email: "",
        password: "",
        cpassword: "",
        location: ""
    })

    function handlechange(e) {
        const { name, value } = e.target;

        setOwner(
            {
                ...owner,
                [name]: value
            }
        )
    }

    async function register() {

        const { name, mobile_num, email, password, location } = owner;
        if (name && mobile_num && email && password && location) {
            var res = await fetch("http://localhost:9700/owner/ownerRegister", {
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
                    localStorage.setItem("customer", JSON.stringify(res.owner));
                    // alert(res.message);
                    setHeader("Success");
                    setMsg(res.message);
                    setShow(true);
                    setCust(res.owner);
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

                <h1 style={{color:'black',marginTop:"20px"}}>Owner SignUp</h1>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='user' label="Email Address" type="text" name="email" value={owner.email} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                   
                    <MDBInput containerClass="text-left" icon='id-card-alt' label="User Name"   type="text" name="name" value={owner.name} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='mobile-alt' label="Mobile Number" type="text" name="mobile_num" value={owner.mobile_num} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='key' label="Password" type="password" name="password" value={owner.password} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='unlock' label="Confirm Password" type="text" name="cpassword" value={owner.cpassword} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='map-marker-alt' label="Location" type="text" name="location" value={owner.location} onChange={handlechange} />
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
                    Already Loged In Click <a href='/ownerlogin'>Here</a>
                </p>


            </div>
        </div>

    )
}

export default OwnerRegister;
