import Customer from "../models/customerModel.js";
import Location from "../models/locationModel.js";

export const customerLogin = async (req, res) => {
    try {
            const {email,password,longitude,latitude} = req.body;
            const customer = await Customer.findOne({email:email,password:password});
            if (customer) {
                const loc = await Location.findOne({longitude:longitude,latitude:latitude});
                if(loc){
                    if(! customer.location_id.equals(loc._id)){
                        console.log("Reassign Location");
                        //remove old location of cutomer
                        // await Location.deleteOne({_id:customer.location_id});
                        customer.set({location_id:loc._id});
                        await customer.save();
                        
                    }
                }else{
                    console.log("Create New Location");

                    const res_location_obj = await Location.create({longitude:longitude,latitude:latitude});
                    customer.set({location_id:res_location_obj._id});
                    await customer.save();

                }
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
            const {name,mobile_num,email,password,longitude,latitude} = req.body;
            const alreadyCustomer = await Customer.findOne({email:email});
            if(alreadyCustomer)
            {
                res.json({ stat: false, message: "Provided email-adress is already used." });
            }
            else
            {
                const res_location_obj = await Location.create({longitude:longitude,latitude:latitude});
                const result = await Customer.create({name:name,email:email,mobile_num:mobile_num,location_id:res_location_obj._id,password:password});
                res.json({ stat: true,customer:result, message: "Customer registered sucessfully." });
            }

    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}