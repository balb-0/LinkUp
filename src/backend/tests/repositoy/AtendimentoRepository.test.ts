import { AtendimentoRepository } from '../../src/models/Atendimento';
import { query } from '../../src/utils/db';

jest.mock('../../src/utils/db', () => ({
  query: jest.fn()
}));

describe('AtendimentoRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar um novo atendimento', async () => {
    const novoAtendimento = {
      alunoId: '100',
      dataAtendimento: new Date('2024-03-25'),
      tipoAtendimento: 'Psicologia',
      profissionalId: '200',
    };    

    const mockAtendimentoDB = {
      id: '1',
      aluno_id: '100',
      data_atendimento: new Date('2024-03-25'),
      tipo_atendimento: 'Psicologia',
      profissional_id: '200',
    };

    (query as jest.Mock).mockResolvedValueOnce({ insertId: '1' });
    (query as jest.Mock).mockResolvedValueOnce([mockAtendimentoDB]);

    const result = await AtendimentoRepository.criar(novoAtendimento);
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('Deve retornar uma lista de atendimentos', async () => {
    const mockAtendimentos = [
      {
        id: '1',
        aluno_id: '100',
        data_atendimento: new Date('2024-03-25'),
        tipo_atendimento: 'Psicologia',
        profissional_id: '200',
      }
    ];

    (query as jest.Mock).mockResolvedValueOnce(mockAtendimentos);

    const result = await AtendimentoRepository.listarTodos();

    expect(result).toHaveLength(1);
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('Deve retornar um atendimento pelo ID', async () => {
    const mockAtendimentoDB = {
      id: '1',
      aluno_id: '100',
      data_atendimento: new Date('2024-03-25'),
      tipo_atendimento: 'Psicologia',
      profissional_id: '200',
    };
  
    (query as jest.Mock).mockResolvedValueOnce([mockAtendimentoDB]);
  
    const result = await AtendimentoRepository.buscarPorId('1');
  
    expect(query).toHaveBeenCalledWith(expect.stringContaining('WHERE id ='), ['1']);
    expect(result).toEqual({
      id: '1',
      alunoId: '100',
      dataAtendimento: new Date('2024-03-25'),
      tipoAtendimento: 'Psicologia',
      profissionalId: '200',
      // tecnologiaAssistivaId: '300'
    });
  });
  

  it('Deve retornar undefined ao buscar atendimento não existente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]);

    const result = await AtendimentoRepository.buscarPorId('999');

    expect(result).toBeUndefined();
  });

  it('Deve atualizar um atendimento', async () => {
    const updatedData = { tipoAtendimento: 'Fisioterapia' };
  
    const mockAtendimentoDB = {
      id: '1',
      aluno_id: '100',
      data_atendimento: new Date('2024-03-25'),
      tipo_atendimento: 'Fisioterapia',
      profissional_id: '200',
    };
  
    // Busca original
    (query as jest.Mock).mockResolvedValueOnce([mockAtendimentoDB]);
  
    // Update (não retorna nada, pode ser qualquer valor)
    (query as jest.Mock).mockResolvedValueOnce(undefined);
  
    // Busca atualizada
    (query as jest.Mock).mockResolvedValueOnce([mockAtendimentoDB]);
  
    const result = await AtendimentoRepository.atualizar('1', updatedData);
  
    expect(query).toHaveBeenCalledTimes(3);
    expect(result).toEqual({
      id: '1',
      alunoId: '100',
      dataAtendimento: new Date('2024-03-25'),
      tipoAtendimento: 'Fisioterapia',
      profissionalId: '200',
    });
  });
  
  it('Deve retornar undefined ao tentar atualizar um atendimento inexistente', async () => {
    (query as jest.Mock).mockResolvedValueOnce([]); // Nenhum registro encontrado
  
    const result = await AtendimentoRepository.atualizar('999', { tipoAtendimento: 'Novo' });
  
    expect(result).toBeNull();
  });
  

  it('Deve remover um atendimento', async () => {
    const mockAtendimentoDB = {
      id: '1',
      aluno_id: '100',
      data_atendimento: new Date('2024-03-25'),
      tipo_atendimento: 'Psicologia',
      profissional_id: '200',
      tecnologia_assistiva_id: '300'
    };
  
    // 1. Busca inicial pelo ID
    (query as jest.Mock).mockResolvedValueOnce([mockAtendimentoDB]);
  
    // 2. Deleção (não importa o retorno, pode ser null)
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