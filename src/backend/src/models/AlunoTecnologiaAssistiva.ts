// models/AlunoTecnologiaAssistiva.ts
export interface IAlunoTecnologiaAssistiva {
    id?: string;
    alunoId: string;
    tecnologiaAssistivaId: string;
}

export class AlunoTecnologiaAssistiva implements IAlunoTecnologiaAssistiva {
    id?: string;
    alunoId: string;
    tecnologiaAssistivaId: string;

    constructor(alunoTecnologiaAssistiva: IAlunoTecnologiaAssistiva) {
        this.id = alunoTecnologiaAssistiva.id;
        this.alunoId = alunoTecnologiaAssistiva.alunoId;
        this.tecnologiaAssistivaId = alunoTecnologiaAssistiva.tecnologiaAssistivaId;
    }
}

import { query } from '../utils/db';
import { createError } from '../middleware/errorHandler';

export class AlunoTecnologiaAssistivaRepository {
    /**
     * Associa uma tecnologia assistiva a um aluno
     * @param associacao Dados da associação a ser criada
     * @returns Associação criada
     */
    static async criar(associacao: IAlunoTecnologiaAssistiva): Promise<AlunoTecnologiaAssistiva> {
        try {
            const sql = `
                INSERT INTO Aluno_Tecnologia_Assistiva (aluno_id, tecnologia_assistiva_id)
                VALUES (?, ?)
            `;
        
            const params = [
                associacao.alunoId,
                associacao.tecnologiaAssistivaId
            ];
        
            const result: any = await query(sql, params);
        
            // Busca a associação recém-criada para retornar com todos os dados
            const novaAssociacao = await this.buscarPorId(result.insertId.toString());
        
            if (!novaAssociacao) {
                throw createError('Erro ao criar associação entre aluno e tecnologia assistiva', 500);
            }
            return novaAssociacao;
        } catch (error) {
            if ((error as any).message?.includes('Duplicate entry')) {
                throw createError('Esta tecnologia assistiva já está associada a este aluno', 400);
            }
            throw error;
        }
    }

    /**
     * Lista todas as associações entre alunos e tecnologias assistivas
     * @returns Array de associações
     */
    static async listarTodos(): Promise<AlunoTecnologiaAssistiva[]> {
        const sql = `
            SELECT id, aluno_id, tecnologia_assistiva_id
            FROM Aluno_Tecnologia_Assistiva
        `;

        const result: any[] | null = await query(sql);
        
        if (!result || result.length === 0) {
            return [];
        }

        return result.map(row => new AlunoTecnologiaAssistiva({
            id: row.id.toString(),
            alunoId: row.aluno_id.toString(),
            tecnologiaAssistivaId: row.tecnologia_assistiva_id.toString()
        }));
    }

    /**
     * Busca uma associação pelo ID
     * @param id ID da associação
     * @returns Associação encontrada ou undefined
     */
    static async buscarPorId(id: string): Promise<AlunoTecnologiaAssistiva | undefined> {
        const sql = `
            SELECT id, aluno_id, tecnologia_assistiva_id
            FROM Aluno_Tecnologia_Assistiva
            WHERE id = ?
        `;
        
        const result: any[] | null = await query(sql, [id]);

        if (!result || result.length === 0) {
            return undefined;
        }

        const row = result[0];

        if (!row || !row.id) {
            return undefined;
        }
        
        return new AlunoTecnologiaAssistiva({
            id: row.id.toString(),
            alunoId: row.aluno_id.toString(),
            tecnologiaAssistivaId: row.tecnologia_assistiva_id.toString()
        });
    }

    /**
     * Lista todas as tecnologias assistivas associadas a um aluno
     * @param alunoId ID do aluno
     * @returns Array de associações
     */
    static async listarPorAluno(alunoId: string): Promise<AlunoTecnologiaAssistiva[]> {
        const sql = `
            SELECT id, aluno_id, tecnologia_assistiva_id
            FROM Aluno_Tecnologia_Assistiva
            WHERE aluno_id = ?
        `;

        const result: any[] | null = await query(sql, [alunoId]);
        
        if (!result || result.length === 0) {
            return [];
        }

        return result.map(row => new AlunoTecnologiaAssistiva({
            id: row.id.toString(),
            alunoId: row.aluno_id.toString(),
            tecnologiaAssistivaId: row.tecnologia_assistiva_id.toString()
        }));
    }

    /**
     * Lista todos os alunos associados a uma tecnologia assistiva
     * @param tecnologiaId ID da tecnologia assistiva
     * @returns Array de associações
     */
    static async listarPorTecnologia(tecnologiaId: string): Promise<AlunoTecnologiaAssistiva[]> {
        const sql = `
            SELECT id, aluno_id, tecnologia_assistiva_id
            FROM Aluno_Tecnologia_Assistiva
            WHERE tecnologia_assistiva_id = ?
        `;

        const result: any[] | null = await query(sql, [tecnologiaId]);
        
        if (!result || result.length === 0) {
            return [];
        }

        return result.map(row => new AlunoTecnologiaAssistiva({
            id: row.id.toString(),
            alunoId: row.aluno_id.toString(),
            tecnologiaAssistivaId: row.tecnologia_assistiva_id.toString()
        }));
    }

    /**
     * Remove uma associação entre aluno e tecnologia assistiva
     * @param id ID da associação
     * @returns true se removido com sucesso, false se não encontrado
     */
    static async remover(id: string): Promise<boolean> {
        const associacaoExistente = await this.buscarPorId(id);
        if (!associacaoExistente) {
            return false;
        }
        
        const sql = `DELETE FROM Aluno_Tecnologia_Assistiva WHERE id = ?`;
        await query(sql, [id]);
        
        return true;
    }

    /**
     * Remove todas as associações de um aluno com tecnologias assistivas
     * @param alunoId ID do aluno
     * @returns true se removido com sucesso
     */
    static async removerPorAluno(alunoId: string): Promise<boolean> {
        const sql = `DELETE FROM Aluno_Tecnologia_Assistiva WHERE aluno_id = ?`;
        await query(sql, [alunoId]);
        
        return true;
    }

    /**
     * Remove todas as associações de uma tecnologia assistiva com alunos
     * @param tecnologiaId ID da tecnologia assistiva
     * @returns true se removido com sucesso
     */
    static async removerPorTecnologia(tecnologiaId: string): Promise<boolean> {
        const sql = `DELETE FROM Aluno_Tecnologia_Assistiva WHERE tecnologia_assistiva_id = ?`;
        await query(sql, [tecnologiaId]);
        
        return true;
    }
}