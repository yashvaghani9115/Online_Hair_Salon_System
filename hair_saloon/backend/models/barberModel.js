import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile_num:{type: Number, required: true},
        email: { type: String, required: true, unique: true },
        // shop_id : { type:String, required: true },
        book_status : {type:Boolean,required:true}
    }
)


const Barber = mongoose.model("Barber", barberSchema);
export default Barber;