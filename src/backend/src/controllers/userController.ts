import { Request, Response } from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import pool from "../utils/db";

dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log("✅ Requisição recebida no backend!");

  try {
    const { nome, email, senha, cargo } = req.body;

    // Validação básica
    if (!nome || !email || !senha || !cargo) {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    // Verifica se o email já está cadastrado
    const [existingUser]: any = await pool.query(
      "SELECT email FROM Usuario WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      res.status(400).json({ message: "Este email já está em uso" });
      return;
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
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
