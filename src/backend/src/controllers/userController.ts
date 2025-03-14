import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import pool from "../utils/db";
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
    const [existingUser]: any = await pool.query(
      "SELECT email FROM Usuario WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      throw createError("Este email já está em uso", 400);
    }

    // Criptografa a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Insere o usuário no banco
    const [result]: any = await pool.query(
      "INSERT INTO Usuario (nome, email, senha, cargo) VALUES (?, ?, ?, ?)",
      [nome, email, hashedSenha, cargo]
    );

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      redirect: "/login",
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw createError("Erro interno no servidor", 500);
  }
});
