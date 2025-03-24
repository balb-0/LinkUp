export interface Profissional {
  id?: string;
  nome: string;
  email: string;
  ocupacao: string;
  ativo?: boolean;
  dataCadastro?: Date | undefined;
}
