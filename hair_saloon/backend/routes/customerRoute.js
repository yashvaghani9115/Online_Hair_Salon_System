import express from 'express';
import { customerLogin,customerRegister} from '../controllers/customerController.js';
const router = express.Router();

router.route("/customerLogin").post(customerLogin);
router.route("/customerRegister").post(customerRegister);

export default router;
