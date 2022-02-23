import express from 'express';
import { customerLogin,customerRegister} from '../controllers/customerController.js';
import { getlocation, listShops } from '../controllers/shopController.js';

const router = express.Router();

router.route("/customerLogin").post(customerLogin);
router.route("/customerRegister").post(customerRegister);
router.route("/listShops").post(listShops);
router.route("/getlocation").post(getlocation);

export default router;
