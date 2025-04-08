import express from "express";
import { LogController } from "../controllers/LogController";

const historicoRoutes = express.Router();

// Rota para obter o histórico de logs
historicoRoutes.get("/", LogController.getHistorico);

export default historicoRoutes; 