import { Router } from "express";
import { register } from "../controllers/userController";
import { validate, commonValidations } from "../middleware/validator";

const router = Router();

/**
 * @route POST /auth/register
 * @desc Registra um novo usuário
 * @access Público
 */
router.post("/register", 
  validate({
    nome: { 
      required: true, 
      type: 'string', 
      minLength: 3,
      maxLength: 100,
      message: 'Nome deve ter entre 3 e 100 caracteres'
    },
    email: { 
      required: true, 
      type: 'string',
      pattern: commonValidations.email.pattern,
      message: commonValidations.email.message
    },
    senha: {
      required: true,
      type: 'string',
      minLength: 6,
      message: 'Senha deve ter pelo menos 6 caracteres'
    },
    cargo: {
      required: true,
      type: 'string',
      message: 'Cargo é obrigatório'
    }
  }),
  register
);

export default router;