
import path from "path";
import { Router } from "express";
import { createError } from "../middleware/errorHandler";

const router = Router();

const frontendPath = path.join(
  __dirname,
  "../../../frontend/dist/frontend/browser/"
);

/**
 * @route GET /register
 * @desc Página de registro
 * @access Público
 */
router.get("/register", (req, res) => {
  try {
    res.sendFile(path.join(frontendPath, "index.html"));
  } catch (error) {
    console.error("Erro ao enviar o arquivo index.html:", error);
    throw createError("Erro interno no servidor", 500);
  }
});

/**
 * @route GET /login
 * @desc Página de login
 * @access Público
 */
router.get("/login", (req, res) => {
  try {
    res.sendFile(path.join(frontendPath, "index.html"));
  } catch (error) {
    console.error("Erro ao enviar o arquivo index.html:", error);
    throw createError("Erro interno no servidor", 500);
  }
});

export default router;
