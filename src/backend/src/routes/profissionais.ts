import { Router } from "express";
import { ProfissionalController } from "../controllers/ProfissionalController";
import { validate, commonValidations } from "../middleware/validator";
import { clearCache } from "../middleware/cache";

const router = Router();



/**
 * @route GET /profissionais/ListarTodos
 * @desc Lista todos os profissionais cadastrados
 * @access Público
 */
router.get("/ListarTodos", ProfissionalController.listarTodos);

/**
 * @route GET /profissionais/BuscarPorId/:id
 * @desc Busca um profissional pelo ID
 * @access Público
 */
router.get("/BuscarPorId/:id", ProfissionalController.buscarPorId);

/**
 * @route POST /profissionais/Criar
 * @desc Cria um novo profissional
 * @access Público
 */
router.post("/Criar", 
  validate({
    nome: { 
      required: true, 
      type: 'string', 
      minLength: 3,
      message: 'Nome deve ter pelo menos 3 caracteres'
    },
    email: { 
      required: true, 
      type: 'string',
      pattern: commonValidations.email.pattern,
      message: commonValidations.email.message
    },
    ocupacao: { 
      required: true, 
      type: 'string',
      minLength: 2,
      message: 'Ocupação deve ter pelo menos 2 caracteres'
    }
  }),
  ProfissionalController.criar,
  // Limpa o cache após criar um novo profissional
  (req, res, next) => {
    clearCache('/profissionais/ListarTodos');
    next();
  }
);

/**
 * @route PUT /profissionais/Atualizar/:id
 * @desc Atualiza um profissional existente
 * @access Público
 */
router.put("/Atualizar/:id", 
  validate({
    nome: { 
      type: 'string', 
      minLength: 3,
      message: 'Nome deve ter pelo menos 3 caracteres'
    },
    email: { 
      type: 'string',
      pattern: commonValidations.email.pattern,
      message: commonValidations.email.message
    },
    ocupacao: { 
      type: 'string',
      minLength: 2,
      message: 'Ocupação deve ter pelo menos 2 caracteres'
    }
  }),
  ProfissionalController.atualizar,
  // Limpa o cache após atualizar um profissional
  (req, res, next) => {
    clearCache('/profissionais/ListarTodos');
    clearCache(`/profissionais/BuscarPorId/${req.params.id}`);
    next();
  }
);

/**
 * @route DELETE /profissionais/Remover/:id
 * @desc Remove um profissional
 * @access Público
 */
router.delete("/Remover/:id", 
  ProfissionalController.remover,
  // Limpa o cache após remover um profissional
  (req, res, next) => {
    clearCache('/profissionais/ListarTodos');
    clearCache(`/profissionais/BuscarPorId/${req.params.id}`);
    next();
  }
);

export default router;