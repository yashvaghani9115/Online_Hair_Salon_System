import React, { useState } from 'react';
// import "./CustomerLogin.css";
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Form } from 'react-bootstrap';


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


        <div className='border border-primary bg-light'>
            <h1>Customer Login</h1>

            <div className="form-group">
                <label>Email address</label>
                <br />
                <input type="text" className='rounded' name="email" value={customer.email} onChange={handlechange} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <br />
                <input type="password" className='rounded' name="password" value={customer.password} onChange={handlechange} />
            </div>
            <br />

            <Button as={Col} variant="primary" onClick={login}>Log in</Button>
            <p className="text-right">
                Sign Up From <a href='/customerregister'>Here</a>
            </p>
        </div>
    )
}

export default CustomerLogin;
