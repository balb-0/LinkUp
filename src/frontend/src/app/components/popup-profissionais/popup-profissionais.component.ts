import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { TableColumn } from '../table/table.component';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfissionalService } from '../../services/professionalservice';
import { Profissional } from '../../models/professional';


@Component({
  selector: 'app-popup-profissionais',
  templateUrl: './popup-profissionais.component.html',
  styleUrls: ['./popup-profissionais.component.css'],
  imports: [
    SearchBarComponent,
    DateTimePickerComponent,
    NgIf,
    MatButtonModule,
    TableComponent,
    ButtonComponent,
    MatIconModule
  ]
})
export class PopupProfissionaisComponent implements OnInit {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<PopupProfissionaisComponent>,
    private profissionalService: ProfissionalService
  ) {}

  searchText: string = '';

  // Dados da tabela
  tableData: any[] = [];
  tableColumns: TableColumn[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'contato', header: 'Contato' }
  ];

  // Armazena os profissionais carregados
  profissionais: Profissional[] = [];

  ngOnInit(): void {
    this.carregarProfissionais();
  }

  carregarProfissionais(): void {
    // Exemplo: carregando os primeiros 50 profissionais (ajuste os parâmetros conforme necessário)
    this.profissionalService.listarComPaginacao(0, 50)
      .subscribe({
        next: (response) => {
          if (response && response.dados) {
            const { profissionais } = response.dados;
            this.profissionais = profissionais || [];
            this.tableData = this.profissionais.map(prof => ({
              nome: prof.nome,
              contato: prof.email || 'Não informado'
            }));
          } else {
            console.error('Formato de resposta inesperado:', response);
          }
        },
        error: (err) => {
          console.error('Erro ao carregar profissionais:', err);
        }
      });
  }

  onSearch(searchTerm: string) {
  this.searchText = searchTerm.trim().toLowerCase();

  // Se não houver texto de busca, retorna todos
  if (!this.searchText) {
    this.tableData = this.profissionais.map(prof => ({
      nome: prof.nome,
      contato: prof.email || 'Não informado'
    }));
    return;
  }

  // Caso contrário, filtra a lista de profissionais
  const filtered = this.profissionais.filter(prof =>
    prof.nome.toLowerCase().includes(this.searchText)
    // Se quiser buscar também por e-mail, inclua outra condição:
    // || prof.email.toLowerCase().includes(this.searchText)
  );

  // Atualiza tableData com os itens filtrados
  this.tableData = filtered.map(prof => ({
    nome: prof.nome,
    contato: prof.email || 'Não informado'
  }));
}

  closeDialog() {
    this.dialogRef.close();
  }
}
