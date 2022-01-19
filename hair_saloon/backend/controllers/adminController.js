import Admin from "../models/Admin.js";
import Approval from "../models/approvalMng.js";

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
        const {owner_id ,shop_id} = req.body;
        const approval = await Approval.findOne({owner_id,shop_id});
        if(approval){
            approval.set({status : true});
            await approval.save();
            res.json({ stat:true, message: "Registration is Approved." ,approval:approval});
        }else{
            res.json({ stat: false, message: "Registration not found on this id!" });
        }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}