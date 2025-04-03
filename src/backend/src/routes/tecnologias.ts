import { Router } from "express";
import { TecnologiaAssistivaController } from "../controllers/TecnologiaAssistivaController";
import { validate } from "../middleware/validator";
import { clearCache } from "../middleware/cache";

const router = Router();

/**
 * @route POST /tecnologias/limpar-cache
 * @desc Limpa o cache das tecnologias assistivas
 * @access Público
 */
router.post("/tecnologias/limpar-cache", (req, res) => {
  try {
    // Limpa o cache da lista de tecnologias
    clearCache('/tecnologias/listarTodos');
    
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
 * @route GET /tecnologias/listarTodos
 * @desc Lista todas as tecnologias assistivas cadastradas
 * @access Público
 */
router.get("/tecnologias/listarTodos", TecnologiaAssistivaController.listarTodos);

/**
 * @route GET /tecnologias/buscarPorId/:id
 * @desc Busca uma tecnologia assistiva pelo ID
 * @access Público
 */
router.get("/tecnologias/buscarPorId/:id", TecnologiaAssistivaController.buscarPorId);

/**
 * @route POST /tecnologias/criar
 * @desc Cria uma nova tecnologia assistiva
 * @access Público
 */
router.post("/tecnologias/criar", 
  validate({
    nome: { 
      required: true, 
      type: 'string', 
      minLength: 2,
      message: 'Nome deve ter pelo menos 2 caracteres'
    }
  }),
  TecnologiaAssistivaController.criar,
  // Limpa o cache após criar uma nova tecnologia
  (req, res, next) => {
    clearCache('/tecnologias/listarTodos');
    next();
  }
);

/**
 * @route PUT /tecnologias/atualizar/:id
 * @desc Atualiza uma tecnologia assistiva existente
 * @access Público
 */
router.put("/tecnologias/atualizar/:id", 
  validate({
    nome: { 
      required: true,
      type: 'string', 
      minLength: 2,
      message: 'Nome deve ter pelo menos 2 caracteres'
    }
  }),
  TecnologiaAssistivaController.atualizar,
  // Limpa o cache após atualizar uma tecnologia
  (req, res, next) => {
    clearCache('/tecnologias/listarTodos');
    clearCache(`/tecnologias/buscarPorId/${req.params.id}`);
    next();
  }
);

/**
 * @route DELETE /tecnologias/remover/:id
 * @desc Remove uma tecnologia assistiva
 * @access Público
 */
router.delete("/tecnologias/remover/:id", 
  TecnologiaAssistivaController.remover,
  // Limpa o cache após remover uma tecnologia
  (req, res, next) => {
    clearCache('/tecnologias/listarTodos');
    clearCache(`/tecnologias/buscarPorId/${req.params.id}`);
    next();
  }
);

export default router;