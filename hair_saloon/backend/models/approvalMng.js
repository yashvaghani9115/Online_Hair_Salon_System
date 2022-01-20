import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
    {
        owner_id : {type:String,required:true},
        shop_id:{type:String,required:true},
        status : {type:Boolean,required:true,default:false}
    }
)


const Approval = mongoose.model("Approval", approvalSchema);
export default Approval;