import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import Joi from 'joi-browser';
import ModalInterface from '../../Modal/ModalInterface';

function Verification({ setLogin }) {
    //for reloading 
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
          e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
      };

    const history = useHistory()
    const customer = JSON.parse(localStorage.getItem('before_verification'));
    const [correctOtp,setCorrectOtp] = useState()
    const [otp, setOtp] = useState();
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});
    const schema = {
        otp: Joi.number().required().label('Otp'),
    };
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "90vh",
        backgroundImage: "url('/img/bg2.jpg')"
    }

    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate({ otp },
            schema, { abortEarly: false });
        console.log(result);
        const { error } = result;
        if (!error) {
            
            if (correctOtp === parseInt(otp)) {
                register()
            } else {
                // alert("Entered Otp is Wrong")
                setHeader("Invalid");
                setMsg("Entered Otp is Wrong");
                setShow(true);
            }
            console.log("otp verification called");
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



    function handlechange(e) {
        const { name, value } = e.target;
        let errorData = { ...errors };
        const errorMessage = validateProperty(e);
        if (errorMessage) {
            errorData[name] = errorMessage;
        } else {
            delete errorData[name];
        }
        setOtp(
            value
        )
        setErrors(errorData);
    }

    async function register() {

        const { name, mobile_num, email, password } = customer;
        // console.log(customer);
        if (name && mobile_num && email && password) {
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
                    password: password
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
                    localStorage.removeItem('before_verification');
                    localStorage.setItem("customer", JSON.stringify(res.customer));
                    localStorage.setItem("prefixLink", JSON.stringify(res.prefix_link));
                    alert(res.message);
                    setLogin(true);

                    history.push('/');
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
            // alert("Input fields can't be blank.");

            setHeader("Invalid");
            setMsg("Input fields can't be blank.");
            setShow(true);
        }

    }
    async function sendMail(otp) {
        setCorrectOtp(otp)
        var res = await fetch("http://localhost:9700/customer/sendmail", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                otp: otp,
                cust_mail: customer.email
            })
        })
        res = await res.json();
        console.log(res)
        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            if (res.stat) {
                // alert(res.message);
                // setLogin(true);
                setHeader("Success");
                setMsg(res.message);
                setShow(true);

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
    useEffect(() => {
        sendMail(Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111)
    }, [])

    return (
        <div style={style} className="main">
            <div className='d-flex justify-content-center'>

                <div className='col-lg-5 bg-white' style={{ borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }}>
                    <div className='mt-4 text-black'>
                        <h1 >Otp Verification</h1>

                    </div>
                    {/* <form className="ui form"> */}
                    <div className="form-group col-auto">
                        <MDBInput containerClass="text-left text-dark" label="Enter Otp" icon='user' type="number" name="otp" value={otp} onChange={handlechange} />
                    </div>
                    {errors.otp && (
                        <div className="text-danger text-left ml-5" >
                            {errors.otp}
                        </div>
                    )}
                    <Button variant="blue" style={{ borderRadius: "20px", color: "white" }} onClick={validateForm} className='col-6' >Verify</Button>
                    {/* </form> */}
                    <div className="text-right my-4">
                        Resend Otp From <Link onClick={() => { sendMail(Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111) }} to='#' className='mt-5'>Here</Link>
                    </div>
                    <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />

                </div>

            </div>
        </div>
    )

}
export default Verification;
