import { Request, Response } from 'express';
import os from 'os';

/**
 * Handler para rota de health check
 * Retorna informações sobre o estado da aplicação
 */
export const healthCheck = (req: Request, res: Response): void => {
  const uptime = process.uptime();
  const { freemem, totalmem } = os;
  
  // Formata o uptime para melhor legibilidade
  const formatUptime = (): string => {
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  
  // Calcula uso de memória
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: formatUptime(),
    memory: {
      free: `${Math.round(freemem() / 1024 / 1024)} MB`,
      total: `${Math.round(totalmem() / 1024 / 1024)} MB`,
      usage: `${Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100} MB`,
      percentage: `${Math.round((1 - freemem() / totalmem()) * 100)}%`
    },
    system: {
      platform: process.platform,
      arch: process.arch,
      version: process.version,
      cpus: os.cpus().length
    }
  });
}; 