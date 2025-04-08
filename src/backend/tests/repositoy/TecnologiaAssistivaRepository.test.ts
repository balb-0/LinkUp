import { TecnologiaAssistivaRepository } from '../../src/models/tecnologiaAssistiva';
import { query } from '../../src/utils/db';

jest.mock('../../src/utils/db', () => ({
  query: jest.fn()
}));

describe('TecnologiaAssistivaRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma nova tecnologia assistiva', async () => {
    const novaTecnologia = { nome: 'Leitor de Tela' };

    const mockTecnologiaDB = {
      id: '1',
      nome: 'Leitor de Tela',
    };

    (query as jest.Mock).mockResolvedValueOnce({ insertId: '1' }); // INSERT
    (query as jest.Mock).mockResolvedValueOnce([mockTecnologiaDB]); // SELECT pelo ID

    const result = await TecnologiaAssistivaRepository.criar(novaTecnologia);

    expect(query).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ id: '1', nome: 'Leitor de Tela' });
  });

  it('Deve listar todas as tecnologias assistivas', async () => {
    const mockListagem = [
      { id: '1', nome: 'Leitor de Tela' },
      { id: '2', nome: 'Ampliador de Tela' }
    ];

    (query as jest.Mock).mockResolvedValueOnce(mockListagem);

    const result = await TecnologiaAssistivaRepository.listarTodos();

    expect(result).toHaveLength(2);
    expect(query).toHaveBeenCalledTimes(1);
    expect(result[0]).toEqual({ id: '1', nome: 'Leitor de Tela' });
  });

  it('Deve buscar uma tecnologia assistiva pelo ID', async () => {
    const mockTecnologia = { id: '1', nome: 'Leitor de Tela' };

    (query as jest.Mock).mockResolvedValueOnce([mockTecnologia]);

    const result = await TecnologiaAssistivaRepository.buscarPorId('1');

    expect(query).toHaveBeenCalledWith(expect.stringContaining('WHERE id ='), ['1']);
    expect(result).toEqual({ id: '1', nome: 'Leitor de Tela' });
  });

  it('Deve retornar undefined ao buscar tecnologia inexistente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await TecnologiaAssistivaRepository.buscarPorId('999');

    expect(result).toBeUndefined();
  });

  it('Deve atualizar uma tecnologia assistiva', async () => {
    const tecnologiaExistente = { id: '1', nome: 'Leitor de Tela' };
    const tecnologiaAtualizada = { id: '1', nome: 'Nova Tecnologia' };

    // Busca inicial
    (query as jest.Mock).mockResolvedValueOnce([tecnologiaExistente]);

    // Update
    (query as jest.Mock).mockResolvedValueOnce(undefined);

    // Busca atualizada
    (query as jest.Mock).mockResolvedValueOnce([tecnologiaAtualizada]);

    const result = await TecnologiaAssistivaRepository.atualizar('1', { nome: 'Nova Tecnologia' });

    expect(query).toHaveBeenCalledTimes(3);
    expect(result).toEqual(tecnologiaAtualizada);
  });

  it('Deve retornar null ao tentar atualizar tecnologia inexistente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await TecnologiaAssistivaRepository.atualizar('999', { nome: 'Teste' });

    expect(result).toBeNull();
  });

  it('Deve remover uma tecnologia assistiva', async () => {
    const mockTecnologia = { id: '1', nome: 'Leitor de Tela' };

    // Busca inicial
    (query as jest.Mock).mockResolvedValueOnce([mockTecnologia]);

    // Remoção
    (query as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await TecnologiaAssistivaRepository.remover('1');

    expect(result).toBe(true);
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('Deve retornar false ao tentar remover tecnologia inexistente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await TecnologiaAssistivaRepository.remover('999');

    expect(result).toBe(false);
  });
});
