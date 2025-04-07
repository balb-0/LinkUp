import fs from "fs";
import path from "path";

const logPath = path.join(__dirname, "../logs/logs.json");

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

  let logs: any[] = [];

  try {
    const content = fs.readFileSync(logPath, "utf-8");
    logs = JSON.parse(content);
  } catch {
    logs = [];
  }

  logs.push(logData);

  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
}
