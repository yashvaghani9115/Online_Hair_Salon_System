import Service from "../models/hair_service.js";
import Shop from "../models/shopModel.js";

export const addService = async (req, res) => {
  try {
    const { service_name, price, gender_type, category,owner_id} = req.body;

    let service = await Service.create({service_name:service_name, price:price, gender_type:gender_type, category:category});
        await Shop.updateOne(
          { owner_id: owner_id._id},
          { $push: { hair_service_id: service._id } })
         
        res.json({
            stat: true,
            service: service,
            message: "Service Added!",
          });    
    
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};
export const getService =async(req,res) =>{
  try {
    const {shop} = req.body;
    console.log(shop);
    let shop_obj = await Shop.findById(shop._id);
    const service_ids = shop_obj.hair_service_id;
    console.log(service_ids)
    let service_list = []
    for(let i=0;i<service_ids.length;i++){
      service_list.push(await Service.findById(service_ids[i]));
    }
         
        res.json({
            stat: true,
            servicelist: service_list,
            message: "Founded",
          });    
    
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
}
