import { Request, Response, NextFunction } from 'express';
import { TecnologiaAssistivaController } from '../../src/controllers/TecnologiaAssistivaController';
import { TecnologiaAssistivaRepository, ITecnologiaAssistiva } from '../../src/models/tecnologiaAssistiva';
import { ResponseHandler } from '../../src/utils/responseHandler';
import { createError } from '../../src/middleware/errorHandler';

// Mocks
jest.mock('../../src/models/tecnologiaAssistiva');
jest.mock('../../src/utils/responseHandler');
jest.mock('../../src/middleware/errorHandler');

describe('TecnologiaAssistivaController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockStatus = jest.fn().mockReturnThis();
    mockJson = jest.fn();
    mockNext = jest.fn();

    mockRequest = {};
    mockResponse = {
      status: mockStatus,
      json: mockJson
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listarTodos', () => {
    it('deve listar todas as tecnologias assistivas com sucesso', async () => {
      const tecnologias: ITecnologiaAssistiva[] = [
        { id: '1', nome: 'Leitor de tela' },
        { id: '2', nome: 'Ampliador de tela' },
      ];
      (TecnologiaAssistivaRepository.listarTodos as jest.Mock).mockResolvedValue(tecnologias);

      await TecnologiaAssistivaController.listarTodos(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, tecnologias, 'Tecnologias assistivas listadas com sucesso');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar uma tecnologia assistiva ao buscar por ID', async () => {
      const tecnologia = { id: '1', nome: 'Leitor de tela' };
      (TecnologiaAssistivaRepository.buscarPorId as jest.Mock).mockResolvedValue(tecnologia);
      mockRequest.params = { id: '1' };

      await TecnologiaAssistivaController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, tecnologia, 'Tecnologia assistiva encontrada com sucesso');
    });

    it('deve retornar erro 400 se ID não for fornecido', async () => {
      mockRequest.params = {};
      await TecnologiaAssistivaController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);
      expect(createError).toHaveBeenCalledWith('ID da tecnologia assistiva não fornecido', 400);
    });

    it('deve retornar não encontrado se a tecnologia não existir', async () => {
      (TecnologiaAssistivaRepository.buscarPorId as jest.Mock).mockResolvedValue(null);
      mockRequest.params = { id: '123' };

      await TecnologiaAssistivaController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);
      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse, 'Tecnologia assistiva não encontrada');
    });
  });

  describe('criar', () => {
    it('deve criar uma nova tecnologia assistiva com sucesso', async () => {
      const novaTecnologia = { id: '1', nome: 'Teclado adaptado' };
      mockRequest.body = novaTecnologia;

      (TecnologiaAssistivaRepository.criar as jest.Mock).mockResolvedValue(novaTecnologia);

      await TecnologiaAssistivaController.criar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.criado).toHaveBeenCalledWith(mockResponse, novaTecnologia, 'Tecnologia assistiva criada com sucesso');
    });
  });

  describe('atualizar', () => {
    it('deve atualizar uma tecnologia existente com sucesso', async () => {
      const tecnologiaAtualizada = { id: '1', nome: 'Software de voz' };
      (TecnologiaAssistivaRepository.atualizar as jest.Mock).mockResolvedValue(tecnologiaAtualizada);

      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'Software de voz' };

      await TecnologiaAssistivaController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, tecnologiaAtualizada, 'Tecnologia assistiva atualizada com sucesso');
    });

    it('deve retornar não encontrado se a tecnologia não existir', async () => {
      (TecnologiaAssistivaRepository.atualizar as jest.Mock).mockResolvedValue(null);

      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'Nome atualizado' };

      await TecnologiaAssistivaController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse, 'Tecnologia assistiva não encontrada');
    });
  });

  describe('remover', () => {
    it('deve remover uma tecnologia assistiva com sucesso', async () => {
      (TecnologiaAssistivaRepository.remover as jest.Mock).mockResolvedValue(true);

      mockRequest.params = { id: '1' };

      await TecnologiaAssistivaController.remover(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, null, 'Tecnologia assistiva removida com sucesso');
    });

    it('deve retornar não encontrado se a tecnologia não for removida', async () => {
      (TecnologiaAssistivaRepository.remover as jest.Mock).mockResolvedValue(false);
      mockRequest.params = { id: '123' };

      await TecnologiaAssistivaController.remover(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse, 'Tecnologia assistiva não encontrada');
    });

    it('deve retornar erro 400 se ID não for fornecido', async () => {
      mockRequest.params = {};

      await TecnologiaAssistivaController.remover(mockRequest as Request, mockResponse as Response, mockNext);
      expect(createError).toHaveBeenCalledWith('ID da tecnologia assistiva não fornecido', 400);
    });
  });
});
