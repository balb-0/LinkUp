import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path'


// Aqui estão as importações das classes, funções e rotas criadas para o servidor
import EnvManager from "./classes/EnvManager";
import pool from "./utils/db";
import path from "path";
import authRoutes from "./routes/authRoutes";
import pageRoutes from "./routes/pagesRoutes";
import { testConnection } from "./utils/db";
import profissionaisRouter from "./routes/profissionais";
import { requestLogger } from "./middleware/logger";
import { errorHandler, createError } from "./middleware/errorHandler";
import { healthCheck } from "./middleware/healthCheck";
import { cacheMiddleware } from "./middleware/cache";

// Inicializando o app
const app = express();
const port = EnvManager.getEnvOrThrow("PORT");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool
  .getConnection()
  .then((connection) => {
    console.log("Conectado ao banco de dados!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

const frontendPath = path.join(
  __dirname,
  "../../frontend/dist/frontend/browser/"
);
app.use(express.static(frontendPath));

app.use("/api", authRoutes);
app.use("/", pageRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.csr.html"));
});
app.use(limiter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Rotas para a API de profissionais
app.use("/api/profissionais", cacheMiddleware(300000), profissionaisRouter);

// Configuração para servir o frontend
const frontendPath = path.join(__dirname, "../../frontend/dist/frontend/browser");

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
  console.log(`\x1b[32m[SERVIDOR]\x1b[0m Frontend: http://localhost:${port}`);
});
