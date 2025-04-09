import { Request, Response } from "express";
import { TecnologiaAssistivaRepository, ITecnologiaAssistiva } from "../models/tecnologiaAssistiva";
import { ResponseHandler } from "../utils/responseHandler";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";
import { logChange } from "../utils/logger";

export class TecnologiaAssistivaController {

  /**
   * Lista todas as tecnologias assistivas
   * @route GET /tecnologias/listarTodos
   */
  static listarTodos = asyncHandler(async (req: Request, res: Response) => {
    const tecnologias = await TecnologiaAssistivaRepository.listarTodos();
    return ResponseHandler.sucesso(res, tecnologias, "Tecnologias assistivas listadas com sucesso");
  });
  
  /**
   * Busca uma tecnologia assistiva pelo ID
   * @route GET /tecnologias/buscarPorId/:id
   */
  static buscarPorId = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError("ID da tecnologia assistiva não fornecido", 400);
    }

    const tecnologia = await TecnologiaAssistivaRepository.buscarPorId(id);
    
    if (!tecnologia) {
      return ResponseHandler.naoEncontrado(res, "Tecnologia assistiva não encontrada");
    }

    return ResponseHandler.sucesso(res, tecnologia, "Tecnologia assistiva encontrada com sucesso");
  });

  /**
   * Cria uma nova tecnologia assistiva
   * @route POST /tecnologias/criar
   */
  static criar = asyncHandler(async (req: Request, res: Response) => {
    const dadosTecnologia: ITecnologiaAssistiva = req.body;
    
    // A validação do campo nome é feita pelo middleware de validação
    
    try {
      const novaTecnologia = await TecnologiaAssistivaRepository.criar(dadosTecnologia);

      await logChange({
        tabela: "tecnologia_assistiva",
        operacao: "CREATE",
        valores_novos: novaTecnologia,
      });
      return ResponseHandler.criado(res, novaTecnologia, "Tecnologia assistiva criada com sucesso");
    } catch (error) {
      throw error;
    }
  });

  /**
   * Atualiza uma tecnologia assistiva existente
   * @route PUT /tecnologias/atualizar/:id
   */
  static atualizar = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const dadosAtualizados: Partial<ITecnologiaAssistiva> = req.body;
    
    if (!id) {
      throw createError("ID da tecnologia assistiva não fornecido", 400);
    }

    try {
      const tecnologiaAtual = await TecnologiaAssistivaRepository.buscarPorId(id);
      const tecnologiaAtualizada = await TecnologiaAssistivaRepository.atualizar(id, dadosAtualizados);
      
      if (!tecnologiaAtualizada) {
        return ResponseHandler.naoEncontrado(res, "Tecnologia assistiva não encontrada");
      }
      
      await logChange({
        tabela: "tecnologia_assistiva",
        operacao: "UPDATE",
        valores_novos: tecnologiaAtualizada,
        valores_anteriores: tecnologiaAtual
      });

      return ResponseHandler.sucesso(
        res, 
        tecnologiaAtualizada, 
        "Tecnologia assistiva atualizada com sucesso"
      );
    } catch (error) {
      throw error;
    }
  });

  /**
   * Remove uma tecnologia assistiva
   * @route DELETE /tecnologias/remover/:id
   */
  static remover = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError("ID da tecnologia assistiva não fornecido", 400);
    }

    const antes = await TecnologiaAssistivaRepository.buscarPorId(id);

    const removido = await TecnologiaAssistivaRepository.remover(id);
    
    if (!removido) {
      return ResponseHandler.naoEncontrado(res, "Tecnologia assistiva não encontrada");
    }

    await logChange({
      tabela: "tecnologia_assistiva",
      operacao: "DELETE",
      valores_anteriores: antes
  })
    return ResponseHandler.sucesso(res, null, "Tecnologia assistiva removida com sucesso");
  });
}