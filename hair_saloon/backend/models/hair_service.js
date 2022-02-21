import mongoose from "mongoose";

const hairServiceSchema = new mongoose.Schema(
    {
        service_name: { type: String, required: true },
        price:{type: Number, required: true},
        gender_type: { type: Boolean, required: true },//t : male,f:female
        category : {type:String , required:true},
    }
)

const Service = mongoose.model("hairService", hairServiceSchema);
export default Service;