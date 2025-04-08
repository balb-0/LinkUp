// tests/AlunoTecnologiaAssistivaRepository.test.ts
import { AlunoTecnologiaAssistivaRepository } from '../../src/models/AlunoTecnologiaAssistiva';
import { query } from '../../src/utils/db';
import { createError } from '../../src/middleware/errorHandler';

jest.mock('../../src/utils/db', () => ({
  query: jest.fn()
}));

jest.mock('../../src/middleware/errorHandler', () => ({
  createError: jest.fn()
}));

describe('AlunoTecnologiaAssistivaRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma nova associação aluno-tecnologia', async () => {
    const novaAssociacao = {
      alunoId: '100',
      tecnologiaAssistivaId: '200',
    };

    const mockDB = {
      id: 1,
      aluno_id: '100',
      tecnologia_assistiva_id: '200'
    };

    (query as jest.Mock).mockResolvedValueOnce({ insertId: 1 }); // insert
    (query as jest.Mock).mockResolvedValueOnce([mockDB]); // buscarPorId

    const result = await AlunoTecnologiaAssistivaRepository.criar(novaAssociacao);

    expect(query).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      id: '1',
      alunoId: '100',
      tecnologiaAssistivaId: '200',
    });
  });

  it('Deve lançar erro se associação for duplicada', async () => {
    const erro = new Error('Duplicate entry');
    (erro as any).message = 'Duplicate entry';
    (query as jest.Mock).mockRejectedValueOnce(erro);

    const mockCreateError = jest.fn(() => new Error('Erro customizado'));
    (createError as jest.Mock).mockImplementation(mockCreateError);

    await expect(AlunoTecnologiaAssistivaRepository.criar({
      alunoId: '100',
      tecnologiaAssistivaId: '200'
    })).rejects.toThrow('Erro customizado');
  });

  it('Deve listar todas as associações', async () => {
    const mockData = [
      { id: 1, aluno_id: '100', tecnologia_assistiva_id: '200' }
    ];

    (query as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await AlunoTecnologiaAssistivaRepository.listarTodos();

    expect(query).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0].alunoId).toBe('100');
  });

  it('Deve buscar associação por ID', async () => {
    const mockData = {
      id: 1,
      aluno_id: '100',
      tecnologia_assistiva_id: '200'
    };

    (query as jest.Mock).mockResolvedValueOnce([mockData]);

    const result = await AlunoTecnologiaAssistivaRepository.buscarPorId('1');

    expect(result).toEqual({
      id: '1',
      alunoId: '100',
      tecnologiaAssistivaId: '200'
    });
  });

  it('Deve retornar undefined se não encontrar por ID', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await AlunoTecnologiaAssistivaRepository.buscarPorId('999');

    expect(result).toBeUndefined();
  });

  it('Deve listar por aluno', async () => {
    const mockData = [
      { id: 1, aluno_id: '100', tecnologia_assistiva_id: '200' }
    ];

    (query as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await AlunoTecnologiaAssistivaRepository.listarPorAluno('100');

    expect(result[0].alunoId).toBe('100');
  });

  it('Deve listar por tecnologia', async () => {
    const mockData = [
      { id: 1, aluno_id: '100', tecnologia_assistiva_id: '200' }
    ];

    (query as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await AlunoTecnologiaAssistivaRepository.listarPorTecnologia('200');

    expect(result[0].tecnologiaAssistivaId).toBe('200');
  });

  it('Deve remover uma associação existente', async () => {
    const mockData = {
      id: 1,
      aluno_id: '100',
      tecnologia_assistiva_id: '200'
    };

    (query as jest.Mock).mockResolvedValueOnce([mockData]); // buscarPorId
    (query as jest.Mock).mockResolvedValueOnce(undefined); // delete

    const result = await AlunoTecnologiaAssistivaRepository.remover('1');

    expect(result).toBe(true);
  });

  it('Deve retornar false ao tentar remover associação inexistente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]); // buscarPorId

    const result = await AlunoTecnologiaAssistivaRepository.remover('999');

    expect(result).toBe(false);
  });

  it('Deve remover todas as associações de um aluno', async () => {
    (query as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await AlunoTecnologiaAssistivaRepository.removerPorAluno('100');

    expect(result).toBe(true);
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('Deve remover todas as associações de uma tecnologia', async () => {
    (query as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await AlunoTecnologiaAssistivaRepository.removerPorTecnologia('200');

    expect(result).toBe(true);
    expect(query).toHaveBeenCalledTimes(1);
  });
});
