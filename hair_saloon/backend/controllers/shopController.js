import Shop from "../models/shopModel.js";
import Owner from "../models/ownerModel.js";

export const addShop = async (req, res) => {
    try {
            const {shop_name,address,opening_time,closing_time,salon_gender_type,capacity_seats,owner_id} = req.body;
            const result = await Shop.create({shop_name:shop_name,address:address,opening_time:opening_time,closing_time:closing_time,salon_gender_type:salon_gender_type,capacity_seats:capacity_seats,location_id:""});
           
            //saving shop_id in owner model
            const res_own = await Owner.findById(owner_id);
            res_own.set({shop_id:result._id});
            await res_own.save();

            res.json({ stat: true,shop:result, message: "Shop Added sucessfully." });
            
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

