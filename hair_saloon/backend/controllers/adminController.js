import Admin from "../models/Admin.js";
import Owner from "../models/ownerModel.js";
import Shop from '../models/shopModel.js';

export const adminLogin = async (req, res) => {
    try {
            const {email,password} = req.body;
            
            const admin = await Admin.findOne({email:email,password:password});

            if (admin) {
                res.json({ stat: true, message: "Admin Logged in Sucessfully.", admin: admin });
            }
            else {
                res.json({ stat: false, message: "Invalid credentials, Admin not found !" });
            }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const approveRegistration = async (req,res) => {
    try{
        const {id,approve} = req.body;
        const shop_obj = await Shop.findOne({_id:id});
        
        if(shop_obj){
            if(approve == "Accept"){
              await shop_obj.set({verified : approve});
              await shop_obj.save();
              res.json({ stat:true, message: "Registration is Approved." });

            }else{
              await shop_obj.set({verified:approve});
              await shop_obj.save();
              res.json({ stat:true, message: "Registration is Rejected!" });
            }
           
        }else{
            res.json({ stat: false, message: "Registration not found on this id!" });
        }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}
export const getAllRequest = async (req, res) => {
    try {
        const {verified} = req.body;
      const shoplist = await Shop.find({verified:verified});
      let ownerlist = []
      for(let i=0;i<shoplist.length;i++){
        // console.log(shop.owner_id);
        ownerlist.push((await Owner.findById(shoplist[i].owner_id)))
      }
      // console.log(detailslist);
      if (shoplist.length != 0) {
        res.json({
          stat: true,
          shoplist: shoplist,
          ownerlist :ownerlist,
          message: "shop found!",
        });
      } else {
        res.json({
          stat: false,
          message: "No Shop Found!",
        });
      }
    } catch (err) {
      res.json({ wentWrong: true, message: "Something went wrong !" });
      console.log(err.message);
    }
  };