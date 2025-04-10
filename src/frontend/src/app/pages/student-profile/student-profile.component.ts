import { PopupTecnologiasComponent } from './../../components/popup-tec-assistiva/popup-tec-assistiva.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AlunoService } from '../../services/aluno.service';
import { AtendimentoService } from '../../services/atendimento.service';
import { ProfissionalService } from '../../services/professionalservice';

import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { InformationTableComponent, TableSection } from '../../components/information-table/information-table.component';
import { TabServiceTechnologyComponent } from '../../components/tab-service-technology/tab-service-technology.component';
import { ServiceTechnologyCardComponent } from '../../components/service-technology-card/service-technology-card.component';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';

import { Atendimento } from '../../models/atendimento';
import { Profissional } from '../../models/professional';
import { PopupProfissionaisComponent } from '../../components/popup-profissionais/popup-profissionais.component';
import { MatDialog } from '@angular/material/dialog';

import { TecnologiaAssistivaService } from '../../services/tecnologia-assistiva.service';
import { TecnologiaAlunoService } from '../../services/tecnologia-aluno.service';
import { TecnologiaAssistiva } from '../../models/tecnologiaAssistiva';
import { AlunoTecnologiaAssistiva } from '../../models/tecnologiaAluno';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';


interface Enrollment {
  course_name: string;
  course_type: string;
  shift: string;
  institution_name: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface StudentProfile {
  id: number;
  academic_id: string;
  name: string;
  email: string;
  date_of_birth: string;
  contact_phone: string;
  enrollments: Enrollment[];
}

interface ApiResponse<T> {
  sucesso: boolean;
  mensagem: string;
  dados: T;
  timestamp: string;
}

interface DeficienciaInfo {
  nome: string;
  cid?: string;
  descricao?: string;
}

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProfileHeaderComponent,
    InformationTableComponent,
    TabServiceTechnologyComponent,
    StatusBadgeComponent,
    ServiceTechnologyCardComponent
  ],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  student: StudentProfile | null = null;
  contactSections: TableSection[] = [];
  academicSections: TableSection[] = [];
  disabilitySections: TableSection[] = [];

  atendimentosAtivos: (Atendimento & { profissionalNome?: string })[] = [];
  atendimentosHistorico: (Atendimento & { profissionalNome?: string })[] = [];
  // Substitua as duas propriedades por uma única
  tecnologiasAluno: TecnologiaAssistiva[] = [];

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private atendimentoService: AtendimentoService,
    private profissionalService: ProfissionalService,
    private tecnologiaAssistivaService: TecnologiaAssistivaService,
    private tecnologiaAlunoService: TecnologiaAlunoService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchStudentProfile(id);
    }
  }

  private fetchStudentProfile(id: string): void {
    this.alunoService.buscarPorId(id).subscribe({
      next: (response) => {
        this.student = response;
        this.updateSections();

        this.buscarAtendimentosAluno(id);
        this.buscarTecnologiasAluno(id);
      },
      error: (err) => {
        console.error('Erro ao buscar aluno:', err);
      }
    });
  }

  buscarAtendimentosAluno(alunoId: string) {
    this.atendimentoService.listarTodos().subscribe({
      next: (response) => {
        const todosAtendimentos = response.dados || [];
        const atendimentosAluno = todosAtendimentos.filter(
          (atendimento: Atendimento) => atendimento.alunoId === alunoId
        );

        const dataAtual = new Date();
        this.atendimentosAtivos = atendimentosAluno.filter(
          (atendimento: Atendimento) => new Date(atendimento.dataAtendimento) >= dataAtual
        );

        this.atendimentosHistorico = atendimentosAluno.filter(
          (atendimento: Atendimento) => new Date(atendimento.dataAtendimento) < dataAtual
        );

        this.buscarNomesProfissionais();
      },
      error: (err) => {
        console.error('Erro ao buscar atendimentos:', err);
      }
    });
  }

  buscarNomesProfissionais() {
    const profissionalIds = [
      ...new Set([
        ...this.atendimentosAtivos.map(atendimento => atendimento.profissionalId),
        ...this.atendimentosHistorico.map(atendimento => atendimento.profissionalId)
      ])
    ];

    if (profissionalIds.length === 0) {
      return;
    }

    const profissionalRequests = profissionalIds.map(id => this.profissionalService.buscarPorId(id));

    forkJoin(profissionalRequests).subscribe({
      next: (responses) => {
        const profissionalNamesMap = new Map(
          responses.map(profissional => [profissional.dados.id.toString(), profissional.dados.nome])
        );

        this.atendimentosAtivos = this.atendimentosAtivos.map(atendimento => ({
          ...atendimento,
          profissionalNome: profissionalNamesMap.get(atendimento.profissionalId) || 'Nome não encontrado'
        }));

        this.atendimentosHistorico = this.atendimentosHistorico.map(atendimento => ({
          ...atendimento,
          profissionalNome: profissionalNamesMap.get(atendimento.profissionalId) || 'Nome não encontrado'
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar nomes dos profissionais:', err);
      }
    });
  }

  buscarTecnologiasAluno(alunoId: string) {
    console.log('Iniciando busca de tecnologias para aluno ID:', alunoId);

    this.tecnologiaAlunoService.listarPorAluno(alunoId).subscribe({
      next: (response: ApiResponse<AlunoTecnologiaAssistiva[]> | AlunoTecnologiaAssistiva[]) => {
        console.log('Associações recebidas:', response);

        const associacoes = 'dados' in response ? response.dados : response;
        console.log('Número de associações:', associacoes.length);

        if (associacoes && associacoes.length > 0) {
          const tecnologiaRequests = associacoes.map((associacao: AlunoTecnologiaAssistiva) => {
            console.log('Solicitando tecnologia ID:', associacao.tecnologiaAssistivaId);
            return this.tecnologiaAssistivaService.buscarPorId(associacao.tecnologiaAssistivaId);
          });

          forkJoin(tecnologiaRequests).subscribe({
            next: (tecnologias: TecnologiaAssistiva[]) => {
              console.log('Tecnologias recebidas completas:', tecnologias);

              this.tecnologiasAluno = tecnologias.map((tecnologia: TecnologiaAssistiva) => {
                const tech = 'dados' in tecnologia && tecnologia.dados ? tecnologia.dados : tecnologia;
                console.log('Tecnologia processada:', tech);
                return tech;
              });

              console.log('Array final de tecnologias:', this.tecnologiasAluno);
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error('Erro ao buscar detalhes das tecnologias:', err);
            }
          });
        } else {
          console.log('Nenhuma associação de tecnologia encontrada para este aluno');
          this.tecnologiasAluno = [];
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar tecnologias do aluno:', err);
      }
    });
  }

  private updateSections(): void {
    if (!this.student) return;

    this.contactSections = this.createContactSections();
    this.academicSections = this.createAcademicSections();
    this.disabilitySections = this.createDisabilitySections();
  }

  private createContactSections(): TableSection[] {
    return [
      {
        title: 'Informações de Contato',
        columns: ['E-mail', 'Telefone', 'Data de Nascimento'],
        rows: [
          [
            this.student?.email || '',
            this.student?.contact_phone || '',
            this.formatDate(this.student?.date_of_birth)
          ]
        ]
      }
    ];
  }

  private createAcademicSections(): TableSection[] {
    return [
      {
        title: 'Informações Acadêmicas',
        columns: ['Unidade', 'Curso','Turno', 'Período', 'Status'],
        rows: this.student?.enrollments.map(enrollment => [
          enrollment.institution_name,
          `${enrollment.course_name} (${enrollment.course_type})`,
          enrollment.shift,
          `${this.formatDate(enrollment.start_date)} - ${this.formatDate(enrollment.end_date)}`,
          enrollment.status
        ]) || []
      }
    ];
  }

  private formatDate(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  removerTecnologia(tecnologiaId: string) {
    if (!this.student) return;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja remover esta tecnologia assistiva?',
        confirmText: 'Sim, remover',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tecnologiaAlunoService.listarPorAluno(this.student!.id.toString()).subscribe({
          next: (response: ApiResponse<AlunoTecnologiaAssistiva[]> | AlunoTecnologiaAssistiva[]) => {
            // Garantir tipo correto com verificação explícita
            const associacoes = ('dados' in response ? response.dados : response) as AlunoTecnologiaAssistiva[];

            const associacao = associacoes.find((a: AlunoTecnologiaAssistiva) =>
              a.tecnologiaAssistivaId === tecnologiaId
            );

            if (associacao && associacao.id) { // Verificando se o ID existe
              this.tecnologiaAlunoService.remover(associacao.id).subscribe({
                next: () => {
                  console.log('Tecnologia removida com sucesso');
                  // Atualiza a lista de tecnologias após a remoção
                  this.tecnologiasAluno = this.tecnologiasAluno.filter(t => t.id !== tecnologiaId);
                  this.cdr.detectChanges();
                },
                error: (err) => {
                  console.error('Erro ao remover tecnologia:', err);
                }
              });
            } else {
              console.error('Não foi possível encontrar o ID da associação para remoção');
            }
          },
          error: (err) => {
            console.error('Erro ao buscar associações:', err);
          }
        });
      }
    });
  }

  removerAtendimento(atendimentoId: string) {
    if (!this.student) return;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja remover este atendimento?',
        confirmText: 'Sim, remover',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atendimentoService.remover(atendimentoId).subscribe({
          next: () => {
            console.log('Atendimento removido com sucesso');

            // Atualiza as listas de atendimentos após a remoção
            this.atendimentosAtivos = this.atendimentosAtivos.filter(a => a.id !== atendimentoId);
            this.atendimentosHistorico = this.atendimentosHistorico.filter(a => a.id !== atendimentoId);

            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Erro ao remover atendimento:', err);
          }
        });
      }
    });
  }

  abrirPopupProfissionais() {
  if (!this.student) return;

  const dialogRef = this.dialog.open(PopupProfissionaisComponent, {
    data: {
      alunoId: this.student.id
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Popup Profissionais fechado');
  });
}

  abrirPopupTecnologias() {
    if (!this.student) return;

    const dialogRef = this.dialog.open(PopupTecnologiasComponent, {
      data: {
        alunoId: this.student.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Popup Tecnologias fechado');
    });
  }

private deficiencias: DeficienciaInfo[] = [
  // Deficiência Visual
  { nome: 'Cegueira', cid: 'H54.0', descricao: 'Cegueira, ambos os olhos' },
  { nome: 'Visão Subnormal', cid: 'H54.2', descricao: 'Visão subnormal de ambos os olhos' },
  { nome: 'Cegueira em um olho', cid: 'H54.4', descricao: 'Cegueira em um olho' },

  // Deficiência Auditiva
  { nome: 'Surdez', cid: 'H91.3', descricao: 'Surdo-mudez não classificada em outra parte' },
  { nome: 'Perda Auditiva', cid: 'H91.9', descricao: 'Perda não especificada de audição' },

  // Deficiência Física
  { nome: 'Paralisia Cerebral', cid: 'G80.0', descricao: 'Paralisia cerebral espástica' },
  { nome: 'Hemiplegia', cid: 'G81.0', descricao: 'Hemiplegia flácida' },
  { nome: 'Distrofia Muscular', cid: 'G71.0', descricao: 'Distrofia Muscular' },
  { nome: 'Nanismo', cid: 'E34.3', descricao: 'Nanismo não classificado em outra parte' },

  // Transtorno do Espectro Autista
  { nome: 'Autismo Infantil', cid: 'F84.0', descricao: 'Autismo infantil' },
  { nome: 'Síndrome de Asperger', cid: 'F84.5', descricao: 'Síndrome de Asperger' },
  { nome: 'Autismo Atípico', cid: 'F84.1', descricao: 'Autismo atípico' },

  // Deficiência Intelectual
  { nome: 'Deficiência Intelectual Leve', cid: 'F70', descricao: 'Retardo mental leve' },
  { nome: 'Deficiência Intelectual Moderada', cid: 'F71', descricao: 'Retardo mental moderado' },
  { nome: 'Deficiência Intelectual Grave', cid: 'F72', descricao: 'Retardo mental grave' },

  // TDAH
  { nome: 'Transtorno de Déficit de Atenção e Hiperatividade', cid: 'F90', descricao: 'TDAH' }
];

private determinarDeficiencias(id: string): DeficienciaInfo[] {
  const numId = parseInt(id, 10);

  const numDeficiencias = 1 + (numId % 3);

  const deficienciasSelecionadas: DeficienciaInfo[] = [];

  const seed = numId;

  let hashValue = seed;
  while (deficienciasSelecionadas.length < numDeficiencias) {
    hashValue = (hashValue * 1103515245 + 12345) % 2147483647;

    const indice = hashValue % this.deficiencias.length;

    if (!deficienciasSelecionadas.some(d => d.nome === this.deficiencias[indice].nome)) {
      deficienciasSelecionadas.push(this.deficiencias[indice]);
    }
  }

  return deficienciasSelecionadas;
}

private createDisabilitySections(): TableSection[] {
  if (!this.student || !this.student.id) {
    return [{
      title: 'Deficiência(s)',
      columns: ['Tipo', 'CID', 'Descrição'],
      rows: [['Não informado', '', '']]
    }];
  }

  const deficienciasAluno = this.determinarDeficiencias(this.student.id.toString());

  const rows = deficienciasAluno.map(deficiencia => [
    deficiencia.nome,
    deficiencia.cid || '',
    deficiencia.descricao || ''
  ]);

  return [{
    title: 'Deficiência(s)',
    columns: ['Tipo', 'CID', 'Descrição'],
    rows: rows
  }];
}

}
