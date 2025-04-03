export interface ITecnologiaAssistiva {
  id?: string;
  nome: string;
}

export class TecnologiaAssistiva implements ITecnologiaAssistiva {
  id?: string;
  nome: string;

  constructor(tecnologia: ITecnologiaAssistiva) {
    this.id = tecnologia.id;
    this.nome = tecnologia.nome;
  }
}

import { query } from '../utils/db';
import { createError } from '../middleware/errorHandler';

export class TecnologiaAssistivaRepository {
  /**
   * Cria uma nova tecnologia assistiva no banco de dados
   * @param tecnologia Dados da tecnologia a ser criada
   * @returns Tecnologia criada
   */
  static async criar(tecnologia: ITecnologiaAssistiva): Promise<TecnologiaAssistiva> {
    try {
      const sql = `
        INSERT INTO Tecnologia_Assistiva (nome)
        VALUES (?)
      `;
      
      const params = [tecnologia.nome];
      
      const result: any = await query(sql, params);
      
      // Busca a tecnologia recém-criada para retornar com todos os dados
      const novaTecnologia = await this.buscarPorId(result.insertId.toString());
      
      if (!novaTecnologia) {
        throw createError('Erro ao criar tecnologia assistiva', 500);
      }
      
      return novaTecnologia;
    } catch (error) {
      if ((error as any).message?.includes('Duplicate entry') && (error as any).message?.includes('nome')) {
        throw createError('Já existe uma tecnologia assistiva com este nome', 400);
      }
      throw error;
    }
  }

  /**
   * Lista todas as tecnologias assistivas
   * @returns Array de tecnologias
   */
  static async listarTodos(): Promise<TecnologiaAssistiva[]> {
    const sql = `
      SELECT id, nome
      FROM Tecnologia_Assistiva
      ORDER BY nome
    `;

    const result: any[] = await query(sql);
    
    return result.map(row => new TecnologiaAssistiva({
      id: row.id.toString(),
      nome: row.nome
    }));
  }

  /**
   * Busca uma tecnologia assistiva pelo ID
   * @param id ID da tecnologia
   * @returns Tecnologia encontrada ou undefined
   */
  static async buscarPorId(id: string): Promise<TecnologiaAssistiva | undefined> {
    const sql = `
      SELECT id, nome
      FROM Tecnologia_Assistiva
      WHERE id = ?
    `;
    
    const result: any[] = await query(sql, [id]);
    
    if (result.length === 0) {
      return undefined;
    }
    
    const row = result[0];
    
    return new TecnologiaAssistiva({
      id: row.id.toString(),
      nome: row.nome
    });
  }

  /**
   * Atualiza uma tecnologia assistiva existente
   * @param id ID da tecnologia
   * @param dados Dados a serem atualizados
   * @returns Tecnologia atualizada ou null se não encontrada
   */
  static async atualizar(id: string, dados: Partial<ITecnologiaAssistiva>): Promise<TecnologiaAssistiva | null> {
    try {
      // Verifica se a tecnologia existe
      const tecnologiaExistente = await this.buscarPorId(id);
      
      if (!tecnologiaExistente) {
        return null;
      }
      
      // Se não há nome para atualizar, retorna a tecnologia existente
      if (dados.nome === undefined) {
        return tecnologiaExistente;
      }
      
      const sql = `
        UPDATE Tecnologia_Assistiva
        SET nome = ?
        WHERE id = ?
      `;
      
      await query(sql, [dados.nome, id]);
      
      // Busca a tecnologia atualizada
      const tecnologiaAtualizada = await this.buscarPorId(id);
      
      return tecnologiaAtualizada || null;
    } catch (error) {
      if ((error as any).message?.includes('Duplicate entry') && (error as any).message?.includes('nome')) {
        throw createError('Já existe uma tecnologia assistiva com este nome', 400);
      }
      throw error;
    }
  }

  /**
   * Remove uma tecnologia assistiva
   * @param id ID da tecnologia
   * @returns true se removida com sucesso, false se não encontrada
   */
  static async remover(id: string): Promise<boolean> {
    // Verifica se a tecnologia existe
    const tecnologiaExistente = await this.buscarPorId(id);
    
    if (!tecnologiaExistente) {
      return false;
    }
    
    // Realiza exclusão física
    const sql = `
      DELETE FROM Tecnologia_Assistiva
      WHERE id = ?
    `;
    
    await query(sql, [id]);
    
    return true;
  }
}