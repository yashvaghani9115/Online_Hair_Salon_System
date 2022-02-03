import express from 'express';
import { ownerLogin,ownerRegister} from '../controllers/ownerController.js';
import {addShop} from '../controllers/shopController.js';
import { addService } from '../controllers/serviceController.js';

const router = express.Router();

router.route("/ownerLogin").post(ownerLogin);
router.route("/ownerRegister").post(ownerRegister);
router.route("/addShop").post(addShop);
router.route("/addService").post(addService);

export default router;
