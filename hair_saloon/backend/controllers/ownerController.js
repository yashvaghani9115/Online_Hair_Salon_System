import Owner from "../models/ownerModel.js";
import Shop from "../models/shopModel.js";

export const ownerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const owner = await Owner.findOne({ email: email, password: password });
    if (owner) {
      const shop = await Shop.findOne({owner_id : owner._id});
      res.json({
        stat: true,
        message: "Owner Logged in Sucessfully.",
        owner: owner,
        shop:shop
      });
    } else {
      res.json({
        stat: false,
        message: "Invalid credentials, Owner not found !",
      });
    }
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};

export const ownerRegister = async (req, res) => {
  try {
    const { name, mobile_num, email, password } = req.body;
    const alreadyOwner = await Owner.findOne({ email: email });
    if (alreadyOwner) {
      res.json({
        stat: false,
        message: "Provided email-adress is already used.",
      });
    } else {
      const result = await Owner.create({
        name: name,
        email: email,
        mobile_num: mobile_num,
        shop_id: "",
        password: password,
      });
      res.json({
        stat: true,
        owner: result,
        message: "Owner registered sucessfully.",
      });
    }
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};

