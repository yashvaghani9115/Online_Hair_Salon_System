import React, { useState } from 'react'
// import "./CustomerRegister.css"
import { useHistory } from 'react-router-dom'

function CustomerRegister({setCust}) {
    const history = useHistory()

    const [customer, setCustomer] = useState({
        name:"",
        mobile_num:"",
        email: "",
        password: "",
        location:""
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

    async function register() {

        const { name,mobile_num,email, password,location } = customer;
        if (name && mobile_num && email && password && location) {
            var res = await fetch("http://localhost:9700/customer/customerRegister", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name:name,
                    email: email,
                    mobile_num:mobile_num,
                    password: password,
                    location:location
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
        <div className="CustomerRegister">

            <h1>Customer Register</h1>
            <input type="text" placeholder="Enter Your Email" name="email" value={customer.email} onChange={handlechange} />
            <br />
            <input type="text" placeholder="Enter Your Name" name="name" value={customer.name} onChange={handlechange} />
            <br />
            <input type="text" placeholder="Enter Your Mobile Number" name="mobile_num" value={customer.mobile_num} onChange={handlechange} />
            <br />
            <input type="text" placeholder="Enter Your Location Number" name="location" value={customer.location} onChange={handlechange} />
            <br />
            <input type="password" placeholder="Enter Your Password" name="password" value={customer.password} onChange={handlechange} />
            <br />
            <button type="submit" onClick={register}> Register</button>
        </div>
    )
}

export default CustomerRegister;
