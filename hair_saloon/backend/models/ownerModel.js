import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile_num:{type: Number, required: true},
        email: { type: String, required: true, unique: true },
        password: { type:String, required: true },
        shop_id : { type:String}
    }
)


const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;