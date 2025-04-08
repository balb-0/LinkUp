import fs from "fs";
import path from "path";

const MAX_LOG_FILE_SIZE = 5 * 1024 * 1024; // 5MB em bytes
const logsDir = path.join(__dirname, "../logs");
const logPath = path.join(logsDir, "logs.json");

/**
 * Verifica se o arquivo de log atual precisa ser rotacionado 
 * e cria um novo se necessário
 * @returns O caminho para o arquivo de log atual
 */
function getActiveLogFile(): string {

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  if (!fs.existsSync(logPath)) {
    return logPath;
  }

  const stats = fs.statSync(logPath);
  if (stats.size < MAX_LOG_FILE_SIZE) {
    return logPath;
  }

  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
  const arquivadoLogPath = path.join(logsDir, `logs_${timestamp}.json`);
  
  fs.renameSync(logPath, arquivadoLogPath);
  
  return logPath;
}

export async function logChange(entry: {
  tabela: string;
  operacao: string;
  valores_anteriores?: any;
  valores_novos?: any;
}) {
  const logData = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  const currentLogPath = getActiveLogFile();
  
  let logs: any[] = [];

  try {
    if (fs.existsSync(currentLogPath)) {
      const content = fs.readFileSync(currentLogPath, "utf-8");
      logs = JSON.parse(content);
    }
  } catch (error) {
    console.error("Erro ao ler arquivo de logs:", error);
    logs = [];
  }

  logs.push(logData);

  try {
    fs.writeFileSync(currentLogPath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Erro ao escrever arquivo de logs:", error);
  }
}
