import { Request, Response } from 'express';
import { AlunoTecnologiaAssistivaRepository, IAlunoTecnologiaAssistiva } from "../models/AlunoTecnologiaAssistiva";
import { ResponseHandler } from '../utils/responseHandler';
import { asyncHandler } from '../utils/asyncHandler';

export class AlunoTecnologiaAssistivaController {
    static associar = asyncHandler(async (req: Request, res: Response) => {
        const associacao = await AlunoTecnologiaAssistivaRepository.criar(req.body);
        return ResponseHandler.criado(res, associacao);
    });

    static listarTodos = asyncHandler(async (req: Request, res: Response) => {
        const associacoes = await AlunoTecnologiaAssistivaRepository.listarTodos();
        return ResponseHandler.sucesso(res, associacoes);
    });

    static buscarPorId = asyncHandler(async (req: Request, res: Response) => {
        const associacao = await AlunoTecnologiaAssistivaRepository.buscarPorId(req.params.id);
        if (!associacao) {
            return ResponseHandler.naoEncontrado(res);
        }
        return ResponseHandler.sucesso(res, associacao);
    });

    static listarPorAluno = asyncHandler(async (req: Request, res: Response) => {
        const associacoes = await AlunoTecnologiaAssistivaRepository.listarPorAluno(req.params.alunoId);
        return ResponseHandler.sucesso(res, associacoes);
    });

    static listarPorTecnologia = asyncHandler(async (req: Request, res: Response) => {
        const associacoes = await AlunoTecnologiaAssistivaRepository.listarPorTecnologia(req.params.tecnologiaId);
        return ResponseHandler.sucesso(res, associacoes);
    });

    static remover = asyncHandler(async (req: Request, res: Response) => {
        const removido = await AlunoTecnologiaAssistivaRepository.remover(req.params.id);
        if (!removido) {
            return ResponseHandler.naoEncontrado(res);
        }
        return ResponseHandler.sucesso(res, undefined, 'Associação removida com sucesso', 204);
    });

    static removerPorAluno = asyncHandler(async (req: Request, res: Response) => {
        await AlunoTecnologiaAssistivaRepository.removerPorAluno(req.params.alunoId);
        return ResponseHandler.sucesso(res, undefined, 'Associações do aluno removidas com sucesso', 204);
    });

    static removerPorTecnologia = asyncHandler(async (req: Request, res: Response) => {
        await AlunoTecnologiaAssistivaRepository.removerPorTecnologia(req.params.tecnologiaId);
        return ResponseHandler.sucesso(res, undefined, 'Associações da tecnologia removidas com sucesso', 204);
    });
}