import { Router } from "express";
import { register } from "../controllers/UserController";
import { validateRegister } from "../middleware/validator";

const router = Router();

/**
 * @route POST /auth/register
 * @desc Registra um novo usuário
 * @access Público
 */
router.post("/register", validateRegister, register);

export default router;