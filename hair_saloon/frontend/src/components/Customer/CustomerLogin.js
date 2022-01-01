import React, { useState } from 'react';
// import "./CustomerLogin.css";
import { useHistory } from 'react-router-dom';
import { Button,  Col   } from 'react-bootstrap';
import {MDBInput} from 'mdbreact';


function CustomerLogin({ setCust }) {
    const history = useHistory()

    const [customer, setCustomer] = useState({
        email: "",
        password: ""
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

        const { email, password } = customer;
        if (email && password) {
            var res = await fetch("http://localhost:9700/customer/customerLogin", {
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
                    localStorage.setItem("customer", JSON.stringify(res.customer));
                    alert(res.message);
                    setCust(res.customer);
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
            <h1 style={{fontFamily: "fantasy"}}>Customer SignIn</h1>

            <div className="form-group col-auto">
                <MDBInput label="Email Address" type="text" name="email" value={customer.email} onChange={handlechange}  />
               
            </div>
            <div className="form-group col-auto">
                <MDBInput label="Password" type='password' name="password" value={customer.password} onChange={handlechange} />
                 </div>
            <br />

            <Button as={Col} variant="primary" onClick={login}>Log in</Button>
            <p className="text-right">
                <br/>
                Sign Up From <a href='/customerregister'>Here</a>
            </p>
        </div>
        </div>
    )
}

export default CustomerLogin;
