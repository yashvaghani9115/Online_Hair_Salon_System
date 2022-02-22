import Shop from "../models/shopModel.js";
import Location from "../models/locationModel.js";
import cloudinary from "../cloudinary/config.js";
import dotenv from 'dotenv';
dotenv.config();

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
        
        res.json({ stat: true, shop: result, message: "Shop Added sucessfully." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const editShop = async (req, res) => {
    try {
        const { shop_id, ...remaining_data } = req.body;
        const resp = await Shop.findByIdAndUpdate(shop_id, ...remaining_data);
        res.json({ stat: true, message: "Shop details updated successfully!." });
    }
    catch (err) {
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
        
        //generating prefix link for images
        const prefix_link = process.env.BEGIN_LINK + process.env.CLOUDINARY_NAME + process.env.SUB_FOLDER_PATH;
        
        res.json({ stat: true, shops: shopList,prefix_link:prefix_link, message: "Shop list." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}