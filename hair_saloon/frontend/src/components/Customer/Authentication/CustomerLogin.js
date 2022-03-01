import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import  Joi  from 'joi-browser';
import ModalInterface from '../../Modal/ModalInterface';

function CustomerLogin({ setLogin }) {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");
    const [customer, setCustomer] = useState({
        email: "",
        password: ""
    })
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "90vh",
        backgroundImage: "url('/img/bg2.jpg')"
    }
    //validation start



    const [errors, setErrors] = useState({});
    const schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    };

    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(customer,
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
        setCustomer(
            {
                ...customer,
                [name]: value
            }
        )
        setErrors(errorData);
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
                // alert(res.message);

                setHeader("Something Wrong");
                setMsg(res.message);
                setShow(true);
            }
            else {
                if (res.stat) {
                    localStorage.setItem("customer", JSON.stringify(res.customer));
                    // alert(res.message);
                    setHeader("Success");
                    setMsg(res.message);
                    setShow(true);

                    setLogin(true);
                    const path = localStorage.getItem("path") 
                    if(path){
                        localStorage.removeItem("path")
                        history.push(""+path+"")
                    }else{
                        history.push("/")
                    }
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
                        <h1 >Customer SignIn</h1>

                    </div>
                    <form className="ui form">
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left text-dark" label="Email Address" icon='user' type="text" name="email" value={customer.email} onChange={handlechange} />
                        </div>
                        {errors.email && (
                            <div className="text-danger text-left ml-5" >
                                {errors.email}
                            </div>
                        )}
                        <div className="form-group col-auto">
                            <MDBInput containerClass="text-left text-dark" icon='unlock' label="Password" type='password' name="password" value={customer.password} onChange={handlechange} />
                        </div>
                        {errors.password && (
                            <div className="text-danger text-left ml-5">
                                {errors.password}
                            </div>
                        )}
                        <br />

                        <Button variant="blue" type="submit" style={{ borderRadius: "20px" ,color:"white" }} className='col-6' onClick={validateForm}>Log in</Button>
                    </form>
                    <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />

                    <p className="text-right text-dark">
                        <br />
                        Sign Up From <a href='/customerregister'>Here</a>
                    </p>

                </div>

            </div>
        </div>


    )
}

export default CustomerLogin;
