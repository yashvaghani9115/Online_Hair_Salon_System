import React, { useState } from 'react';
// import "./OwnerRegister.css"
import { useHistory } from 'react-router-dom';
import { Button,  Col } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';





function OwnerRegister({ setCust }) {
    const history = useHistory()

    const [owner, setOwner] = useState({
        name: "",
        mobile_num: "",
        email: "",
        password: "",
        cpassword: "",
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
                alert(res.message);
            }
            else {
                if (res.stat) {
                    localStorage.setItem("owner", JSON.stringify(res.owner));
                    alert(res.message);
                    setCust(res.owner);
                    history.push('/shopregister');
                }
                else {
                    alert(res.message);
                }
            }
        }
        else {
            alert("Input fields can't be blank.");
        }

    }

    return (
        <div className='row d-flex justify-content-center'>
            <div className='border border-primary rounded col-lg-5 ' style={{fontFamily: "Verdana, Arial, Helvetica, sans-serif"}} >

                <h1 style={{fontFamily: "fantasy"}}>Owner SignUp</h1>
                <div className="form-group col-auto">
                    <MDBInput label="Email Address" type="text" name="email" value={owner.email} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                   
                    <MDBInput label="User Name"   type="text" name="name" value={owner.name} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput label="Mobile Number" type="text" name="mobile_num" value={owner.mobile_num} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput label="Password" type="password" name="password" value={owner.password} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput label="Confirm Password" type="text" name="cpassword" value={owner.cpassword} onChange={handlechange} />
                </div>
                
                <br />
                <Button as={Col} variant="primary" onClick={register}>Register</Button>

                <p className="text-right">
                    <br />
                    Already Loged In Click <a href='/ownerlogin'>Here</a>
                </p>


            </div>
        </div>

    )
}

export default OwnerRegister;

