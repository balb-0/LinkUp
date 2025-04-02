import express from 'express';
import { AtendimentoController } from '../controllers/AtendimentoController';


const router = express.Router();


// Rota para obter dados de atendimentos por aluno para o gráfico
router.get('/alunos-atendidos', AtendimentoController.listarAtendimentosPorTotalDeAlunos);

export default router;

