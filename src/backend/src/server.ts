import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from 'helmet';
import path from 'path'

// importações das classes, funções e rotas criadas para o servidor
import EnvManager from "./classes/EnvManager";
import { testConnection } from "./utils/db";
import profissionaisRouter from "./routes/profissionais";
import authRoutes from "./routes/authRoutes";
import pagesRoutes from "./routes/pagesRoutes";
import atendimentoRouter from "./routes/atendimentoRoutes";
import { requestLogger } from "./middleware/logger";
import { cacheMiddleware } from "./middleware/cache";
import { createError, errorHandler } from "./middleware/errorHandler";
import { healthCheck } from "./middleware/healthCheck";
import limiter from "./middleware/limiter";

// Inicializando o app
const app = express();
// Configurando a porta e o ambiente de execução
const port = EnvManager.getEnvOrThrow("PORT");
const nodeEnv = EnvManager.getEnvOrThrow("NODE_ENV");
const portFrontend = EnvManager.getEnvOrThrow("PORT_FRONTEND");

// Configurando os middlewares que vamos usar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(helmet());

// Configurando o limite de requisições para evitar abusos
app.use(limiter);

// Middleware para registrar logs das requisições
app.use(requestLogger);

// Testando a conexão com o banco de dados
/* Este bloco de código é uma expressão de função assíncrona imediatamente invocada (IIFE) em TypeScript.
Ele é usado para testar a conexão com o banco de dados de forma assíncrona quando o servidor é iniciado.
 */

(async () => {
  try {
    await testConnection();
    console.log('\x1b[32m%s\x1b[0m', '[BANCO DE DADOS] Conectado com sucesso!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `[BANCO DE DADOS] ${(error as Error).message}`);
    // Se estivermos em produção e a conexão falhar, deve encerrar o app
    if (nodeEnv === 'production') {
      console.error('\x1b[31m%s\x1b[0m', '[SERVIDOR] Encerrando aplicação devido a falha na conexão com o banco de dados');
      process.exit(1);
    }
  }
})();

// Middleware para checar a conexão com o banco antes de processar as requisições
app.use((req, res, next) => {
  // Não checar a conexão para a rota de health check, que só verifica se o servidor está ativo
  if (req.path === '/health') {
    return next();
  }
  // Checar se o banco de dados está disponível
  testConnection()
    .then(() => next())
    .catch(() => {
      next(createError('Serviço temporariamente indisponível. Tente novamente mais tarde.', 503));
    });
});

// Rota para verificar se o servidor está funcionando
app.get('/health', healthCheck);

// Rota principal da API
app.get("/api", (req, res) => {
  res.send("API de Atendimentos - Bem-vindo!");
});

// Rotas para autenticação
app.use("/api/auth", authRoutes);

// Rotas para a API de profissionais
app.use("/api/profissionais", cacheMiddleware(300000), profissionaisRouter);

//Rptas para API de atendimentos
app.use("/api/atendimentos", cacheMiddleware(300000), atendimentoRouter);

// Rotas para as páginas
app.use("/", pagesRoutes);

// Configuração para servir o frontend
const frontendPath = path.join(
  __dirname,
  "../../frontend/dist/frontend/browser/"
);
// Middleware para servir os arquivos estáticos do frontend
app.use(express.static(frontendPath));

// Middleware para tratar erros 
app.use(errorHandler);

// Rota de fallback para o frontend
app.get("*", (req, res, next) => {
  // Ignora requisições para a API que não foram tratadas pelas rotas anteriores.
  // Isso garante que, se o usuário acessar uma rota da API que não existe, ele receberá um erro 404.
  // Para todas as outras rotas, o usuário será redirecionado para o frontend.
  if (req.path.startsWith('/api')) {
    return next(createError("Endpoint não encontrado", 404));
  }
  
  // Enviar o arquivo index.html para todas as outras rotas
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
      next(createError(`Erro ao carregar o frontend: ${err.message}`, 500));
    }
  });
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Rodando na porta ${port}`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Ambiente: ${nodeEnv || 'desenvolvimento'}`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Health check: http://localhost:${port}/health`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Frontend: http://localhost:${portFrontend}`);
});