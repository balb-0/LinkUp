import { AtendimentoRepository } from '../src/models/Atendimento';
import { query } from '../src/utils/db';

jest.mock('../src/utils/db', () => ({
  query: jest.fn()
}));

describe('AtendimentoRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar um novo atendimento', async () => {
    const mockAtendimento = {
      id: '1',
      alunoId: '100',
      dataAtendimento: new Date('2024-03-25'),
      tipoAtendimento: 'Psicologia',
      profissionalId: '200',
      tecnologiaAssistivaId: '300'
    };

    (query as jest.Mock).mockResolvedValueOnce({ insertId: '1' });
    (query as jest.Mock).mockResolvedValueOnce([mockAtendimento]);

    const result = await AtendimentoRepository.criar(mockAtendimento);
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('Deve retornar uma lista de atendimentos', async () => {
    const mockAtendimentos = [
      {
        id: '1', alunoId: '100', dataAtendimento: new Date('2024-03-25'),
        tipoAtendimento: 'Psicologia', profissionalId: '200', tecnologiaAssistivaId: '300'
      }
    ];

    (query as jest.Mock).mockResolvedValueOnce(mockAtendimentos);

    const result = await AtendimentoRepository.listarTodos();

    expect(result).toHaveLength(1);
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('Deve retornar um atendimento pelo ID', async () => {
    const mockAtendimento = {
      id: '1', alunoId: '100', dataAtendimento: new Date('2024-03-25'),
      tipoAtendimento: 'Psicologia', profissionalId: '200', tecnologiaAssistivaId: '300'
    };

    (query as jest.Mock).mockResolvedValueOnce([mockAtendimento]);

    const result = await AtendimentoRepository.buscarPorId('1');

    expect(result).toEqual(expect.objectContaining(mockAtendimento));
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('Deve retornar undefined ao buscar atendimento não existente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await AtendimentoRepository.buscarPorId('999');

    expect(result).toBeUndefined();
  });

  it('Deve atualizar um atendimento', async () => {
    const updatedData = { tipoAtendimento: 'Fisioterapia' };
    const mockAtendimento = {
      id: '1', alunoId: '100', dataAtendimento: new Date('2024-03-25'),
      tipoAtendimento: 'Fisioterapia', profissionalId: '200', tecnologiaAssistivaId: '300'
    };

    (query as jest.Mock).mockResolvedValueOnce([mockAtendimento]);
    (query as jest.Mock).mockResolvedValueOnce(null);
    (query as jest.Mock).mockResolvedValueOnce([mockAtendimento]);

    const result = await AtendimentoRepository.atualizar('1', updatedData);

    expect(query).toHaveBeenCalledTimes(3);
  });

  it('Deve remover um atendimento', async () => {
    (query as jest.Mock).mockResolvedValueOnce([{ id: '1' }]);
    (query as jest.Mock).mockResolvedValueOnce(null);

    const result = await AtendimentoRepository.remover('1');

    expect(result).toBe(true);
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('Deve retornar false quando deletar um atendimento não existente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await AtendimentoRepository.remover('999');

    expect(result).toBe(false);
  });
});