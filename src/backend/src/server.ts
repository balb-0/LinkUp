import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Importações internas
import EnvManager from "./classes/EnvManager";
import profissionaisRouter from "./routes/profissionais";
import { requestLogger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { healthCheck } from "./middleware/healthCheck";
import { cacheMiddleware } from "./middleware/cache";

// Inicialização do app
const app = express();

//porta e ambiente
const port = EnvManager.getEnvOrThrow("PORT");
const nodeEnv = EnvManager.getEnvOrThrow("NODE_ENV");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(helmet());

// Ratelimiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições deste IP, tente novamente após 15 minutos'
});
app.use(limiter);

app.use(requestLogger);

// Rota de health check
app.get('/health', healthCheck);

// Rota principal
app.get("/", (req, res) => {
  res.send("API de Atendimentos - Bem-vindo!");
});

// Rotas de profissionais com cache
app.use("/profissionais", cacheMiddleware(300000), profissionaisRouter);

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Rodando na porta ${port}`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Ambiente: ${nodeEnv || 'desenvolvimento'}`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Health check: http://localhost:${port}/health`);
});

