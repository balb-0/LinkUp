export interface IAtendimento {
  id?: string;
  alunoId: string;
  dataAtendimento: string;
  tipoAtendimento: string;
  profissionalId: string;
}

export class Atendimento implements IAtendimento {
  id?: string;
  alunoId: string;
  dataAtendimento: string;
  tipoAtendimento: string;
  profissionalId: string;

  constructor(atendimento: IAtendimento) {
    this.id = atendimento.id;
    this.alunoId = atendimento.alunoId;
    this.dataAtendimento = atendimento.dataAtendimento;
    this.tipoAtendimento = atendimento.tipoAtendimento;
    this.profissionalId = atendimento.profissionalId;
  }
}
