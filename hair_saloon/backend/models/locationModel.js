import mongoose from "mongoose";

const locatoinSchema = new mongoose.Schema(
    {
        //location_id as PK
        longitude :{type: String, required: true },
        latitude:{type: String, required: true }
    }
)


const Location = mongoose.model("Location", locationSchema);
export default Location;