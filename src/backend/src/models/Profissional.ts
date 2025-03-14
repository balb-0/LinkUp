import { v4 as uuidv4 } from 'uuid';

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


//aqui temos um reposiroty de profissionais para gerenciar as operações de CRUD (isto é um teste para testar o cache e rate limit e as rotas)
//ela so esta aqui para testar a logica da aplicação e vai ser removida futuramente 

export class ProfissionalRepository {
  private static profissionais: Profissional[] = [];

  static criar(profissional: IProfissional): Profissional {
    const novoProfissional = new Profissional({
      ...profissional,
      id: uuidv4(),
      dataCadastro: new Date()
    });
    
    this.profissionais.push(novoProfissional);
    return novoProfissional;
  }

  static listarTodos(): Profissional[] {
    return this.profissionais;
  }

  static buscarPorId(id: string): Profissional | undefined {
    return this.profissionais.find(p => p.id === id);
  }

  static atualizar(id: string, dados: Partial<IProfissional>): Profissional | null {
    const index = this.profissionais.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    const profissionalAtualizado = {
      ...this.profissionais[index],
      ...dados,
      id
    };
    
    this.profissionais[index] = new Profissional(profissionalAtualizado);
    return this.profissionais[index];
  }

  static remover(id: string): boolean {
    const tamanhoAnterior = this.profissionais.length;
    this.profissionais = this.profissionais.filter(p => p.id !== id);
    return tamanhoAnterior > this.profissionais.length;
  }
}