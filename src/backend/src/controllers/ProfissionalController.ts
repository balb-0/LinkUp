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
    const profissionais = ProfissionalRepository.listarTodos();
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

    const profissional = ProfissionalRepository.buscarPorId(id);
    
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
    
    // Validação dos campos obrigatórios
    if (!dadosProfissional.nome || !dadosProfissional.email || !dadosProfissional.ocupacao) {
      throw createError("Dados incompletos. Nome, email e ocupação são obrigatórios", 400);
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dadosProfissional.email)) {
      throw createError("Email inválido", 400);
    }
    
    const novoProfissional = ProfissionalRepository.criar(dadosProfissional);
    
    return ResponseHandler.criado(res, novoProfissional, "Profissional criado com sucesso");
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

    // Verificar se o profissional existe
    const profissionalExistente = ProfissionalRepository.buscarPorId(id);
    
    if (!profissionalExistente) {
      return ResponseHandler.naoEncontrado(res, "Profissional não encontrado");
    }

    // Validação de email se fornecido
    if (dadosAtualizados.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dadosAtualizados.email)) {
        throw createError("Email inválido", 400);
      }
    }

    const profissionalAtualizado = ProfissionalRepository.atualizar(id, dadosAtualizados);
    
    return ResponseHandler.sucesso(
      res, 
      profissionalAtualizado, 
      "Profissional atualizado com sucesso"
    );
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

    // Verificar se o profissional existe
    const profissionalExistente = ProfissionalRepository.buscarPorId(id);
    
    if (!profissionalExistente) {
      return ResponseHandler.naoEncontrado(res, "Profissional não encontrado");
    }

    const removido = ProfissionalRepository.remover(id);
    
    if (!removido) {
      throw createError("Erro ao remover profissional", 500);
    }

    return ResponseHandler.sucesso(res, null, "Profissional removido com sucesso");
  });
} 