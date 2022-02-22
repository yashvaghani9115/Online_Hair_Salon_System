import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { Modal } from 'react-bootstrap';




function OwnerRegister(props) {
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
    })
    const style = {
        backgroundPosition: "center" , 
        backgroundRepeat: "no-repeat",  
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg1.jpg')"
    }

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

        const { name, mobile_num, email, password} = owner;
        if (name && mobile_num && email && password ) {
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
                    localStorage.setItem("owner", JSON.stringify(res.owner));
                    // alert(res.message);
                    setHeader("Success");
                    setMsg(res.message);
                    setShow(true);
                    // history.push('/shopregister');
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
<<<<<<< HEAD
        <div className='main' style={style} >
=======
        <div style={style} className='main' >
>>>>>>> 824b51a2d5fb5684bb92d819e707c305a35e3918
        <div className='d-flex justify-content-center' style={{textAlign:"center"}}>
            <div className='col-lg-5 bg-white ' style={{borderRadius:"25px",boxShadow:"3px 3px rgb(33,37,41)"}} >

            <div className='mt-4 text-black'>
                        <h1 > Owner SignUp</h1>

                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='user' label="Email Address" type="text" name="email" value={owner.email} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                   
                    <MDBInput containerClass="text-left" icon='id-card-alt' label="Owner Name"   type="text" name="name" value={owner.name} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='mobile-alt' label="Mobile Number" type="text" name="mobile_num" value={owner.mobile_num} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='key' label="Password" type="password" name="password" value={owner.password} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput containerClass="text-left" icon='unlock' label="Confirm Password" type="password" name="cpassword" value={owner.cpassword} onChange={handlechange} />
                </div>
                
               
             
                <Button className='col-6 text-white' style={{borderRadius:"20px"}} variant="blue" onClick={()=>{register();props.handleClick(2);}}>Register</Button>
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
        </div>

    )
}

export default OwnerRegister;

