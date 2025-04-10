import pool from "../utils/db";
import bcrypt from "bcryptjs";

export interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  cargo: string;
}

export const findUserByEmail = async (email: string) => {
  const [rows]: any = await pool.query("SELECT * FROM Usuario WHERE email = ?", [email]);
  return rows.length ? rows[0] : null;
};

export const createUser = async (user: User) => {
  const hashedSenha = await bcrypt.hash(user.senha, 10);
  const [result]: any = await pool.query(
    "INSERT INTO Usuario (nome, email, senha, cargo) VALUES (?, ?, ?, ?)",
    [user.nome, user.email, hashedSenha, user.cargo]
  );
  return result.insertId;
};