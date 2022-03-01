import Customer from "../models/customerModel.js";
import nodemailer from "nodemailer";
import client from "@sendgrid/mail";
export const customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email: email, password: password });
        if (customer) {
            res.json({ stat: true, message: "Customer Logged in Sucessfully.", customer: customer });
        }
        else {
            res.json({ stat: false, message: "Invalid credentials, Customer not found !" });
        }
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const customerRegister = async (req, res) => {
    try {
        const { name, mobile_num, email, password } = req.body;
        const alreadyCustomer = await Customer.findOne({ email: email });
        if (alreadyCustomer) {
            res.json({ stat: false, message: "Provided email-adress is already used,Please Use Different One" });
        }
        else {
            const result = await Customer.create({ name: name, email: email, mobile_num: mobile_num, password: password });
            res.json({ stat: true, customer: result, message: "Customer registered sucessfully." });
        }

    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}
export const sendMail = async (req, res) => {
    try {
        const { otp, cust_mail } = req.body
        client.setApiKey(process.env.SENDGRID_API_KEY);
        if(otp == -1){
            const {customer_name,salon_name,salon_add,barber_name,barber_email,turn} =req.body;
            const msg = {
                to:cust_mail, // Change to your recipient
                from: 'devil33516@gmail.com', // Change to your verified sender
                subject: 'Booking Success',
                html: `
                <h2> Your Salon Booking Is Successful </h2>
                <p>
                Your Name :`+customer_name+`<br/>
                Shop Name : `+salon_name+`<br />
                Address : `+salon_add+`<br />
                Barber Name :`+barber_name+`<br />
                Barber Email :`+barber_email+`<br />
                Number In Queue :<strong>`+turn+`</strong>
                <br/>
                Thank You Visit Again.
                
            </p>`
            }
            client
            .send(msg)
            .then(() => {
                console.log('Mail sent successfully')
                res.json({ stat: true, message: "Email Sent You on Your Registered Mail :" + cust_mail  });
            })
            .catch(error => {
                res.json({ stat: false, message: "Error! Please Book  Again" });

                console.error(error);
            });
        }else{

            const msg = {
                to:cust_mail, // Change to your recipient
                from: 'devil33516@gmail.com', // Change to your verified sender
                subject: 'Otp Verification',
                html: '<p>Your Hair Salon Registration is Requested and Your One Time Password(OTP) is :<strong>' + otp + "</strong> Please Don't Share with anybody!<br/>Thank you  "
            }
            client
            .send(msg)
            .then(() => {
                console.log('Mail sent successfully')
                res.json({ stat: true, message: "Email Sent You on Your Registered Mail :" + cust_mail + " Please Verify" });
            })
            .catch(error => {
                res.json({ stat: false, message: "Error! Please Click Register Button Again" });

                console.error(error);
            });
        }
        
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}