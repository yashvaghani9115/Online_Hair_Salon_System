import express from 'express';
import { ownerLogin,ownerRegister} from '../controllers/ownerController.js';
import {addShop} from '../controllers/shopController.js';

const router = express.Router();

router.route("/ownerLogin").post(ownerLogin);
router.route("/ownerRegister").post(ownerRegister);
router.route("/addshop").post(addShop);

export default router;
