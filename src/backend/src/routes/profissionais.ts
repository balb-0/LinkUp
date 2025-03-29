import { Router } from "express";
import { ProfissionalController } from "../controllers/ProfissionalController";
import { validate, commonValidations } from "../middleware/validator";
import { clearCache } from "../middleware/cache";

const router = Router();

/**
 * @route POST /profissionais/limpar-cache
 * @desc Limpa o cache dos profissionais
 * @access Público
 */
router.post("/limpar-cache", (req, res) => {
  try {
    // Limpa o cache da lista de profissionais
    clearCache('/profissionais/ListarTodos');
    
    // Retorna sucesso
    res.status(200).json({ 
      success: true,
      message: 'Cache limpo com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao limpar cache',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

/**
 * @route GET /profissionais/ListarTodos
 * @desc Lista todos os profissionais cadastrados
 * @access Público
 */
router.get("/ListarTodos", ProfissionalController.listarTodos);

/**
 * @route GET /profissionais/ListarPaginado
 * @desc Lista profissionais cadastrados com paginação
 * @access Público
 */
router.get("/ListarPaginado", ProfissionalController.listarPaginado);

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