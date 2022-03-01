import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { Modal } from 'react-bootstrap';
import Joi from 'joi-browser';
import ModalInterface from '../../Modal/ModalInterface';


function OwnerLogin({ setLogin }) {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");
    const [owner, setOwner] = useState({
        email: "",
        password: ""
    })
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        backgroundImage: "url('/img/bg1.jpg')"
    }
    //validation start
    const [errors, setErrors] = useState({});
    const schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    };

    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(owner,
            schema, { abortEarly: false });
        console.log(result);
        const { error } = result;
        if (!error) {
            login();
            console.log("login called");
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
        setOwner(
            {
                ...owner,
                [name]: value
            }
        )
        setErrors(errorData);
    }

    async function login() {

        console.log("login");
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
                setHeader("Something Wrong");
                setMsg(res.message);
                setShow(true);
            }
            else {
                if (res.stat) {

                    localStorage.setItem("owner", JSON.stringify(res.owner));
                    localStorage.setItem("prefixLink", JSON.stringify(res.prefix_link));
                    setHeader("Success");
                    setMsg(res.message);
                    setShow(true);

                    const path = localStorage.getItem("path") 
                    if (res.owner.shopRegisterFlag) {
                        localStorage.setItem("shop", JSON.stringify(res.shop));
                        if (res.shop.verified === "pending")
                        history.push('/verification');
                        else if (res.shop.verified === "Accept"){
                            if(path){    
                                console.log("path called")                        
                                localStorage.removeItem("path")
                                history.push(""+path+"")
                            }
                            history.push('/ownerHome');
                        }
                        else
                        history.push('/verificationReject');
                    } else {
                        history.push("/shopregister");
                    }
                    setLogin(true);



                }
                else {
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

        <div style={style} className="main">
            <div className='d-flex justify-content-center'>

                <div className='col-lg-5 bg-white' style={{ borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }}>
                    <div className='mt-4 text-black'>
                        <h1 >Owner SignIn</h1>

                    </div>
                    <form className="ui form">
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left text-dark" label="Email Address" icon='user' type="text" name="email" value={owner.email} onChange={handlechange} />
                        </div>
                        {errors.email && (
                            <div className="text-danger text-left ml-5">
                                {errors.email}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left text-dark" icon='unlock' label="Password" type='password' name="password" value={owner.password} onChange={handlechange} />
                        </div>
                        <br />
                        {errors.password && (
                            <div className="text-danger text-left ml-5">
                                {errors.password}
                            </div>
                        )}

                        <Button variant="blue" type="submit" style={{ borderRadius: "20px", color: "white" }} className='col-6' onClick={validateForm}>Log in</Button>
                    </form>
                    <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />

                    <p className="text-right text-dark">
                        <br />
                        Sign Up From <a href='/ownerregister'>Here</a>
                    </p>

                </div>

            </div>
        </div>


    )
}

export default OwnerLogin;
