import express from 'express';
import { AtendimentoController } from '../controllers/AtendimentoController';

const router = express.Router();

// Criar um novo atendimento
router.post('/criar', AtendimentoController.criar);

// Listar todos os atendimentos
router.get('/listar', AtendimentoController.listarTodos);

// Buscar um atendimento pelo ID
router.get('/buscar/:id', AtendimentoController.buscarPorId);

// Atualizar um atendimento existente
router.put('/atualizar/:id', AtendimentoController.atualizar);

// Remover um atendimento (exclusão lógica)
router.delete('/remover/:id', AtendimentoController.remover);

export default router;
