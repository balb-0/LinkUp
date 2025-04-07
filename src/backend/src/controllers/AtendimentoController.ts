import { Request, Response, NextFunction } from 'express';
import { AtendimentoRepository } from '../models/Atendimento';
import { ResponseHandler } from '../utils/responseHandler'; 
import { asyncHandler } from '../utils/asyncHandler'; 
import AlunoService from '../services/AlunoService';


export class AtendimentoController {
    static criar = asyncHandler(async (req: Request, res: Response) => {
        console.log('Dados recebidos para criar atendimento:', req.body);

        const atendimento = await AtendimentoRepository.criar(req.body);
        return ResponseHandler.criado(res, atendimento);
    });

    static listarTodos = asyncHandler(async (req: Request, res: Response) => {
        const atendimentos = await AtendimentoRepository.listarTodos();
        return ResponseHandler.sucesso(res, atendimentos);
    });

    static buscarPorId = asyncHandler(async (req: Request, res: Response) => {
        const atendimento = await AtendimentoRepository.buscarPorId(req.params.id);
        if (!atendimento) {
            return ResponseHandler.naoEncontrado(res);
        }
        return ResponseHandler.sucesso(res, atendimento);
    });

    static atualizar = asyncHandler(async (req: Request, res: Response) => {
        const atendimentoAtualizado = await AtendimentoRepository.atualizar(req.params.id, req.body);
        if (!atendimentoAtualizado) {
            return ResponseHandler.naoEncontrado(res);
        }
        return ResponseHandler.sucesso(res, atendimentoAtualizado);
    });

    static remover = asyncHandler(async (req: Request, res: Response) => {
        const removido = await AtendimentoRepository.remover(req.params.id);
        if (!removido) {
            return ResponseHandler.naoEncontrado(res);
        }
        return ResponseHandler.sucesso(res, undefined, 'Atendimento removido com sucesso', 204);
    });

    static listarAtendimentosPorTotalDeAlunos = asyncHandler(async (req: Request, res: Response) => {
        const institutionId = req.query.institutionId as string;
        
        if (!institutionId) {
            return ResponseHandler.erro(res, "ID da instituição é obrigatório", 400);
        }

        // Busca total de alunos da instituição
        const students = await AlunoService.getStudentsByInstitution(institutionId);
        const totalAlunos = students.length;

        // Busca total de alunos atendidos
        const { total_alunos_atendidos } = await AtendimentoRepository.listarAtendimentosPorTotalDeAlunos();

        return ResponseHandler.sucesso(res, {
            total_alunos: totalAlunos,
            total_alunos_atendidos: total_alunos_atendidos
        });
    });
}