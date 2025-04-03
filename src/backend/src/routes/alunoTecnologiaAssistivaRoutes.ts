import express from 'express';
import { AlunoTecnologiaAssistivaController } from '../controllers/AlunoTecnologiaAssistivaController';

const router = express.Router();

// Associar uma tecnologia assistiva a um aluno
router.post('/alunos/tecnologias/associar', AlunoTecnologiaAssistivaController.associar);

// Listar todas as associações
router.get('/alunos/tecnologias', AlunoTecnologiaAssistivaController.listarTodos);

// Buscar uma associação pelo ID
router.get('/alunos/tecnologias/:id', AlunoTecnologiaAssistivaController.buscarPorId);

// Listar tecnologias de um aluno
router.get('/alunos/:alunoId/tecnologias', AlunoTecnologiaAssistivaController.listarPorAluno);

// Listar alunos que usam uma tecnologia
router.get('/tecnologias/:tecnologiaId/alunos', AlunoTecnologiaAssistivaController.listarPorTecnologia);

// Remover uma associação
router.delete('/alunos/tecnologias/:id', AlunoTecnologiaAssistivaController.remover);

// Remover todas as associações de um aluno
router.delete('/alunos/:alunoId/tecnologias', AlunoTecnologiaAssistivaController.removerPorAluno);

// Remover todas as associações de uma tecnologia
router.delete('/tecnologias/:tecnologiaId/alunos', AlunoTecnologiaAssistivaController.removerPorTecnologia);

export default router;