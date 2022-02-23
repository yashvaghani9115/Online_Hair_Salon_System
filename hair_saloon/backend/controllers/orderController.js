import Barber from "../models/barberModel.js";
import CustomerOrder from "../models/CustomerOrderModel.js";

export const ordercomplete = async (req, res) => {
    try {
            const {cust_id,barber_id} = req.body;
            console.log(cust_id,barber_id);
            const barber =await Barber.findByIdAndUpdate(barber_id,{$pull:{customer_ids:cust_id}});
            const order = await CustomerOrder.findOneAndUpdate({customer_id:cust_id,status:"waiting"}, {status:"completed"}, {
                new: true
              });
        
            res.json({ stat: true, message: "Completed" });
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}
export const deleteorder = async (req, res) => {
    try {
            const {cust_id,barber_id} = req.body;
            
            const barber =await Barber.findByIdAndUpdate(barber_id,{$pull:{customer_ids:cust_id}});
            const order = await CustomerOrder.findOneAndUpdate({customer_id:cust_id,status:"waiting"}, {status:"cancel"}, {
                new: true
              });
            res.json({ stat: true, message: "removed" });
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}
