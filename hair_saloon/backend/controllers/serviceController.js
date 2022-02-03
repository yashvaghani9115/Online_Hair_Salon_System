import Service from "../models/hair_service.js";
import Shop from "../models/shopModel.js";

export const addService = async (req, res) => {
  try {
    const { service_name, price, gender_type, category} = req.body;

    let service = await Service.findOne({service_name:service_name,gender_type:gender_type});
    
    if(service){
        res.json({
            stat: false,
            message: "Provided service already Exist!",
          });
    }else{
        service = await Service.create({service_name:service_name, price:price, gender_type:gender_type, category:category});
        // let shop = Shop.updateOne({_id:shop_id},{$push:{hair_service_id:service._id}});
         
        res.json({
            stat: true,
            service: service,
            message: "Service Added!",
          });
    }

    
    
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};
