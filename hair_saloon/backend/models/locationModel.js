import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        //location_id as PK
        longitude :{type: Number, required: true },
        latitude:{type: Number, required: true }
    }
)

const Location = mongoose.model("Location", locationSchema);
export default Location;