import express from "express";
import { register } from "../controllers/userController";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/register", register);

export default router;