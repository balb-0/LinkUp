import { ServiceTechnologyCardComponent } from './../../components/service-technology-card/service-technology-card.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../models/professional';
import { Atendimento } from '../../models/atendimento';
import { ActivatedRoute } from '@angular/router';
import { ProfissionalService } from '../../services/professionalservice';
import { AtendimentoService } from '../../services/atendimento.service';
import { AlunoService } from '../../services/aluno.service';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { InformationTableComponent, TableSection } from '../../components/information-table/information-table.component';
import { TabServiceTechnologyComponent } from "../../components/tab-service-technology/tab-service-technology.component";
import { forkJoin } from 'rxjs';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';

@Component({
  selector: 'app-professional-profile',
  imports: [CommonModule, ProfileHeaderComponent, InformationTableComponent, TabServiceTechnologyComponent, ServiceTechnologyCardComponent, StatusBadgeComponent],
  templateUrl: './professional-profile.component.html',
  styleUrl: './professional-profile.component.css'
})
export class ProfessionalProfileComponent implements OnInit {
  profissional: Profissional | null = null;
  contatoSections: TableSection[] = [];
  atendimentosAtivos: (Atendimento & { alunoNome?: string })[] = [];
  atendimentosHistorico: (Atendimento & { alunoNome?: string })[] = [];

  constructor(
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService,
    private atendimentoService: AtendimentoService,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Buscar dados do profissional
      this.profissionalService.buscarPorId(id).subscribe({
        next: (response) => {
          this.profissional = response.dados;
          this.updateSections();

          // Buscar atendimentos do profissional
          this.buscarAtendimentosProfissional(id);
        },
        error: (err) => {
          console.error('Erro ao buscar profissional:', err);
        }
      });
    }
  }

  buscarAtendimentosProfissional(profissionalId: string) {
    this.atendimentoService.listarTodos().subscribe({
      next: (response) => {
        // Filtrar atendimentos do profissional
        const todosAtendimentos = response.dados || [];
        const atendimentosProfissional = todosAtendimentos.filter(
          (atendimento: Atendimento) => atendimento.profissionalId === profissionalId
        );

        // Separar atendimentos ativos e histórico
        const dataAtual = new Date();
        this.atendimentosAtivos = atendimentosProfissional.filter(
          (atendimento: Atendimento) => new Date(atendimento.dataAtendimento) >= dataAtual
        );

        this.atendimentosHistorico = atendimentosProfissional.filter(
          (atendimento: Atendimento) => new Date(atendimento.dataAtendimento) < dataAtual
        );

        // Buscar nomes dos alunos para cada atendimento
        this.buscarNomesAlunos();
      },
      error: (err) => {
        console.error('Erro ao buscar atendimentos:', err);
      }
    });
  }

  buscarNomesAlunos() {
    // Combinar todos os IDs de alunos únicos
    const alunoIds = [
      ...new Set([
        ...this.atendimentosAtivos.map(atendimento => atendimento.alunoId),
        ...this.atendimentosHistorico.map(atendimento => atendimento.alunoId)
      ])
    ];

    // Se não houver IDs de alunos, retorne
    if (alunoIds.length === 0) {
      return;
    }

    // Usar forkJoin para buscar todos os nomes dos alunos em paralelo
    const alunoRequests = alunoIds.map(id => this.alunoService.buscarPorId(id));

    forkJoin(alunoRequests).subscribe({
      next: (responses) => {
        // Criar um mapa de IDs de alunos para nomes
        const alunoNamesMap = new Map(
          responses.map(aluno => [aluno.id.toString(), aluno.name])
        );

        // Atualizar nomes dos alunos nos atendimentos ativos
        this.atendimentosAtivos = this.atendimentosAtivos.map(atendimento => ({
          ...atendimento,
          alunoNome: alunoNamesMap.get(atendimento.alunoId) || 'Nome não encontrado'
        }));

        // Atualizar nomes dos alunos nos atendimentos históricos
        this.atendimentosHistorico = this.atendimentosHistorico.map(atendimento => ({
          ...atendimento,
          alunoNome: alunoNamesMap.get(atendimento.alunoId) || 'Nome não encontrado'
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar nomes dos alunos:', err);
      }
    });
  }

  updateSections() {
    if (this.profissional) {
      this.contatoSections = [
        {
          title: 'Informações de Contato',
          columns: ['E-mail'],
          rows: [
            [this.profissional.email || ''],
          ]
        }
      ];
    }
  }
}
