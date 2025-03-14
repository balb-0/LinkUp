import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser, User } from "../models/userModel";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../middleware/errorHandler";

/**
 * @route POST /api/auth/register
 * @desc Registra um novo usuário
 * @access Público
 */
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  console.log("✅ Requisição recebida no backend!");

  try {
    const { nome, email, senha, cargo } = req.body;

    // Verifica se o email já está cadastrado
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw createError("Este email já está em uso", 400);
    }

    // Cria o usuário usando a função do modelo
    const userId = await createUser({ nome, email, senha, cargo });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      userId,
      redirect: "/login",
    });

  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw createError("Erro interno no servidor", 500);
  }
});
