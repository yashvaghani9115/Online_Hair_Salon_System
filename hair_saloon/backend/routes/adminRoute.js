import express from 'express';
import { adminLogin,approveRegistration,getAllRequest} from '../controllers/adminController.js';
const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/approveRegistration").post(approveRegistration);
router.route("/getlist").post(getAllRequest);

export default router;
