import Customer from "../models/customerModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
// import client from "@sendgrid/mail";
export const customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email: email, password: password });
        const prefix_link = process.env.BEGIN_LINK + process.env.CLOUDINARY_NAME + process.env.SUB_FOLDER_PATH;

        if (customer) {
            res.json({ stat: true, message: "Customer Logged in Sucessfully.", customer: customer, prefix_link: prefix_link });
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
            const prefix_link = process.env.BEGIN_LINK + process.env.CLOUDINARY_NAME + process.env.SUB_FOLDER_PATH;

            res.json({ stat: true, customer: result, prefix_link: prefix_link, message: "Customer registered sucessfully." });
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
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SECRET_MAIL_ID,
                pass: process.env.SECRET_PASSWORD
            }
        });
        if (otp == -1) {
            const { customer_name, salon_name, salon_add, barber_name, barber_email, turn } = req.body;
            var mailOptions = {
                from:process.env.SECRET_MAIL_ID ,
                to: cust_mail,
                subject: 'Booking Success',
                html:`
                <h2> Your Salon Booking Is Successful </h2>
                <p>
                Your Name :`+ customer_name + `<br/>
                Shop Name : `+ salon_name + `<br />
                Address : `+ salon_add + `<br />
                Barber Name :`+ barber_name + `<br />
                Barber Email :`+ barber_email + `<br />
                Number In Queue :<strong>`+ turn + `</strong>
                <br/>
                Thank You Visit Again.
                
            </p>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json({ stat: false, message: "Error! Please Book  Again" });
                    console.log(error);
                } else {
                    res.json({ stat: true, message: "Email Sent You on Your Registered Mail :" + cust_mail });
                    console.log('Email sent: ' + info.response);
                }
            }); 
        } else {
            const cust = await Customer.findOne({email:cust_mail})
            if(cust){
                res.json({ stat: false, message: "Provided email-adress is already used,Please Use Different One" });
            }
            var mailOptions = {
                from:process.env.SECRET_MAIL_ID ,
                to: cust_mail,
                subject: 'OTP Verification',
                html:`<p>Your Hair Salon Registration is Requested and Your One Time Password(OTP) is :<h5>`+otp+`</h5>Please Don't Share with anybody!<br/>Thank you</p> `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json({ stat: true, message: "Error! Please Click Register button again" });

                    console.log(error);
                } else {
                    res.json({ stat: true, message: "Email Sent You on Your Registered Mail :" + cust_mail+"Please Verify!" });
                    console.log('Email sent: ' + info.response);
                }
            });
        }

    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}
