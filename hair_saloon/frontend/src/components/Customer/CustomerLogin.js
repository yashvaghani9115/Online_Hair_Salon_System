import React, { useState } from 'react';
// import "./CustomerLogin.css";
import { useHistory } from 'react-router-dom';

function CustomerLogin({setCust}) {
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
        else
        {
            alert("Input fields can't be blank.");
        }

    }

    return (
        <div className="CustomerLogin">

            <h1>Customer Login</h1>
            <input type="text" placeholder="Enter Your Email" name="email" value={customer.email} onChange={handlechange} />
            <br />
            <input type="password" placeholder="Enter Your Password" name="password" value={customer.password} onChange={handlechange} />
            <br />
            <button type="submit" onClick={login}>Customer Login</button>
        </div>
    )
}

export default CustomerLogin;
