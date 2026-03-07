import express from "express";
import {getAllUsers} from "../controller/userController.js";
import {Protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

//get alll users
router.get("/allUsers",getAllUsers);

export default router;