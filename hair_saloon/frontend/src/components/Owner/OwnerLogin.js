import React, { useState } from 'react';
// import "./OwnerLogin.css";
import { useHistory } from 'react-router-dom';
import { Button,  Col   } from 'react-bootstrap';
import {MDBInput} from 'mdbreact';


function OwnerLogin({ setCust }) {
    const history = useHistory()

    const [owner, setOwner] = useState({
        email: "",
        password: ""
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

    async function login() {

        const { email, password } = owner;
        if (email && password) {
            var res = await fetch("http://localhost:9700/owner/ownerLogin", {
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
                alert(res.message);
            }
            else {
                if (res.stat) {
                    localStorage.setItem("owner", JSON.stringify(res.owner));
                    alert(res.message);
                    setCust(res.owner);
                    history.push('/');
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
        <div className='border border-primary rounded col-lg-5 ' style={{fontFamily: "Verdana, Arial, Helvetica, sans-serif"}}>
            <h1 style={{fontFamily: "fantasy"}}>Owner SignIn</h1>

            <div className="form-group col-auto">
                <MDBInput label="Email Address" type="text" name="email" value={owner.email} onChange={handlechange}  />
               
            </div>
            <div className="form-group col-auto">
                <MDBInput label="Password" type='password' name="password" value={owner.password} onChange={handlechange} />
                 </div>
            <br />

            <Button as={Col} variant="primary" onClick={login}>Log in</Button>
            <p className="text-right">
                <br/>
                Sign Up From <a href='/ownerregister'>Here</a>
            </p>
        </div>
        </div>
    )
}

export default OwnerLogin;
