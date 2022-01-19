import React, { useState } from 'react';
import { Button  } from 'react-bootstrap';
import { MDBInput} from 'mdbreact';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';



function AdminLogin({ setCust }) {
    const history = useHistory()
    const [show,setShow] = useState(false);
    const [header,setHeader] = useState("");
    const [msg,setMsg] = useState("");
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    })

    function handlechange(e) {
        const { name, value } = e.target;

        setAdmin(
            {
                ...admin,
                [name]: value
            }
        )
    }
    function handleclose(){
        if(header === "Success"){
            history.push('/adminpage');    
        }
        setShow(false)
    }

    async function login() {

        const { email, password } = admin;
        if (email && password) {
            var res = await fetch("http://localhost:9700/admin/adminLogin", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
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
                    localStorage.setItem("customer", JSON.stringify(res.admin));
                    // alert(res.message);
                    setHeader("Success");
                    setMsg(res.message);
                    setShow(true);
                    setCust(res.admin);
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

    return (
        <div  className='row d-flex mt-5 justify-content-center'>
            
            <div className='border border-primary col-lg-5 bg-white' style={{borderRadius:"25px",boxShadow:"7px 7px gray"}}>
                <h1 style={{color:'black',marginTop:"20px"}}>Admin SignIn</h1>
            
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left text-dark" label="Email Address" icon='user' type="text" name="email" value={admin.email} onChange={handlechange}  />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left text-dark" icon='unlock' label="Password" type='password' name="password" value={admin.password} onChange={handlechange} />
                    </div>
                <br />

                <Button  variant="blue" style={{borderRadius:"20px"}} className='col-6' onClick={login}>Log in</Button>
                <Modal size="md" show={show} onHide={handleclose} >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {header}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-light'>{msg}</Modal.Body>
                    <Modal.Footer>
                        <Button style={{borderRadius:"20px"}} onClick={handleclose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                
                <p className="text-right text-dark">
                    <br/>
                    Sign Up From <a href='/adminregister'>Here</a>
                </p>
            
            </div>

     </div>

        
    )
}

export default AdminLogin;
