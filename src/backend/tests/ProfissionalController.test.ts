import { ProfissionalController } from '../src/controllers/ProfissionalController';
import { ProfissionalRepository, IProfissional } from '../src//models/Profissional';
import { ResponseHandler } from '../src/utils/responseHandler';
import { Request, Response, NextFunction } from 'express';
import { createError } from '../src/middleware/errorHandler';

// Mocks do ResponseHandler
jest.mock('../src/utils/responseHandler', () => ({
  ResponseHandler: {
    sucesso: jest.fn(),
    naoEncontrado: jest.fn(),
    erro: jest.fn(),
    criado: jest.fn()
  },
}));

// Mock do errorHandler
jest.mock('../src/middleware/errorHandler', () => ({
  createError: jest.fn()
}));

// Mock do ProfissionalRepository
describe('ProfissionalController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    // Limpa os mocks antes de cada teste
    (ResponseHandler.sucesso as jest.Mock).mockClear();
    (ResponseHandler.criado as jest.Mock).mockClear();
    (ResponseHandler.naoEncontrado as jest.Mock).mockClear();
    (ResponseHandler.erro as jest.Mock).mockClear();
    (createError as jest.Mock).mockClear();
    ProfissionalRepository['profissionais'] = []; // Limpa o repositório
  });

  describe('criar', () => {
    it('deve criar um novo profissional com sucesso', async () => {
      const profissionalDados: IProfissional = {
        nome: 'João',
        email: 'joao@email.com',
        ocupacao: 'Desenvolvedor'
      };

      mockRequest.body = profissionalDados;

      await ProfissionalController.criar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.criado).toHaveBeenCalledWith(
        mockResponse,
        expect.objectContaining(profissionalDados),
        'Profissional criado com sucesso'
      );
    });

    it('deve retornar erro 400 se dados incompletos forem fornecidos', async () => {
      const mensagemErroDadosIncompletos = 'Dados incompletos. Nome, email e ocupação são obrigatórios';
      const profissionalDados: Partial<IProfissional> = {
        nome: 'João',
        email: 'joao@email.com'
      };

      mockRequest.body = profissionalDados;

      await ProfissionalController.criar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(createError).toHaveBeenCalledWith(
        mensagemErroDadosIncompletos,
        400
      );
    });

    it('deve retornar erro 400 se email inválido for fornecido', async () => {
      const mensagemErroEmailInvalido = 'Email inválido';
      const profissionalDados: IProfissional = {
        nome: 'João',
        email: 'emailinvalido',
        ocupacao: 'Desenvolvedor'
      };

      mockRequest.body = profissionalDados;

      await ProfissionalController.criar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(createError).toHaveBeenCalledWith(mensagemErroEmailInvalido, 400);
    });
  });

  describe('listarTodos', () => {
    it('deve retornar uma lista de profissionais com sucesso', async () => {
      const joao = { nome: 'João', email: 'joao@email.com', ocupacao: 'Desenvolvedor' };
      const maria = { nome: 'Maria', email: 'maria@email.com', ocupacao: 'Designer' };
      ProfissionalRepository.criar(joao);
      ProfissionalRepository.criar(maria);

      await ProfissionalController.listarTodos(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(
        mockResponse,
        expect.any(Array),
        'Profissionais listados com sucesso'
      );

      const profissionaisListados = (ResponseHandler.sucesso as jest.Mock).mock.calls[0][1];
      expect(profissionaisListados).toHaveLength(2);
      expect(profissionaisListados[0].nome).toBe('João');
      expect(profissionaisListados[1].nome).toBe('Maria');
    });

    it('deve retornar uma lista vazia se não houver profissionais', async () => {
      await ProfissionalController.listarTodos(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(
        mockResponse,
        [],
        'Profissionais listados com sucesso'
      );
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar um profissional pelo ID com sucesso', async () => {
      const profissional: IProfissional = { nome:'João', email: 'joao@email.com', ocupacao: 'Desenvolvedor'};
      const novoProfissional = ProfissionalRepository.criar(profissional);

      const novoProfissionalId = novoProfissional.id;

      if (novoProfissionalId) {
        const mockRequest: Partial<Request> = {
          params: {
            id: novoProfissionalId
          }
        };
  
        await ProfissionalController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);
  
        expect(ResponseHandler.sucesso).toHaveBeenCalledWith(
          mockResponse,
          expect.objectContaining({
            id: novoProfissional.id,
            nome: novoProfissional.nome,
            email: novoProfissional.email,
            ocupacao: novoProfissional.ocupacao,
            ativo: novoProfissional.ativo,
            dataCadastro: novoProfissional.dataCadastro,
          }),
          'Profissional encontrado com sucesso'
        );
      } else {
          expect(novoProfissionalId).toBeDefined();
      }
    });
    it('deve retornar um erro se o profissional não for encontrado', async () => {
      mockRequest.params = { id: '3' }

      await ProfissionalController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(
        mockResponse,
        'Profissional não encontrado'
      );
    });
    
    it('deve retornar erro 400 quando o ID não é fornecido', async() => {
      const mensagemErroIdNaoFornecido = 'ID do profissional não fornecido';
      mockRequest.params = {};

      await ProfissionalController.buscarPorId(mockRequest as Request, mockResponse as Response, mockNext);

      expect(createError).toHaveBeenCalledWith(mensagemErroIdNaoFornecido, 400);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um profissional com sucesso', async () => {
      const profissionalInicial: IProfissional = {
        nome: 'João',
        email: 'joao@email.com',
        ocupacao: 'Desenvolvedor'
      };
      const profissionalCriado = ProfissionalRepository.criar(profissionalInicial);
      const profissionalId = profissionalCriado.id;
      const dadosAtualizadosJoao = { nome: 'João Atualizado', email: 'joao.atualizado@email.com' }

      mockRequest.params = { id: profissionalId ?? '' };
      mockRequest.body = dadosAtualizadosJoao;

      await ProfissionalController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(
        mockResponse,
        expect.objectContaining({
          id: profissionalId,
          nome: dadosAtualizadosJoao.nome,
          email: dadosAtualizadosJoao.email,
          ocupacao: profissionalInicial.ocupacao
        }),
        'Profissional atualizado com sucesso'
      );
    });

    it('deve retornar erro 400 se ID não for fornecido', async () => {
      const mensagemErroIdNaoFornecido = 'ID do profissional não fornecido';
      mockRequest.params = {};

      await ProfissionalController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);
      expect(createError).toHaveBeenCalledWith(mensagemErroIdNaoFornecido, 400);
    });

    it('deve retornar erro 404 se profissional não for encontrado', async () => {
      mockRequest.params = { id: 'id-inexistente' };
      mockRequest.body = { nome: 'Nome Atualizado' };

      await ProfissionalController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(
        mockResponse,
        'Profissional não encontrado'
      );
    });

    it('deve retornar erro 400 se email inválido for fornecido', async () => {
      const mensagemErroEmailInvalido = 'Email inválido';
      const profissionalInicial: IProfissional = {
        nome: 'João',
        email: 'joao@email.com',
        ocupacao: 'Desenvolvedor'
      };
      const profissionalCriado = ProfissionalRepository.criar(profissionalInicial);
      const profissionalId = profissionalCriado.id;

      mockRequest.params = { id: profissionalId ?? '' };
      mockRequest.body = { email: 'emailinvalido' };

      await ProfissionalController.atualizar(mockRequest as Request, mockResponse as Response, mockNext);

      expect(createError).toHaveBeenCalledWith(mensagemErroEmailInvalido, 400);
    });
  });

  describe('remover', () => {
    it('deve remover um profissional com sucesso', async () => {
      const profissionalInicial: IProfissional = {
        nome: 'João',
        email: 'joao@email.com',
        ocupacao: 'Desenvolvedor'
      };
      const profissionalCriado = ProfissionalRepository.criar(profissionalInicial);
      const profissionalId = profissionalCriado.id;

      mockRequest.params = { id: profissionalId ?? '' };

      await ProfissionalController.remover(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.sucesso).toHaveBeenCalledWith(
        mockResponse,
        null,
        'Profissional removido com sucesso'
      );
    });

    it('deve retornar erro 400 se ID não for fornecido', async () => {
      const mensagemErroIdNaoFornecido = 'ID do profissional não fornecido';
      mockRequest.params = {};

      await ProfissionalController.remover(mockRequest as Request, mockResponse as Response, mockNext);

      expect(createError).toHaveBeenCalledWith(mensagemErroIdNaoFornecido, 400);
    });

    it('deve retornar erro 404 se profissional não for encontrado', async () => {
      mockRequest.params = { id: 'id-inexistente' };

      await ProfissionalController.remover(mockRequest as Request, mockResponse as Response, mockNext);

      expect(ResponseHandler.naoEncontrado).toHaveBeenCalledWith(
        mockResponse,
        'Profissional não encontrado'
      );
    });

    it('deve retornar erro 500 se remoção falhar', async () => {
      const mensagemErroRemocaoFalhou = 'Erro ao remover profissional';
      const profissionalInicial: IProfissional = {
        nome: 'João',
        email: 'joao@email.com',
        ocupacao: 'Desenvolvedor'
      };
      const profissionalCriado = ProfissionalRepository.criar(profissionalInicial);
      const profissionalId = profissionalCriado.id;

      mockRequest.params = { id: profissionalId ?? '' };

      // Simula falha na remoção
      jest.spyOn(ProfissionalRepository, 'remover').mockReturnValue(false);

      await ProfissionalController.remover(mockRequest as Request, mockResponse as Response, mockNext);

      expect(createError).toHaveBeenCalledWith(mensagemErroRemocaoFalhou, 500);
    });
  })
});