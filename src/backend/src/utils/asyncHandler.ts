import { Request, Response, NextFunction } from 'express';

/**
 * Tipo para função de controlador Express
 */
type ControllerFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * Wrapper para funções assíncronas em controladores
 * Captura erros e passa para o próximo middleware
 * @param fn Função assíncrona do controlador
 * @returns Função com tratamento de erro
 */
export const asyncHandler = (fn: ControllerFn) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 