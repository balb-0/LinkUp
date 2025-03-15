import { Request, Response, NextFunction } from 'express';

/**
 * Interface para item em cache
 */
interface CacheItem {
  data: any;
  timestamp: number;
}

/**
 * Cache em memória
 */
const memoryCache: Record<string, CacheItem> = {};

/**
 * Middleware para cache de respostas
 * @param duration Duração do cache em milissegundos
 * @returns Middleware de cache
 */
export const cacheMiddleware = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Apenas aplica cache para requisições GET
    if (req.method !== 'GET') {
      next();
      return;
    }
    
    const key = `${req.originalUrl}`;
    const cachedResponse = memoryCache[key];
    
    // Se temos uma resposta em cache e ela ainda é válida
    if (cachedResponse && Date.now() - cachedResponse.timestamp < duration) {
      console.log(`\x1b[35m[CACHE]\x1b[0m Servindo do cache: ${key}`);
      res.json(cachedResponse.data);
      return;
    }
    
    // Sobrescreve o método json para interceptar a resposta
    const originalJson = res.json.bind(res);
    res.json = function(data) {
      // Armazena no cache
      memoryCache[key] = {
        data,
        timestamp: Date.now()
      };
      console.log(`\x1b[35m[CACHE]\x1b[0m Armazenando no cache: ${key}`);
      
      // Chama o método original
      return originalJson(data);
    };
    
    next();
  };
};

/**
 * Limpa o cache para uma rota específica ou todo o cache
 * @param route Rota específica para limpar (opcional)
 */
export const clearCache = (route?: string): void => {
  if (route) {
    delete memoryCache[route];
    console.log(`\x1b[35m[CACHE]\x1b[0m Cache limpo para: ${route}`);
  } else {
    Object.keys(memoryCache).forEach(key => delete memoryCache[key]);
    console.log('\x1b[35m[CACHE]\x1b[0m Cache completamente limpo');
  }
}; 