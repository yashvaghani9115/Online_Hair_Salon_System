import mongoose from "mongoose";
import Barber from "./barberModel.js";
import Owner from "./ownerModel.js";
import Location  from "./locationModel.js";

const shopSchema = new mongoose.Schema(
    {
        shop_name: { type: String, required: true },
        address: { type: String, required: true },
        opening_time:{ type: String, required: true },
        closing_time:{ type: String, required: true },
        salon_gender_type : { type: String, required: true } ,
        capacity_seats : { type: Number, required: true },
        verified : {type:Boolean,required:true,default:false},
        owner_id : {type: mongoose.Schema.Types.ObjectId, ref: Owner},
        location_id:{type: mongoose.Schema.Types.ObjectId,ref:Location},
        barber_ids:[{type: mongoose.Schema.Types.ObjectId,ref:Barber}]
        
        //location_id:{type:String,required:true}
        // booked_seats :{ type: Number, required: true },
        
        // hair_service_id :  { type: String, required: true },
        // barber_id : { type: String, required: true }
    }
)

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;