import Shop from "../models/shopModel.js";
import Location from "../models/locationModel.js";

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
        const { shop_name, address, opening_time, closing_time, salon_gender_type, capacity_seats, longitude, latitude, owner_id } = req.body;
        const res_location_obj = await Location.create({ longitude: longitude, latitude: latitude });
        const result = await Shop.create({ shop_name: shop_name, address: address, opening_time: opening_time, closing_time: closing_time, salon_gender_type: salon_gender_type, capacity_seats: capacity_seats, owner_id: owner_id, location_id: res_location_obj._id });

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
        const userLon = lon;
        const userLat = lat;
        const Locations = await Location.find({});
        let NearbyLocations = [];
        let shopList = [];
        Locations.forEach((loc) => {

            if (distance(userLat, userLon, loc.latitude, loc.longitude, "K") < 50) {
                NearbyLocations.push(loc);
                let tmp = shops.filter((s) =>
                    loc._id.equals(s.location_id)
                )[0]

                if(tmp)
                {
                    shopList.push(tmp)
                }

            }
        })
        res.json({ stat: true, shops: shopList, message: "Shop list." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
}