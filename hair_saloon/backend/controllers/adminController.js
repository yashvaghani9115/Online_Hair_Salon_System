import Admin from "../models/Admin.js";
import Owner from "../models/ownerModel.js";
import Shop from '../models/shopModel.js';
import dotenv from "dotenv";
dotenv.config()

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email, password: password });

    if (admin) {
      res.json({ stat: true, message: "Admin Logged in Sucessfully.", admin: admin });
    }
    else {
      res.json({ stat: false, message: "Invalid credentials, Admin not found !" });
    }
  }
  catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
}

export const approveRegistration = async (req, res) => {
  try {
    const { id, approve } = req.body;
    const shop_obj = await Shop.findOne({ _id: id });

    if (shop_obj) {
      if (approve == "Accept") {
        await shop_obj.set({ verified: approve });
        await shop_obj.save();
        res.json({ stat: true, message: "Registration is Approved." });

      } else {
        await shop_obj.set({ verified: approve });
        await shop_obj.save();
        res.json({ stat: true, message: "Registration is Rejected!" });
      }

    } else {
      res.json({ stat: false, message: "Registration not found on this id!" });
    }
  }
  catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
}
export const getFullListOfShopsWithOwners = async (req, res) => {
  try {
    const { verified } = req.body;
    const shoplist = await Shop.find({ verified: verified });
    let fullList = []
    for (let i = 0; i < shoplist.length; i++) {
      fullList.push({shop:shoplist[i],owner:await Owner.findById(shoplist[i].owner_id)});
    }
    const prefix_link = process.env.BEGIN_LINK + process.env.CLOUDINARY_NAME + process.env.SUB_FOLDER_PATH;
    if (shoplist.length != 0) {
      res.json({
        stat: true,
        fullList: fullList,
        prefix_link: prefix_link,
        message: "Shops List send successfully.",
      });
    } else {
      res.json({
        stat: false,
        message: "No Shops Found!",
      });
    }
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};