import mongoose from "mongoose";
import Barber from "./barberModel.js";
import Customer from "./customerModel.js";
import Shop from "./shopModel.js";

const CustomerOrderSchema = new mongoose.Schema(
    {
        customer_id :  {type: mongoose.Schema.Types.ObjectId, ref: Customer},
        shop_id : {type: mongoose.Schema.Types.ObjectId, ref: Shop},
        barber_id : {type: mongoose.Schema.Types.ObjectId, ref: Barber},
        status : {type: String, default: "waiting"},
        rating : {type:Number,default:0},
        date:{type:Date,required:true}
    }
)

const CustomerOrder = mongoose.model("CustomerOrder", CustomerOrderSchema);
export default CustomerOrder;