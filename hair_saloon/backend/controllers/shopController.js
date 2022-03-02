import dotenv from 'dotenv';
dotenv.config();
import Shop from "../models/shopModel.js";
import Location from "../models/locationModel.js";
import cloudinary from "../cloudinary/config.js";
import Owner from "../models/ownerModel.js";

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    // if (unit=="N") { dist = dist * 0.8684 }
    return dist;
}

export const addShop = async (req, res) => {
    try {
        const { shop_name, address, opening_time, closing_time, salon_gender_type, capacity_seats, longitude, latitude, owner_id,encoded_images } = req.body;
        
        //uploading images to cloudinary and getting public ids of images
        let generated_public_ids = [];
        for(let i=0;i<encoded_images.length; i++)
        {
            const uploadResponse = await cloudinary.uploader.upload(encoded_images[i], {
                upload_preset: 'ml_default',
            });
            generated_public_ids.push(uploadResponse.public_id);
        }       
        const res_location_obj = await Location.create({ longitude: longitude, latitude: latitude });
        const result = await Shop.create({ shop_name: shop_name, address: address, opening_time: opening_time, closing_time: closing_time, salon_gender_type: salon_gender_type, capacity_seats: capacity_seats, owner_id: owner_id, location_id: res_location_obj._id ,images_pub_ids:generated_public_ids});
        await Owner.findByIdAndUpdate(owner_id,{shopRegisterFlag:true})
        res.json({ stat: true, shop: result, message: "Shop Added sucessfully." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const editShop = async (req, res) => {
    try {
        const {shop_id, shop_name, address, opening_time, closing_time, salon_gender_type, capacity_seats, longitude, latitude, loc_id,index_images_to_delete, images_to_add } = req.body;
        const shop = await Shop.findById(shop_id);
          
        //updating location
        const upd_location_obj = await Location.findByIdAndUpdate(loc_id,{ longitude: longitude, latitude: latitude });     
        
        //deleting selected images
        let images_ids_array = shop.images_pub_ids;

        //sorting in descending
        index_images_to_delete.sort( (a, b)=> {return b-a;});
        for(let i=0; i<index_images_to_delete.length; i++)
        {
            let pub_id = images_ids_array.splice(index_images_to_delete[i],1)[0];
            await cloudinary.uploader.destroy(pub_id);
        }

        // uploading new images
        for(let i=0;i<images_to_add.length; i++)
        {
            const uploadResponse = await cloudinary.uploader.upload(images_to_add[i], {
                upload_preset: 'ml_default',
            });
            images_ids_array.push(uploadResponse.public_id);
        }
        let status= "";
        if(shop.verified=="Reject")
        {
            status="pending";
        }
        else 
        {
            status = shop.verified;
        }
        await shop.set({shop_name:shop_name, address:address, opening_time:opening_time, closing_time:closing_time, salon_gender_type:salon_gender_type,verified:status, capacity_seats:capacity_seats,images_pub_ids:images_ids_array});   
        await shop.save();
        res.json({ stat: true,shop:shop ,message: "Shop details updated successfully!." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}
export const getlocation = async (req,res)=>{
    try{
        const {loc_id} = req.body;
        const location = await Location.findById(loc_id);
        if(location){
            res.json({ stat: true,location:location, message: "location" });
             
        }else{
            res.json({
                stat:false,
                message:"Location Not Found"
            });
        }
    }
    catch(err){
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}
export const listShops = async (req, res) => {
    try {
        const { lon, lat } = req.body;
        const shops = await Shop.find({verified:"Accept"});
        const shopList = [];

        for(let i=0;i<shops.length;i++){
            const loc = await Location.findById(shops[i].location_id);
            if(loc && distance(lat, lon, loc.latitude,loc.longitude, "K")<50) {
                shopList.push(shops[i]);
            }
        }
        shopList.sort((a, b)=> {return b.avg_rating-a.avg_rating;});
        //generating prefix link for images
        const prefix_link = process.env.BEGIN_LINK + process.env.CLOUDINARY_NAME + process.env.SUB_FOLDER_PATH;
        
        res.json({ stat: true, shops: shopList,prefix_link:prefix_link, message: "Shop list." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}