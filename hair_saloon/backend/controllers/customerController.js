import Customer from "../models/customerModel.js";

export const customerLogin = async (req, res) => {
    try {
            const {email,password} = req.body;
            const customer = await Customer.findOne({email:email,password:password});
            if (customer) {
                res.json({ stat: true, message: "Customer Logged in Sucessfully.", customer: customer });
            }
            else {
                res.json({ stat: false, message: "Invalid credentials, Customer not found !" });
            }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const customerRegister = async (req, res) => {
    try {
            const {name,mobile_num ,location,email,password} = req.body;
            const alreadyCustomer = await Customer.findOne({email:email});
            if(alreadyCustomer)
            {
                res.json({ stat: false, message: "Provided email-adress is already used." });
            }
            else
            {
                const result = await Customer.create({name:name,email:email,mobile_num:mobile_num,location:location,password:password});
                res.json({ stat: true,customer:result, message: "Customer registered sucessfully." });
            }

    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}