import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import EnvManager from "./classes/EnvManager";
import pool from "./utils/db";
import authRoutes from "./routes/authRoutes";
import pageRoutes from "./routes/pagesRoutes";
import profissionaisRouter from "./routes/profissionais";
import { requestLogger } from "./middleware/logger";
import { errorHandler, createError } from "./middleware/errorHandler";
import { healthCheck } from "./middleware/healthCheck";
import { cacheMiddleware } from "./middleware/cache";

// Inicializando o app
const app = express();
const port = EnvManager.getEnvOrThrow("PORT");
const frontendPath = path.join(__dirname, "../../frontend/dist/frontend/browser");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(requestLogger);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limite de 100 requisições por IP
});
app.use(limiter);

// Conexão com o banco de dados
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Conectado ao banco de dados!");
    connection.release();
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  });

// Servir o frontend
app.use(express.static(frontendPath));

// Rotas da API
app.use("/api", authRoutes);
app.use("/api/profissionais", cacheMiddleware(300000), profissionaisRouter);
app.use("/", pageRoutes);

// Health Check
app.get("/health", healthCheck);

// Middleware para tratar erros
app.use(errorHandler);

// Rota de fallback para o frontend
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next(createError("Endpoint não encontrado", 404));
  }
  res.sendFile(path.join(frontendPath, "index.csr.html"), (err) => {
    if (err) {
      next(createError(`Erro ao carregar o frontend: ${err.message}`, 500));
    }
  });
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Rodando na porta ${port}`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Ambiente: ${process.env.NODE_ENV || "desenvolvimento"}`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Health check: http://localhost:${port}/health`);
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Frontend: http://localhost:${port}`);
});
