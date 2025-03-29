import request from "supertest";
import { app } from "../src/server"; // Certifique-se de que o app do Express está exportado corretamente
import { createUser, findUserByEmail } from "../src/models/UserModel";
import jwt from "jsonwebtoken";
import EnvManager from "../src/classes/EnvManager";

// Mock das funções do UserModel
jest.mock("../src/models/UserModel", () => ({
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
}));


describe("UserController", () => {
  const mockUser = {
    id: "123",
    nome: "Teste",
    email: "teste@email.com",
    senha: "$2a$10$hashedpassword", // Simulando uma senha já criptografada
    cargo: "admin",
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });
  

  describe("POST /api/auth/register", () => {
    it("deve registrar um usuário com sucesso", async () => {
      (findUserByEmail as jest.Mock).mockResolvedValue(null);
      (createUser as jest.Mock).mockResolvedValue(mockUser.id);

      const response = await request(app).post("/api/auth/register").send({
        nome: "Teste",
        email: "teste@email.com",
        senha: "senha123",
        cargo: "admin",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Usuário cadastrado com sucesso!",
        userId: mockUser.id,
        redirect: "/login",
      });
    });

    it("deve retornar erro se o email já estiver em uso", async () => {
      (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      console.log(await findUserByEmail("teste@email.com")); // Deve exibir `mockUser`


      const response = await request(app).post("/api/auth/register").send({
        nome: "Teste",
        email: "teste@email.com",
        senha: "senha123",
        cargo: "admin",
      });

      expect(response.status).toBe(500);
    });
  });
});
