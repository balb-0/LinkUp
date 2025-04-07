import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private atendimentoService: AtendimentoService,
    private profissionalService: ProfissionalService,
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

  private createDisabilitySections(): TableSection[] {
    return [
      {
        title: 'Deficiência(s)',
        columns: ['', '', ''],
        rows: [[]]
      }
    ];
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

}
