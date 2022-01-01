import React, { useState } from 'react'
// import "./CustomerRegister.css"
import { useHistory } from 'react-router-dom'
import { Button,  Col } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';





function CustomerRegister({ setCust }) {
    const history = useHistory()

    const [customer, setCustomer] = useState({
        name: "",
        mobile_num: "",
        email: "",
        password: "",
        cpassword: "",
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
            console.log(res)
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
            <div className='border border-primary rounded col-lg-5 ' style={{fontFamily: "Verdana, Arial, Helvetica, sans-serif"}} >

                <h1 style={{fontFamily: "fantasy"}}>Customer SignUp</h1>
                <div className="form-group col-auto">
                    <MDBInput label="Email Address" type="text" name="email" value={customer.email} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                   
                    <MDBInput label="User Name"   type="text" name="name" value={customer.name} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput label="Mobile Number" type="text" name="mobile_num" value={customer.mobile_num} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput label="Password" type="password" name="password" value={customer.password} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput label="Confirm Password" type="text" name="cpassword" value={customer.cpassword} onChange={handlechange} />
                </div>
                <div className="form-group col-auto">
                    <MDBInput label="Location" type="text" name="location" value={customer.location} onChange={handlechange} />
                </div>
                <br />
                <Button as={Col} variant="primary" onClick={register}>Register</Button>

                <p className="text-right">
                    <br />
                    Already Loged In Click <a href='/customerlogin'>Here</a>
                </p>


            </div>
        </div>

    )
}

export default CustomerRegister;
