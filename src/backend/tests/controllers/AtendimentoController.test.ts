import { Request, Response, NextFunction } from 'express';
import { AtendimentoController } from '../../src/controllers/AtendimentoController';
import { AtendimentoRepository } from '../../src/models/Atendimento';
import { ResponseHandler } from '../../src/utils/responseHandler';

jest.mock('../../src/models/Atendimento');
jest.mock('../../src/utils/responseHandler');

describe('AtendimentoController', () => {
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
            json: mockJson,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('criar', () => {
        it('deve criar um atendimento com sucesso', async () => {
            const atendimento = { id: '1', descricao: 'Consulta' };
            (AtendimentoRepository.criar as jest.Mock).mockResolvedValue(atendimento);
            mockRequest.body = { descricao: 'Consulta' };

            await AtendimentoController.criar(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.criado).toHaveBeenCalledWith(mockResponse, atendimento);
        });
    });

    describe('listarTodos', () => {
        it('deve listar todos os atendimentos com sucesso', async () => {
            const atendimentos = [{ id: '1', descricao: 'Consulta' }];
            (AtendimentoRepository.listarTodos as jest.Mock).mockResolvedValue(atendimentos);

            await AtendimentoController.listarTodos(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, atendimentos);
        });
    });

    describe('buscarPorId', () => {
        it('deve retornar um atendimento pelo ID', async () => {
            const atendimento = { id: '1', descricao: 'Consulta' };
            (AtendimentoRepository.buscarPorId as jest.Mock).mockResolvedValue(atendimento);
            mockRequest.params = { id: '1' };

            await AtendimentoController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, atendimento);
        });

        it('deve retornar 404 se o atendimento não for encontrado', async () => {
            (AtendimentoRepository.buscarPorId as jest.Mock).mockResolvedValue(null);
            mockRequest.params = { id: '1' };

            await AtendimentoController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('atualizar', () => {
        it('deve atualizar um atendimento existente', async () => {
            const atendimentoAtualizado = { id: '1', descricao: 'Consulta Atualizada' };
            (AtendimentoRepository.atualizar as jest.Mock).mockResolvedValue(atendimentoAtualizado);
            mockRequest.params = { id: '1' };
            mockRequest.body = { descricao: 'Consulta Atualizada' };

            await AtendimentoController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, atendimentoAtualizado);
        });

        it('deve retornar 404 se o atendimento não existir', async () => {
            (AtendimentoRepository.atualizar as jest.Mock).mockResolvedValue(null);
            mockRequest.params = { id: '1' };
            mockRequest.body = { descricao: 'Consulta Atualizada' };

            await AtendimentoController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('remover', () => {
        it('deve remover um atendimento com sucesso', async () => {
            (AtendimentoRepository.remover as jest.Mock).mockResolvedValue(true);
            mockRequest.params = { id: '1' };

            await AtendimentoController.remover(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.sucesso).toHaveBeenCalledWith(mockResponse, undefined, 'Atendimento removido com sucesso', 204);
        });

        it('deve retornar 404 se o atendimento não existir', async () => {
            (AtendimentoRepository.remover as jest.Mock).mockResolvedValue(false);
            mockRequest.params = { id: '1' };

            await AtendimentoController.remover(mockRequest as Request, mockResponse as Response, mockNext);

            expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(mockResponse);
        });
    });
});
