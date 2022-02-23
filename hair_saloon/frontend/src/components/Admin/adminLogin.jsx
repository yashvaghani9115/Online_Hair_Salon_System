import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import auth from '../Auth/auth';
import Joi from 'joi-browser';


function AdminLogin({ setLogin }) {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    })
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        backgroundImage: "url('/img/bg-admin.jpg')"
    }

    //validation start



    const [errors, setErrors] = useState({});
    const schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    };

    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(admin,
            schema, { abortEarly: false });
        console.log(result);
        const { error } = result;
        if (!error) {
            login();
            console.log("login  called");
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
        setAdmin(
            {
                ...admin,
                [name]: value
            }
        )
        setErrors(errorData);
    }
    function handleclose() {
        if (header === "Success") {
            history.push('/adminpage');
        }
        setShow(false)
    }

    async function login() {

        const { email, password } = admin;
        if (email && password) {
            var res = await fetch("http://localhost:9700/admin/adminLogin", {
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
                // alert(res.message);

                setHeader("Something Wrong");
                setMsg(res.message);
                setShow(true);
            }
            else {
                if (res.stat) {
                    localStorage.setItem("admin", JSON.stringify(res.admin));
                    // alert(res.message);
                    setHeader("Success");
                    setMsg(res.message);
                    setShow(true);
                    setLogin(true);
                    history.push("/adminPage")
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
        <div style={style} className='main'>
            <div className='d-flex justify-content-center'>

                <div className='col-lg-5 bg-white' style={{ borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }}>
                    <h1 style={{ color: 'black', marginTop: "20px" }}>Admin SignIn</h1>
                    <form className="ui form">
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left text-dark" label="Email Address" icon='user' type="text" name="email" value={admin.email} onChange={handlechange} />
                        </div>
                        {errors.email && (
                            <div className="text-danger text-left ml-5">
                                {errors.email}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left text-dark" icon='unlock' label="Password" type='password' name="password" value={admin.password} onChange={handlechange} />
                        </div>
                        {errors.password && (
                            <div className="text-danger text-left ml-5">
                                {errors.password}
                            </div>
                        )}


                        <Button type='submit' variant="blue" style={{ borderRadius: "20px" ,color:"white"}} className='col-6 my-4' onClick={validateForm}>Log in</Button>
                    </form>
                    <Modal size="md" show={show} onHide={handleclose} >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                {header}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='bg-light'>{msg}</Modal.Body>
                        <Modal.Footer>
                            <Button style={{ borderRadius: "20px"  }} onClick={handleclose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>


    )
}

export default AdminLogin;
