import mongoose from "mongoose";
import Barber from "./barberModel.js";
import Location  from "./locationModel.js";
import Owner from "./ownerModel.js";
import Service from "./hair_service.js";

const shopSchema = new mongoose.Schema(
    {
        shop_name: { type: String, required: true },
        address: { type: String, required: true },
        opening_time:{ type: String, required: true },
        closing_time:{ type: String, required: true },
        salon_gender_type : { type: String, required: true } ,
        capacity_seats : { type: Number, required: true },
        verified : {type:String,required:true,default:"pending"},
        location_id:{type: mongoose.Schema.Types.ObjectId,ref:Location},
        barber_ids:[{type: mongoose.Schema.Types.ObjectId,ref:Barber}],
        owner_id : {type: mongoose.Schema.Types.ObjectId, ref: Owner},
        hair_service_id :  [{ type:  mongoose.Schema.Types.ObjectId, ref: Service }],
        images_pub_ids : [] //public ids of images stored on cloudinary

        //location_id:{type:String,required:true}
        // booked_seats :{ type: Number, required: true },
        
        // barber_id : { type: String, required: true }
    }
)

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;