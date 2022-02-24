import express from 'express';
import { addBarber,barberList, deleteBarber, editBarber,listCustomers } from '../controllers/barberController.js';
import { ownerLogin,ownerRegister} from '../controllers/ownerController.js';
import {addShop ,editShop} from '../controllers/shopController.js';
import { addService, listServices,editservice,deleteService } from '../controllers/serviceController.js';
import { deleteorder, ordercomplete } from '../controllers/orderController.js';

const router = express.Router();

router.route("/ownerLogin").post(ownerLogin);
router.route("/ownerRegister").post(ownerRegister);
router.route("/addShop").post(addShop);
router.route("/editShop").post(editShop);
router.route("/addBarber").post(addBarber);
router.route("/editBarber").post(editBarber);
router.route("/deleteBarber/:id&:owner_id").delete(deleteBarber);
router.route("/listBarbers").post(barberList);
router.route("/addService").post(addService);

router.route("/editService").post(editservice);
router.route("/deleteService/:id&:owner_id").delete(deleteService);
router.route("/listServices").post(listServices);
router.route("/listCustomers").post(listCustomers);
router.route("/ordercomplete").post(ordercomplete);
router.route("/orderdelete").post(deleteorder);

export default router;
