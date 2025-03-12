import mysql from 'mysql2/promise';
import EnvManager from '../classes/EnvManager';
import { createError } from '../middleware/errorHandler';


const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

// Verifica se todas as variáveis de ambiente necessárias estão definidas
for (const envVar of requiredEnvVars) {
  try {
    EnvManager.getEnvOrThrow(envVar);
  } catch (error) {
    throw createError(`Configuração de banco de dados incompleta: ${(error as Error).message}`, 500);
  }
}

/**
 * Configuração do pool de conexões com o banco de dados
 * Usa EnvManager para obter as variáveis de ambiente de forma segura
 */
const pool = mysql.createPool({
  host: EnvManager.getEnvOrThrow('DB_HOST'),
  user: EnvManager.getEnvOrThrow('DB_USER'),
  password: EnvManager.getEnvOrThrow('DB_PASSWORD'),
  database: EnvManager.getEnvOrThrow('DB_NAME'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Verifica a conexão com o banco de dados
 * @returns Promise com a conexão ou erro
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    throw createError(`Falha ao conectar ao banco de dados: ${(error as Error).message}`, 500);
  }
};

/**
 * Executa uma query no banco de dados
 * @param sql Query SQL
 * @param params Parâmetros da query
 * @returns Resultado da query
 */
export const query = async (sql: string, params?: any[]): Promise<any> => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    throw createError(`Erro na execução da query: ${(error as Error).message}`, 500);
  }
};

export default pool;    