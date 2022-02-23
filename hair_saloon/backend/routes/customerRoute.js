import express from 'express';
import { bookBarber } from '../controllers/barberController.js';
import { customerLogin,customerRegister} from '../controllers/customerController.js';
import { getOwner } from '../controllers/ownerController.js';
import { getlocation, listShops } from '../controllers/shopController.js';

const router = express.Router();

router.route("/customerLogin").post(customerLogin);
router.route("/customerRegister").post(customerRegister);
router.route("/listShops").post(listShops);
router.route("/getlocation").post(getlocation);
router.route("/getowner").post(getOwner);
router.route("/bookbarber").post(bookBarber);

export default router;
