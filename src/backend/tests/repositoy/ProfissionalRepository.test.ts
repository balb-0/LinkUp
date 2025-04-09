import { ProfissionalRepository } from '../../src/models/Profissional';
import { query } from '../../src/utils/db';

jest.mock('../../src/utils/db', () => ({
  query: jest.fn()
}));

describe('ProfissionalRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar um novo profissional', async () => {
    const mockProfissional = {
      id: '1',
      nome: 'John Doe',
      email: 'john@example.com',
      ocupacao: 'Desenvolvedor',
      ativo: true
    };

    // Mock para query de inserção
    (query as jest.Mock).mockResolvedValueOnce({ insertId: '1' });

    // Mock para query de busca pelo ID
    (query as jest.Mock).mockResolvedValueOnce([mockProfissional]);

    const result = await ProfissionalRepository.criar(mockProfissional);

    expect(result).toEqual(expect.objectContaining(mockProfissional));
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('Deve retornar uma lista de profissionais ativos', async () => {
    const mockProfissionais = [
      { id: '1', nome: 'Alice', email: 'alice@example.com', ocupacao: 'Engenheira', ativo: true },
      { id: '2', nome: 'Bob', email: 'bob@example.com', ocupacao: 'Analista', ativo: true }
    ];

    (query as jest.Mock).mockResolvedValueOnce(mockProfissionais);

    const result = await ProfissionalRepository.listarTodos();

    expect(result).toHaveLength(2);
    expect(result[0].nome).toBe('Alice');
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('Deve atualizar os dados de um profissional', async () => {
    const mockProfissional = { id: '1', nome: 'Updated Name', email: 'updated@example.com', ocupacao: 'Engenheiro', ativo: true };

    (query as jest.Mock).mockResolvedValueOnce([mockProfissional]); // buscarPorId
    (query as jest.Mock).mockResolvedValueOnce(null); // update
    (query as jest.Mock).mockResolvedValueOnce([mockProfissional]); // buscarPorId novamente

    const result = await ProfissionalRepository.atualizar('1', { nome: 'Updated Name' });

    expect(result).toEqual(expect.objectContaining({ nome: 'Updated Name' }));
    expect(query).toHaveBeenCalledTimes(3);
  });

  it('Deve retornar undefined quando o profissional não for encontrado', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await ProfissionalRepository.buscarPorId('999');

    expect(result).toBeUndefined();
  });

  it('Deve deletar um profissional', async () => {
    (query as jest.Mock).mockResolvedValueOnce([{ id: '1', ativo: true }]); // buscarPorId
    (query as jest.Mock).mockResolvedValueOnce(null); // update para inativar

    const result = await ProfissionalRepository.remover('1');

    expect(result).toBe(true);
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('Deve retornar falso quando tentar deletar um profissional que não existe', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]); // buscarPorId

    const result = await ProfissionalRepository.remover('999');

    expect(result).toBe(false);
  });
});
