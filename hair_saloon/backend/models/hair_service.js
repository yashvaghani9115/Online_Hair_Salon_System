import mongoose from "mongoose";

const hairServiceSchema = new mongoose.Schema(
    {
        //id auto generated object id
        service_name: { type: String, required: true },
        price:{type: Number, required: true},
        gender_type: { type: Boolean, required: true },//t : male,f:female
        category : {type:String , required:true},
        // shop_id : {type: mongoose.Schema.Types.ObjectId,ref:Shop}
    }
)

const Service = mongoose.model("hairService", hairServiceSchema);
export default Service;