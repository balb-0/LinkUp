import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para logging de requisições HTTP
 * Registra método, URL, código de status e duração da requisição
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, originalUrl } = req;
  
  // Quando a resposta for enviada
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    // Formatação colorida para console
    let statusColor = '\x1b[32m'; // Verde para sucesso
    if (statusCode >= 400 && statusCode < 500) {
      statusColor = '\x1b[33m'; // Amarelo para erros do cliente
    } else if (statusCode >= 500) {
      statusColor = '\x1b[31m'; // Vermelho para erros do servidor
    }
    
    console.log(
      `\x1b[36m${method}\x1b[0m ${originalUrl} ${statusColor}${statusCode}\x1b[0m ${duration}ms`
    );
  });
  
  next();
}; 