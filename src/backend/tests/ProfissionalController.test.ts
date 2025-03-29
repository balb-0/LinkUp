import { Request, Response, NextFunction } from 'express';
import { ProfissionalController } from '../src/controllers/ProfissionalController';
import { ProfissionalRepository, IProfissional, Profissional } from '../src/models/Profissional';
import { ResponseHandler } from '../src/utils/responseHandler';
import { createError } from '../src/middleware/errorHandler';

// Mock do ProfissionalRepository
jest.mock('../src/models/Profissional');
jest.mock('../src/utils/responseHandler');
jest.mock('../src/middleware/errorHandler');

describe('ProfissionalController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock; // Adicionado mock para next
  let mockSend: jest.Mock;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock; // Adicionado mock para json

  

  beforeEach(() => {
    mockSend = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockNext = jest.fn(); // Inicializado mock para next
    mockJson = jest.fn(); // Inicializado mock para json
    mockRequest = {};
    mockResponse = {
      send: mockSend,
      status: mockStatus,
      json: mockJson
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listarTodos', () => {
    it('deve listar todos os profissionais com sucesso', async () => {
      const profissionais: Profissional[] = [
        new Profissional({ nome: 'João', email: 'joao@email.com', ocupacao: 'Desenvolvedor' }),
        new Profissional({ nome: 'Maria', email: 'maria@email.com', ocupacao: 'Designer' }),
      ];
      (ProfissionalRepository.listarTodos as jest.Mock).mockResolvedValue(profissionais);

      await ProfissionalController.listarTodos(mockRequest as Request, mockResponse as Response, mockNext as NextFunction); // Adicionado mockNext

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, profissionais, 'Profissionais listados com sucesso');
      expect(mockNext).not.toHaveBeenCalled(); // Garante que next não foi chamado
    });
  });

  describe('listarPaginado', () => {
    it('deve listar profissionais com paginação com sucesso', async () => {
      const profissionais: Profissional[] = [
        new Profissional({ nome: 'João', email: 'joao@email.com', ocupacao: 'Desenvolvedor' }),
        new Profissional({ nome: 'Maria', email: 'maria@email.com', ocupacao: 'Designer' }),
      ];
      const total = 2;
      (ProfissionalRepository.listarComPaginacao as jest.Mock).mockResolvedValue({ profissionais, total });

      mockRequest.query = { pagina: '0', tamanhoPagina: '10' };
      await ProfissionalController.listarPaginado(mockRequest as Request, mockResponse as Response, mockNext as NextFunction); // Adicionado mockNext

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, { profissionais, total }, 'Profissionais listados com sucesso');
      expect(mockNext).not.toHaveBeenCalled(); // Garante que next não foi chamado
    });
  });

  describe('buscarPorId', () => {
    it('deve buscar um profissional por ID com sucesso', async () => {
      const profissional = new Profissional({ nome: 'João', email: 'joao@email.com', ocupacao: 'Desenvolvedor' });
      (ProfissionalRepository.buscarPorId as jest.Mock).mockResolvedValue(profissional);

      mockRequest.params = { id: '1' };
      await ProfissionalController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext as NextFunction); // Adicionado mockNext

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, profissional, 'Profissional encontrado com sucesso');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve retornar não encontrado se o profissional não existir', async () => {
      (ProfissionalRepository.buscarPorId as jest.Mock).mockResolvedValue(undefined);

      mockRequest.params = { id: '1' };
      await ProfissionalController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext as NextFunction); // Adicionado mockNext

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse, 'Profissional não encontrado');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve retornar erro 400 quando o ID não é fornecido', async() => {
      const mensagemErroIdNaoFornecido = 'ID do profissional não fornecido';
      mockRequest.params = {};

      await ProfissionalController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);

      expect(createError).toHaveBeenCalledWith(mensagemErroIdNaoFornecido, 400);
    });
  });

  describe('criar', () => {
    it('deve criar um novo profissional com sucesso', async () => {
      const novoProfissional = new Profissional({ nome: 'João', email: 'joao@email.com', ocupacao: 'Desenvolvedor' });
      (ProfissionalRepository.criar as jest.Mock).mockResolvedValue(novoProfissional);

      mockRequest.body = { nome: 'João', email: 'joao@email.com', ocupacao: 'Desenvolvedor' };
      await ProfissionalController.criar(mockRequest as Request, mockResponse as Response, mockNext as NextFunction); 

      expect(ResponseHandler.criado).toHaveBeenCalledWith(mockResponse, novoProfissional, 'Profissional criado com sucesso');
      expect(mockNext).not.toHaveBeenCalled();
    });    
  });

  describe('atualizar', () => {
    it('deve atualizar um profissional existente com sucesso', async () => {
      const profissionalAtualizado = new Profissional({ nome: 'João Atualizado', email: 'joao@email.com', ocupacao: 'Desenvolvedor' });
      (ProfissionalRepository.atualizar as jest.Mock).mockResolvedValue(profissionalAtualizado);

      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'João Atualizado' };
      await ProfissionalController.atualizar(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, profissionalAtualizado, 'Profissional atualizado com sucesso');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve retornar não encontrado se o profissional não existir', async () => {
      (ProfissionalRepository.atualizar as jest.Mock).mockResolvedValue(null);

      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'João Atualizado' };
      await ProfissionalController.atualizar(mockRequest as Request, mockResponse as Response, mockNext as NextFunction); 

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse, 'Profissional não encontrado');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});