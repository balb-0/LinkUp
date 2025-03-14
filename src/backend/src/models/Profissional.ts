
export interface IProfissional {
  id?: string;
  nome: string;
  email: string;
  ocupacao: string;
  ativo?: boolean;
  dataCadastro?: Date;
}

export class Profissional implements IProfissional {
  id?: string;
  nome: string;
  email: string;
  ocupacao: string;
  ativo: boolean;
  dataCadastro: Date;

  constructor(profissional: IProfissional) {
    this.id = profissional.id;
    this.nome = profissional.nome;
    this.email = profissional.email;
    this.ocupacao = profissional.ocupacao;
    this.ativo = profissional.ativo ?? true;
    this.dataCadastro = profissional.dataCadastro || new Date();
  }
}

import { query } from '../utils/db';
import { createError } from '../middleware/errorHandler';

// Repositorio de profissionais funcionando com o banco de dados

export class ProfissionalRepository {
  /**
   * Cria um novo profissional no banco de dados
   * @param profissional Dados do profissional a ser criado
   * @returns Profissional criado
   */
  static async criar(profissional: IProfissional): Promise<Profissional> {
    try {
      const sql = `
        INSERT INTO Profissional (nome, email, ocupacao, ativo)
        VALUES (?, ?, ?, ?)
      `;
      
      const params = [
        profissional.nome,
        profissional.email,
        profissional.ocupacao,
        profissional.ativo ?? true
      ];
      
      const result: any = await query(sql, params);
      
      // Busca o profissional recém-criado para retornar com todos os dados
      const novoProfissional = await this.buscarPorId(result.insertId.toString());
      
      if (!novoProfissional) {
        throw createError('Erro ao criar profissional', 500);
      }
      
      return novoProfissional;
    } catch (error) {
      if ((error as any).message?.includes('Duplicate entry') && (error as any).message?.includes('email')) {
        throw createError('Já existe um profissional com este email', 400);
      }
      throw error;
    }
  }


  /**
   * Lista todos os profissionais ativos
   * @returns Array de profissionais
   */
  static async listarTodos(): Promise<Profissional[]> {
    const sql = `
      SELECT id, nome, email, ocupacao, ativo, dataCadastro
      FROM Profissional
      WHERE ativo = true
      ORDER BY nome
    `;

    const result: any[] = await query(sql);
    
    return result.map(row => new Profissional({
      id: row.id.toString(),
      nome: row.nome,
      email: row.email,
      ocupacao: row.ocupacao,
      ativo: Boolean(row.ativo),
      dataCadastro: new Date(row.dataCadastro)
    }));
  }

  /**
   * Busca um profissional pelo ID
   * @param id ID do profissional
   * @returns Profissional encontrado ou undefined
   */
  static async buscarPorId(id: string): Promise<Profissional | undefined> {
    const sql = `
      SELECT id, nome, email, ocupacao, ativo, dataCadastro
      FROM Profissional
      WHERE id = ?
    `;
    
    const result: any[] = await query(sql, [id]);
    
    if (result.length === 0) {
      return undefined;
    }
    
    const row = result[0];
    
    return new Profissional({
      id: row.id.toString(),
      nome: row.nome,
      email: row.email,
      ocupacao: row.ocupacao,
      ativo: Boolean(row.ativo),
      dataCadastro: new Date(row.dataCadastro)
    });
  }

  /**
   * Atualiza um profissional existente
   * @param id ID do profissional
   * @param dados Dados a serem atualizados
   * @returns Profissional atualizado ou null se não encontrado
   */
  static async atualizar(id: string, dados: Partial<IProfissional>): Promise<Profissional | null> {
    try {
      // Verifica se o profissional existe
      const profissionalExistente = await this.buscarPorId(id);
      
      if (!profissionalExistente) {
        return null;
      }
      
      // Constrói a query de atualização dinamicamente
      const campos: string[] = [];
      const valores: any[] = [];
      
      if (dados.nome !== undefined) {
        campos.push('nome = ?');
        valores.push(dados.nome);
      }
      
      if (dados.email !== undefined) {
        campos.push('email = ?');
        valores.push(dados.email);
      }
      
      if (dados.ocupacao !== undefined) {
        campos.push('ocupacao = ?');
        valores.push(dados.ocupacao);
      }
      
      if (dados.ativo !== undefined) {
        campos.push('ativo = ?');
        valores.push(dados.ativo);
      }
      
      // Se não há campos para atualizar, retorna o profissional existente
      if (campos.length === 0) {
        return profissionalExistente;
      }
      
      // Adiciona o ID ao final dos parâmetros
      valores.push(id);
      
      const sql = `
        UPDATE Profissional
        SET ${campos.join(', ')}
        WHERE id = ?
      `;
      
      await query(sql, valores);
      
      // Busca o profissional atualizado
      const profissionalAtualizado = await this.buscarPorId(id);
      
      return profissionalAtualizado || null;
    } catch (error) {
      if ((error as any).message?.includes('Duplicate entry') && (error as any).message?.includes('email')) {
        throw createError('Já existe um profissional com este email', 400);
      }
      throw error;
    }
  }

  /**
   * Remove um profissional (exclusão lógica)
   * @param id ID do profissional
   * @returns true se removido com sucesso, false se não encontrado
   */
  static async remover(id: string): Promise<boolean> {
    // Verifica se o profissional existe
    const profissionalExistente = await this.buscarPorId(id);
    
    if (!profissionalExistente) {
      return false;
    }
    
    // Realiza exclusão lógica (marca como inativo)
    const sql = `
      UPDATE Profissional
      SET ativo = false
      WHERE id = ?
    `;
    
    await query(sql, [id]);
    
    return true;
  }
}