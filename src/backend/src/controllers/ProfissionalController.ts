import { Request, Response } from "express";
import { ProfissionalRepository, IProfissional } from "../models/Profissional";
import { ResponseHandler } from "../utils/responseHandler";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

export class ProfissionalController {

  /**
   * Lista todos os profissionais
   * @route GET /profissionais/ListarTodos
   */
  static listarTodos = asyncHandler(async (req: Request, res: Response) => {
    const profissionais = await ProfissionalRepository.listarTodos();
    return ResponseHandler.sucesso(res, profissionais, "Profissionais listados com sucesso");
  });

  /**
   * Busca um profissional pelo ID
   * @route GET /profissionais/BuscarPorId/:id
   */
  static buscarPorId = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError("ID do profissional não fornecido", 400);
    }

    const profissional = await ProfissionalRepository.buscarPorId(id);
    
    if (!profissional) {
      return ResponseHandler.naoEncontrado(res, "Profissional não encontrado");
    }

    return ResponseHandler.sucesso(res, profissional, "Profissional encontrado com sucesso");
  });

  /**
   * Cria um novo profissional
   * @route POST /profissionais/Criar
   */
  static criar = asyncHandler(async (req: Request, res: Response) => {
    const dadosProfissional: IProfissional = req.body;
    
    // A validação dos campos obrigatórios agora é feita pelo middleware de validação
    // e a validação de email também

    try {
      const novoProfissional = await ProfissionalRepository.criar(dadosProfissional);
      return ResponseHandler.criado(res, novoProfissional, "Profissional criado com sucesso");
    } catch (error) {
      // O repositório já trata erros específicos como email duplicado
      throw error;
    }
  });

  /**
   * Atualiza um profissional existente
   * @route PUT /profissionais/Atualizar/:id
   */
  static atualizar = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const dadosAtualizados: Partial<IProfissional> = req.body;
    
    if (!id) {
      throw createError("ID do profissional não fornecido", 400);
    }

    try {
      const profissionalAtualizado = await ProfissionalRepository.atualizar(id, dadosAtualizados);
      
      if (!profissionalAtualizado) {
        return ResponseHandler.naoEncontrado(res, "Profissional não encontrado");
      }
      
      return ResponseHandler.sucesso(
        res, 
        profissionalAtualizado, 
        "Profissional atualizado com sucesso"
      );
    } catch (error) {
      // O repositório já trata erros específicos como email duplicado
      throw error;
    }
  });

  /**
   * Remove um profissional
   * @route DELETE /profissionais/Remover/:id
   */
  static remover = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError("ID do profissional não fornecido", 400);
    }

    const removido = await ProfissionalRepository.remover(id);
    
    if (!removido) {
      return ResponseHandler.naoEncontrado(res, "Profissional não encontrado");
    }

    return ResponseHandler.sucesso(res, null, "Profissional removido com sucesso");
  });
} 