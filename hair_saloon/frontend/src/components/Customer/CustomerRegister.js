import React, { useState } from 'react'
// import "./CustomerRegister.css"
import { useHistory } from 'react-router-dom'
import { Button, Row, Col,Form } from 'react-bootstrap';





function CustomerRegister({ setCust }) {
    const history = useHistory()

    const [customer, setCustomer] = useState({
        name: "",
        mobile_num: "",
        email: "",
        password: "",
        location: ""
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

        const { name, mobile_num, email, password, location } = customer;
        if (name && mobile_num && email && password && location) {
            var res = await fetch("http://localhost:9700/customer/customerRegister", {
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

        <div className='border border-primary' >

            <h1>Customer Register</h1>
            
                <div className="form-group">
                    <label>Email address</label>
                    <br/>
                    <input  type="text"  name="email" className=' rounded' value={customer.email} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <label>User Name </label>
                    <br/>
                    <input className='rounded' type="text" name="name" value={customer.name} onChange={handlechange} />
                </div>
                <div className="form-group">
                    <label>Mobile Number </label>
                    <br/>
                    <input type="text" className='rounded'  name="mobile_num" value={customer.mobile_num} onChange={handlechange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <br/>
                    <input type="password" className='rounded'  name="password" value={customer.password} onChange={handlechange} />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <br/>
                    <input type="text" className='rounded' name="location"  value={customer.location} onChange={handlechange} />
                </div>
                <br/>
                <Button as={Col} variant="primary" onClick={register}>Register</Button>
                <p className="text-right">
                    Already Loged In Click <a href='/customerlogin'>Here</a>
                </p>
               
            
        </div>
    )
}

export default CustomerRegister;
