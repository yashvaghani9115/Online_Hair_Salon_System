import Service from "../models/hair_service.js";
import Shop from "../models/shopModel.js";

export const addService = async (req, res) => {
  try {
    const { service_name, price, gender_type, category, owner_id } = req.body;

    let service = await Service.create({ service_name: service_name, price: price, gender_type: gender_type, category: category });
    await Shop.updateOne(
      { owner_id: owner_id },
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
export const editservice = async (req,res)=>{
  try{
    console.log(req.body)
  const {_id , service_name,price,gender_type,category} = req.body
  let service = await Service.findOne({_id:_id});
    if(service){
      await service.set({service_name:service_name,price:price,gender_type:gender_type,category:category});
      await service.save();
      res.json({
        stat: true,
        message: "Edit Success!",
      });
    }else{
      res.json({
        stat: false,
        message: "Service not found!",
      });
    }
  }
  catch(e) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
}
export const deleteService = async (req, res) => {
  try {
    const { id,owner_id } = req.params;
    let shop = await Shop.findOne({owner_id:owner_id});
    console.log(id);
    await Service.deleteOne({_id:id});
    Shop.findByIdAndUpdate(shop._id,{$pull:{hair_service_id:id}},{ "new": true, "upsert": true },
        function (err, managerparent) {
            if (err) throw err;
            console.log(managerparent);
    });
    res.json({
      stat: true,
      message: "Delete success!"
    })
    
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
}
export const listServices = async (req, res) => {
  try {
    const { shop_id } = req.body;
    let shop_obj = await Shop.findById(shop_id);
    const service_ids = shop_obj.hair_service_id;
    let service_list = []
    for (let i = 0; i < service_ids.length; i++) {
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
