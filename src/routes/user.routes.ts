import express from 'express';
import * as UserControllers from '../controllers/user.controller'
import { checkAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/me", checkAuth, UserControllers.getUserInfo);
router.post("/register", UserControllers.register);
router.put("/me", UserControllers.updateUserInfo);
//mettere userid
router.get("/:userId/flowsId", checkAuth, UserControllers.getUserFlowsId);

export default router;