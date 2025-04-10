import { Request, Response, NextFunction } from 'express';
import { AtendimentoRepository } from '../models/Atendimento';
import { ResponseHandler } from '../utils/responseHandler'; 
import { asyncHandler } from '../utils/asyncHandler'; 

export class AtendimentoController {
    static criar = asyncHandler(async (req: Request, res: Response) => {
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
}