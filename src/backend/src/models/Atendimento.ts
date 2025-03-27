
export interface IAtendimento {
    id?: string;
    alunoId: string;
    dataAtendimento: Date;
    tipoAtendimento: string;
    profissionalId: string;
}

export class Atendimento implements IAtendimento {
    id?: string;
    alunoId: string;
    dataAtendimento: Date;
    tipoAtendimento: string;
    profissionalId: string;

    constructor(atendimento: IAtendimento) {
        this.id =  atendimento.id;
        this.alunoId = atendimento.alunoId;
        this.dataAtendimento = atendimento.dataAtendimento;
        this.tipoAtendimento = atendimento.tipoAtendimento;
        this.profissionalId = atendimento.profissionalId;
    }
}

import { query } from '../utils/db';
import { createError } from '../middleware/errorHandler';

// Repositorio de atendimetos funcionando com o banco de dados

export class AtendimentoRepository {

    /**
     * Cria um novo atendimento no banco de dados
     * @param atendimento Dados do atendimento a ser criado
     * @returns atendimento criado
     */
    static async criar(atendimento: IAtendimento): Promise<Atendimento> {
        try {
            const sql = `
                INSERT INTO Atendimento (aluno_id, data_atendimento, tipo_atendimento, profissional_id)
                VALUES (?, ?, ?, ?)
            `;
    
        
            const params = [
                atendimento.alunoId,
                atendimento.dataAtendimento,
                atendimento.tipoAtendimento,
                atendimento.profissionalId,
            ];
        
            const result: any = await query(sql, params);
        
            // Busca o atendimento recém-criado para retornar com todos os dados
            const novoAtendimento = await this.buscarPorId(result.insertId.toString());
        
            if (!novoAtendimento) {
                throw createError('Erro ao criar profissional', 500);
            }
            return novoAtendimento;

        } catch (error) {
            if ((error as any).message?.includes('Duplicate entry') && (error as any).message?.includes('email')) {
                throw createError('Já existe um profissional com este email', 400);
            }
            throw error;
        }
    }

    /**
   * Lista todos os atendimentos
   * @returns Array de atendimentos
   */
  static async listarTodos(): Promise<Atendimento[]> {
    const sql = `
      SELECT id, aluno_id, data_atendimento, tipo_atendimento, profissional_id
      FROM Atendimento
      ORDER BY data_atendimento DESC
    `;

    const result: any[] = await query(sql);
    
    return result.map(row => new Atendimento({
      id: row.id.toString(),
      alunoId: row.aluno_id.toString(),
      dataAtendimento: new Date(row.data_atendimento),
      tipoAtendimento: row.tipo_atendimento,
      profissionalId: row.profissional_id.toString(),
    }));
  }

  /**
   * Busca um atendimento pelo ID
   * @param id ID do atendimento
   * @returns Atendimento encontrado ou undefined
   */
  static async buscarPorId(id: string): Promise<Atendimento | undefined> {
    const sql = `
      SELECT id, aluno_id, data_atendimento, tipo_atendimento, profissional_id
      FROM Atendimento
      WHERE id = ?
    `;
    
    const result: any[] = await query(sql, [id]);
    
    if (result.length === 0) {
      return undefined;
    }
    
    const row = result[0];
    
    return new Atendimento({
      id: row.id.toString(),
      alunoId: row.aluno_id.toString(),
      dataAtendimento: new Date(row.data_atendimento),
      tipoAtendimento: row.tipo_atendimento,
      profissionalId: row.profissional_id.toString(),
    });
  }

  /**
   * Atualiza um atendimento existente
   * @param id ID do atendimento
   * @param dados Dados a serem atualizados
   * @returns Atendimento atualizado ou null se não encontrado
   */
  static async atualizar(id: string, dados: Partial<IAtendimento>): Promise<Atendimento | null> {
    try {
      const atendimentoExistente = await this.buscarPorId(id);
      if (!atendimentoExistente) {
        return null;
      }
      
      const campos: string[] = [];
      const valores: any[] = [];
      
      if (dados.alunoId !== undefined) {
        campos.push('aluno_id = ?');
        valores.push(dados.alunoId);
      }
      if (dados.dataAtendimento !== undefined) {
        campos.push('data_atendimento = ?');
        valores.push(dados.dataAtendimento);
      }
      if (dados.tipoAtendimento !== undefined) {
        campos.push('tipo_atendimento = ?');
        valores.push(dados.tipoAtendimento);
      }
      if (dados.profissionalId !== undefined) {
        campos.push('profissional_id = ?');
        valores.push(dados.profissionalId);
      }
      
      if (campos.length === 0) {
        return atendimentoExistente;
      }
      
      valores.push(id);
      const sql = `UPDATE Atendimento SET ${campos.join(', ')} WHERE id = ?`;
      
      await query(sql, valores);
      
      const atendimentoUpdated = await this.buscarPorId(id);

      if (!atendimentoUpdated) {
        throw createError('Erro ao atualizar atendimento', 500);
      }

      return atendimentoUpdated;
      
    } catch (error) {
      throw createError('Erro ao atualizar atendimento', 500);
    }
  }

  /**
   * Remove um atendimento
   * @param id ID do atendimento
   * @returns true se removido com sucesso, false se não encontrado
   */
  static async remover(id: string): Promise<boolean> {
    const atendimentoExistente = await this.buscarPorId(id);
    if (!atendimentoExistente) {
      return false;
    }
    
    const sql = `DELETE FROM Atendimento WHERE id = ?`;
    await query(sql, [id]);
    
    return true;
  }
    
}
