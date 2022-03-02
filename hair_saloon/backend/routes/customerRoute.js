import express from 'express';
import { bookBarber } from '../controllers/barberController.js';
import { customerLogin,customerRegister, sendMail} from '../controllers/customerController.js';
import { orderList, updateRating } from '../controllers/orderController.js';
import { getOwner } from '../controllers/ownerController.js';
import { getlocation, listShops } from '../controllers/shopController.js';

const router = express.Router();

router.route("/customerLogin").post(customerLogin);
router.route("/customerRegister").post(customerRegister);
router.route("/sendmail").post(sendMail);
router.route("/listShops").post(listShops);
router.route("/getlocation").post(getlocation);
router.route("/getowner").post(getOwner);
router.route("/bookbarber").post(bookBarber);
router.route("/listorders").post(orderList);
router.route("/updateRating").post(updateRating);

export default router;
