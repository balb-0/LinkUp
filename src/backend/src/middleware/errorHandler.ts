import { Request, Response, NextFunction } from 'express';
import EnvManager from "../classes/EnvManager";
/**
 * Interface para erros personalizados com código de status HTTP
 */
export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Cria um erro com informações adicionais
 * @param message Mensagem de erro
 * @param statusCode Código de status HTTP
 * @returns Erro personalizado
 */
export const createError = (message: string, statusCode = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

/**
 * Middleware para tratamento centralizado de erros
 * Formata a resposta de erro de forma consistente
 */
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const isDev = EnvManager.getEnvOrThrow("NODE_ENV") !== 'production';
  
  // Log do erro
  console.error('\x1b[31m%s\x1b[0m', `[ERRO] ${err.message}`);
  if (isDev) {
    console.error(err.stack);
  }
  
  // Resposta formatada
  res.status(statusCode).json({
    erro: statusCode >= 500 ? 'Erro interno do servidor' : err.message,
    detalhes: isDev ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
}; 