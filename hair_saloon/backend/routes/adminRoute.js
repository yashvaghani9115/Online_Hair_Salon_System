import express from 'express';
import { adminLogin,approveRegistration} from '../controllers/adminController.js';
const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/approveRegistration").post(approveRegistration);

export default router;
