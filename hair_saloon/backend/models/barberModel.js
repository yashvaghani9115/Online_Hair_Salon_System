import mongoose from "mongoose";
import Customer from "./customerModel.js";

const barberSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile_num:{type: Number, required: true},
        email: { type: String, required: true, unique: true },
        customer_turn_number : {type:Number,default:0},
        customer_ids :[{type: mongoose.Schema.Types.ObjectId,ref:Customer}] 
    }
)

const Barber = mongoose.model("Barber", barberSchema);
export default Barber;