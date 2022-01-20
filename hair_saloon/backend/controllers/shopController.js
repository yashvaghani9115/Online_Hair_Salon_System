import Shop from "../models/shopModel.js";
import Location from "../models/locationModel.js";

export const addShop = async (req, res) => {
    try {
            const {shop_name,address,opening_time,closing_time,salon_gender_type,capacity_seats,longitude,latitude,owner_id} = req.body;
            const res_location_obj = await Location.create({longitude:longitude,latitude:latitude});
            const result = await Shop.create({shop_name:shop_name,address:address,opening_time:opening_time,closing_time:closing_time,salon_gender_type:salon_gender_type,capacity_seats:capacity_seats,owner_id:owner_id,location_id:res_location_obj._id});
            
            //saving  in owner model
            // const res_own = await Owner.findById(owner_id);
            // res_own.set({shop_id:result._id});
            // await res_own.save();
            res.json({ stat: true,shop:result, message: "Shop Added sucessfully." });      
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const editShop = async (req,res)=>{
    try{
        const {shop_id,...remaining_data} = req.body;
        const resp = await Shop.findByIdAndUpdate(shop_id, ...remaining_data);
        res.json({stat:true,message:"Shop details updated successfully!."});
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}