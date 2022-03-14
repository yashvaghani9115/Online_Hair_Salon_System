import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import Joi from 'joi-browser';
import ModalInterface from '../../Modal/ModalInterface';


function CustomerRegister({ setLogin }) {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");
    const [customer, setCustomer] = useState({
        name: "",
        mobile_num: "",
        email: "",
        password: "",
        cpassword: "",
    })
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg2.jpg')"
    }

    //validation start
    const [errors, setErrors] = useState({});
    const schema = {
        name: Joi.string().min(2).max(20).required().label('Customer Name'),
        mobile_num: Joi.string().length(10).regex(/^[0-9]+$/).label('Mobile number'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(8).required().label('Password'),
        cpassword: Joi.string().min(8).required().label('Confirm Password'),
    };

    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(customer,
            schema, { abortEarly: false });
        const { error } = result;
        if (!error) {
            localStorage.setItem('before_verification',JSON.stringify(customer));
            history.push("/otpVerification")
            return null;
        } else {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                const message = item.message;
                errorData[name] = message;
            }
            setErrors(errorData);
            if (customer.password !== customer.cpassword) {
                errorData["cpassword"] = "Confirm Password doesn't match with Password";
            }
            return errorData;
        }
    };

    const validateProperty = (event) => {
        const { name, value } = event.target;
        const obj = { [name]: value };
        const subSchema = { [name]: schema[name] };
        const result = Joi.validate(obj, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
    };
    
    function handlechange(e) {
        const { name, value } = e.target;
        let errorData = { ...errors };
        const errorMessage = validateProperty(e);
        if (errorMessage) {
            errorData[name] = errorMessage;
        } else {
            delete errorData[name];
        }
        if (name === "cpassword" && value !== customer.password) {
            errorData[name] = "Confirm Password doesn't match with Password";
        }
        setCustomer(
            {
                ...customer,
                [name]: value
            }
        )
        setErrors(errorData);
    }

        return (
        <div className='main' style={style}>
            <div className='d-flex justify-content-center '>
                <div className='col-lg-5 bg-white ' style={{ borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }} >

                    <div className='mt-4 text-black'>
                        <h1 > Customer SignUp</h1>

                    </div>
                    {/* <form className="ui form"> */}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='user' label="Email Address" type="text" name="email" value={customer.email} onChange={handlechange} />
                        </div>
                        {errors.email && (
                            <div className="text-danger text-left ml-5">
                                {errors.email}
                            </div>
                        )}
                        <div className="form-group col-auto">

                            <MDBInput containerClass="text-left" icon='id-card-alt' label="Customer Name" type="text" name="name" value={customer.name} onChange={handlechange} />
                        </div>
                        {errors.name && (
                            <div className="text-danger text-left ml-5">
                                {errors.name}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='mobile-alt' label="Mobile Number" type="text" name="mobile_num" value={customer.mobile_num} onChange={handlechange} />
                        </div>
                        {errors.mobile_num && (
                            <div className="text-danger text-left ml-5">
                                {errors.mobile_num}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='key' label="Password" type="password" name="password" value={customer.password} onChange={handlechange} />
                        </div>
                        {errors.password && (
                            <div className="text-danger text-left ml-5">
                                {errors.password}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='unlock' label="Confirm Password" type="password" name="cpassword" value={customer.cpassword} onChange={handlechange} />
                        </div>
                        {errors.cpassword && (
                            <div className="text-danger text-left ml-5">
                                {errors.cpassword}
                            </div>
                        )}
                        <br />
                        <Button  className='col-6' style={{ borderRadius: "20px" ,color:"white"}} variant="blue" onClick={validateForm}>Register</Button>
                    {/* </form> */}
                    <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />
                    <p className="text-right">
                        <br />
                        Already Loged In Click <a href='/customerlogin'>Here</a>
                    </p>

                </div>
            </div>
        </div>

    )
}

export default CustomerRegister;