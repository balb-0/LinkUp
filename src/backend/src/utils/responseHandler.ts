import { Response } from 'express';

/**
 * Interface para resposta padronizada
 */
interface ApiResponse<T> {
  sucesso: boolean;
  mensagem?: string;
  dados?: T;
  erro?: string;
  timestamp: string;
}

/**
 * Classe para padronizar respostas da API
 */
export class ResponseHandler {
  /**
   * Envia uma resposta de sucesso
   * @param res Objeto de resposta do Express
   * @param dados Dados a serem enviados
   * @param mensagem Mensagem de sucesso
   * @param statusCode Código de status HTTP (padrão: 200)
   */
  static sucesso<T>(
    res: Response,
    dados?: T,
    mensagem = 'Operação realizada com sucesso',
    statusCode = 200
  ): Response {
    const resposta: ApiResponse<T> = {
      sucesso: true,
      mensagem,
      dados,
      timestamp: new Date().toISOString()
    };
    
    return res.status(statusCode).json(resposta);
  }
  
  /**
   * Envia uma resposta de erro
   * @param res Objeto de resposta do Express
   * @param erro Mensagem de erro
   * @param statusCode Código de status HTTP (padrão: 400)
   */
  static erro(
    res: Response,
    erro: string,
    statusCode = 400
  ): Response {
    const resposta: ApiResponse<null> = {
      sucesso: false,
      erro,
      timestamp: new Date().toISOString()
    };
    
    return res.status(statusCode).json(resposta);
  }
  
  /**
   * Envia uma resposta para criação de recurso
   * @param res Objeto de resposta do Express
   * @param dados Dados do recurso criado
   * @param mensagem Mensagem de sucesso
   */
  static criado<T>(
    res: Response,
    dados: T,
    mensagem = 'Recurso criado com sucesso'
  ): Response {
    return ResponseHandler.sucesso(res, dados, mensagem, 201);
  }
  
  /**
   * Envia uma resposta para recurso não encontrado
   * @param res Objeto de resposta do Express
   * @param mensagem Mensagem de erro
   */
  static naoEncontrado(
    res: Response,
    mensagem = 'Recurso não encontrado'
  ): Response {
    return ResponseHandler.erro(res, mensagem, 404);
  }
} 