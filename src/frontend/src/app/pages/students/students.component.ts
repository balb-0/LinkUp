import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import axios from 'axios';

import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { DropDownComponent } from '../../components/drop-down/drop-down.component';
import { TableComponent, TableColumn } from '../../components/table/table.component';

interface Instituicao {
  id: number;
  name: string;
}

interface Estudante {
  id: number;
  nome: string;
  unidade?: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SearchBarComponent,
    DropDownComponent,
    TableComponent
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentsComponent implements OnInit {

  colunasDaTabela: TableColumn[] = [
    { key: 'name', header: 'Nome' },
    { key: 'academic_id', header: 'RA' },
    { key: 'contact_phone', header: 'Telefone'}
  ];

  allEstudantes: Estudante[] = [];
  estudantesFiltrados: Estudante[] = [];

  instituicoes: Instituicao[] = [];
  opcoesDropdown: string[] = [];
  minhaVariavelSelecionada: string = '';
  searchTerm: string = '';

  paginaAtual: number = 0;
  tamanhoPagina: number = 6;
  totalRegistros: number = 0;

  loading: boolean = false;
  error: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.buscarInstituicoes();
  }

  async buscarInstituicoes() {
    try {
      const response = await axios.get<Instituicao[]>('http://localhost:3000/api/alunos/institutions');
      this.instituicoes = response.data;
      this.opcoesDropdown = this.instituicoes.map(inst => inst.name);
    } catch (erro) {
      this.handleError('Erro ao buscar instituições', erro);
    }
  }

  async carregarEstudantes() {
    const instituicaoSelecionada = this.instituicoes.find(inst => inst.name === this.minhaVariavelSelecionada);
    if (!instituicaoSelecionada) return;

    this.loading = true;
    this.error = '';

    try {
      const response = await axios.get(
        `http://localhost:3000/api/alunos/institutions/${instituicaoSelecionada.id}/students`
      );

      if (Array.isArray(response.data)) {
        this.allEstudantes = response.data.map((estudante: any) => ({
          ...estudante,
          nome: estudante.name,
          unidade: instituicaoSelecionada.name
        }));

        this.applyFilter();
      }
    } catch (erro) {
      this.handleError('Erro ao carregar estudantes', erro);
    } finally {
      this.loading = false;
    }
  }

  async onItemSelected(nomeInstituicao: string) {
    this.minhaVariavelSelecionada = nomeInstituicao;
    this.paginaAtual = 0;
    await this.carregarEstudantes();
  }

  handleSearch(term: string): void {
    this.searchTerm = term;
    this.paginaAtual = 0;
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.estudantesFiltrados = [...this.allEstudantes];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.estudantesFiltrados = this.allEstudantes.filter(estudante =>
        estudante.nome.toLowerCase().includes(term)
      );
    }

    this.totalRegistros = this.estudantesFiltrados.length;
  }

  onPageEvent(event: { page: number, pageSize: number }): void {
    this.paginaAtual = event.page;
    this.tamanhoPagina = event.pageSize;
  }

  private handleError(message: string, erro: any): void {
    this.error = message;
    console.error(message, erro);
  }

  navegarParaPerfil(estudante: any): void {
    const estudanteCompleto = this.allEstudantes.find(e =>
      e.nome === estudante.name && e.unidade === estudante.unidade
    );

    if (estudanteCompleto) {
      this.router.navigate(['/student', estudanteCompleto.id]);
    }
  }

}
