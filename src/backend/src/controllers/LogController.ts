import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { ResponseHandler } from "../utils/responseHandler";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

const logsDir = path.join(__dirname, "../logs");
const logPath = path.join(logsDir, "logs.json");

export class LogController {
  static getHistorico = asyncHandler(async (req: Request, res: Response) => {
    try {
      // Verificar se o diretório de logs existe
      if (!fs.existsSync(logsDir)) {
        return ResponseHandler.sucesso(res, [], "Nenhum registro de log encontrado");
      }

      // Obter todos os arquivos de log (atual e arquivados)
      const logFiles = fs.readdirSync(logsDir)
        .filter(file => file.endsWith('.json'))
        .map(file => path.join(logsDir, file));

      if (logFiles.length === 0) {
        return ResponseHandler.sucesso(res, [], "Nenhum registro de log encontrado");
      }

      // Combinar logs de todos os arquivos
      let allLogs: any[] = [];
      
      for (const file of logFiles) {
        try {
          const content = fs.readFileSync(file, "utf-8");
          const logs = JSON.parse(content);
          allLogs = [...allLogs, ...logs];
        } catch (error) {
          console.error(`Erro ao ler arquivo de logs ${file}:`, error);
        }
      }

      // Ordenar os logs por timestamp (do mais recente para o mais antigo)
      allLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
     
      const formattedLogs = allLogs.map((log: any) => {
        return {
          data: log.timestamp,
          usuario: "Sistema",
          acao: `${log.operacao} em ${log.tabela}`,
          detalhes: {
            valores_anteriores: log.valores_anteriores,
            valores_novos: log.valores_novos
          }
        };
      });

      // Aplicar paginação opcional
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const paginatedLogs = formattedLogs.slice(startIndex, endIndex);
      
      return ResponseHandler.sucesso(
        res, 
        {
          logs: paginatedLogs,
          total: formattedLogs.length,
          page,
          limit,
          totalPages: Math.ceil(formattedLogs.length / limit)
        }, 
        "Logs encontrados com sucesso"
      );
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      throw createError("Erro ao buscar histórico", 500);
    }
  });
} 