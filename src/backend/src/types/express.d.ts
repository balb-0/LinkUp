import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // Você pode substituir `any` pelo tipo correto do usuário
  }
}