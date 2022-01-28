import mongoose from "mongoose";
import Location from './locationModel.js';

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile_num:{type: Number, required: true},
        email: { type: String, required: true, unique: true },
        password: { type:String, required: true }
        // location_id:{type: mongoose.Schema.Types.ObjectId, ref: Location}
    }
)


const Customer = mongoose.model("Customer", customerSchema);
export default Customer;