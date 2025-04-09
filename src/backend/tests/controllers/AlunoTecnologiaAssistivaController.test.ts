import { Request, Response, NextFunction } from 'express';
import { AlunoTecnologiaAssistivaController } from '../../src/controllers/AlunoTecnologiaAssistivaController';
import { AlunoTecnologiaAssistivaRepository } from '../../src/models/AlunoTecnologiaAssistiva';
import { ResponseHandler } from '../../src/utils/responseHandler';

jest.mock('../../src/models/AlunoTecnologiaAssistiva');
jest.mock('../../src/utils/responseHandler');

describe('AlunoTecnologiaAssistivaController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockStatus = jest.fn().mockReturnThis();
    mockJson = jest.fn();
    mockReq = {};
    mockRes = {
      status: mockStatus,
      json: mockJson
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('associar', () => {
    it('deve associar aluno com tecnologia assistiva', async () => {
      const mockData = { alunoId: '1', tecnologiaId: '2' };
      mockReq.body = mockData;
      (AlunoTecnologiaAssistivaRepository.criar as jest.Mock).mockResolvedValue(mockData);

      await AlunoTecnologiaAssistivaController.associar(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.criado).toHaveBeenCalledWith(mockRes, mockData);
    });
  });

  describe('listarTodos', () => {
    it('deve listar todas as associações', async () => {
      const associacoes = [{ alunoId: '1', tecnologiaId: '2' }];
      (AlunoTecnologiaAssistivaRepository.listarTodos as jest.Mock).mockResolvedValue(associacoes);

      await AlunoTecnologiaAssistivaController.listarTodos(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockRes, associacoes);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar associação se encontrada', async () => {
      const associacao = { id: 'abc123', alunoId: '1', tecnologiaId: '2' };
      mockReq.params = { id: 'abc123' };
      (AlunoTecnologiaAssistivaRepository.buscarPorId as jest.Mock).mockResolvedValue(associacao);

      await AlunoTecnologiaAssistivaController.buscarPorId(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockRes, associacao);
    });

    it('deve retornar não encontrado se associação não existir', async () => {
      mockReq.params = { id: 'abc123' };
      (AlunoTecnologiaAssistivaRepository.buscarPorId as jest.Mock).mockResolvedValue(null);

      await AlunoTecnologiaAssistivaController.buscarPorId(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockRes);
    });
  });

  describe('listarPorAluno', () => {
    it('deve listar associações por aluno', async () => {
      const associacoes = [{ alunoId: '1', tecnologiaId: '2' }];
      mockReq.params = { alunoId: '1' };
      (AlunoTecnologiaAssistivaRepository.listarPorAluno as jest.Mock).mockResolvedValue(associacoes);

      await AlunoTecnologiaAssistivaController.listarPorAluno(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockRes, associacoes);
    });
  });

  describe('listarPorTecnologia', () => {
    it('deve listar associações por tecnologia', async () => {
      const associacoes = [{ alunoId: '1', tecnologiaId: '2' }];
      mockReq.params = { tecnologiaId: '2' };
      (AlunoTecnologiaAssistivaRepository.listarPorTecnologia as jest.Mock).mockResolvedValue(associacoes);

      await AlunoTecnologiaAssistivaController.listarPorTecnologia(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockRes, associacoes);
    });
  });

  describe('remover', () => {
    it('deve remover associação existente', async () => {
      mockReq.params = { id: 'abc123' };
      (AlunoTecnologiaAssistivaRepository.remover as jest.Mock).mockResolvedValue(true);

      await AlunoTecnologiaAssistivaController.remover(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockRes, undefined, 'Associação removida com sucesso', 204);
    });

    it('deve retornar não encontrado se associação não existir', async () => {
      mockReq.params = { id: 'abc123' };
      (AlunoTecnologiaAssistivaRepository.remover as jest.Mock).mockResolvedValue(false);

      await AlunoTecnologiaAssistivaController.remover(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockRes);
    });
  });

  describe('removerPorAluno', () => {
    it('deve remover todas as associações de um aluno', async () => {
      mockReq.params = { alunoId: '1' };
      (AlunoTecnologiaAssistivaRepository.removerPorAluno as jest.Mock).mockResolvedValue(undefined);

      await AlunoTecnologiaAssistivaController.removerPorAluno(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockRes, undefined, 'Associações do aluno removidas com sucesso', 204);
    });
  });

  describe('removerPorTecnologia', () => {
    it('deve remover todas as associações de uma tecnologia', async () => {
      mockReq.params = { tecnologiaId: '2' };
      (AlunoTecnologiaAssistivaRepository.removerPorTecnologia as jest.Mock).mockResolvedValue(undefined);

      await AlunoTecnologiaAssistivaController.removerPorTecnologia(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockRes, undefined, 'Associações da tecnologia removidas com sucesso', 204);
    });
  });
});
