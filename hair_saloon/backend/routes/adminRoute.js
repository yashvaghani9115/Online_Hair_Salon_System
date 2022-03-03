import express from 'express';
import { adminLogin,approveRegistration,getFullListOfShopsWithOwners} from '../controllers/adminController.js';
const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/approveRegistration").post(approveRegistration);
router.route("/getFullList").post(getFullListOfShopsWithOwners);

export default router;
