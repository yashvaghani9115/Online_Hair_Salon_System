import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import Joi from 'joi-browser';
import ModalInterface from '../../Modal/ModalInterface';




function OwnerRegister({ handleClick, setLogin }) {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");

    const [owner, setOwner] = useState({
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
        backgroundImage: "url('/img/bg1.jpg')",
        // height: "91vh"s
    }
    //validation start
    const [errors, setErrors] = useState({});
    const schema = {
        name: Joi.string().min(2).max(20).required().label('Owner Name'),
        mobile_num: Joi.string().length(10).regex(/^[0-9]+$/).label('Mobile number'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(8).required().label('Password'),
        cpassword: Joi.string().min(8).required().label('Confirm Password')
    };

    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(owner,
            schema, { abortEarly: false });
        console.log(result);
        const { error } = result;
        if (!error) {
            register();
            console.log("register called");
            return null;
        } else {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                const message = item.message;
                errorData[name] = message;
            }
            console.log(errors);
            setErrors(errorData);
            if (owner.password !== owner.cpassword) {
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






    //validation end

    function handlechange(e) {
        const { name, value } = e.target;
        let errorData = { ...errors };
        const errorMessage = validateProperty(e);
        if (errorMessage) {
            errorData[name] = errorMessage;
        } else {
            delete errorData[name];
        }
        if (name === "cpassword" && value !== owner.password) {
            errorData[name] = "Confirm Password doesn't match with Password";
        }
        setOwner(
            {
                ...owner,
                [name]: value
            }
        )
        setErrors(errorData);
    }

    async function register() {

        const { name, mobile_num, email, password } = owner;
        if (name && mobile_num && email && password) {
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
                    setLogin(true);
                    history.push('/shopregister');
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
        <div className='main' style={style} >
            <div className='d-flex justify-content-center' style={{ textAlign: "center" }}>
                <div className='col-lg-5 bg-white ' style={{ borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }} >

                    <div className='mt-4 text-black'>
                        <h1 > Owner SignUp</h1>

                    </div>
                    <form className="ui form">
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='user' label="Email Address" type="text" name="email" value={owner.email} onChange={handlechange} />
                        </div>
                        {errors.email && (
                            <div className="text-danger text-left ml-5">
                                {errors.email}
                            </div>
                        )}
                        <div className="form-group col-auto">

                            <MDBInput containerClass="text-left" icon='id-card-alt' label="Owner Name" type="text" name="name" value={owner.name} onChange={handlechange} />
                        </div>
                        {errors.name && (
                            <div className="text-danger text-left ml-5">
                                {errors.name}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='mobile-alt' label="Mobile Number" type="text" name="mobile_num" value={owner.mobile_num} onChange={handlechange} />
                        </div>
                        {errors.mobile_num && (
                            <div className="text-danger text-left ml-5">
                                {errors.mobile_num}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='key' label="Password" type="password" name="password" value={owner.password} onChange={handlechange} />
                        </div>
                        {errors.password && (
                            <div className="text-danger text-left ml-5">
                                {errors.password}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left" icon='unlock' label="Confirm Password" type="password" name="cpassword" value={owner.cpassword} onChange={handlechange} />
                        </div>
                        {errors.cpassword && (
                            <div className="text-danger text-left ml-5">
                                {errors.cpassword}
                            </div>
                        )}



                        <Button className='col-6' type='submit' style={{ borderRadius: "20px" ,color:"white"}} variant="blue" onClick={validateForm}>Register</Button>
                    </form>
                    <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />
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

