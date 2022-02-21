import express from 'express';
import { addBarber,barberList, deleteBarber, editBarber } from '../controllers/barberController.js';
import { ownerLogin,ownerRegister} from '../controllers/ownerController.js';
import {addShop} from '../controllers/shopController.js';
import { addService, listServices } from '../controllers/serviceController.js';

const router = express.Router();

router.route("/ownerLogin").post(ownerLogin);
router.route("/ownerRegister").post(ownerRegister);
router.route("/addShop").post(addShop);
router.route("/addBarber").post(addBarber);
router.route("/editBarber").post(editBarber);
router.route("/deleteBarber/:id&:owner_id").delete(deleteBarber);
router.route("/listBarbers").post(barberList);
router.route("/addService").post(addService);
router.route("/listServices").post(listServices);

//getlist
//getService
export default router;
