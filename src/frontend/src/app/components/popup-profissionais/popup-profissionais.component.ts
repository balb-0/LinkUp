import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';
import { TableComponent, TableColumn } from '../table/table.component';
import { ButtonComponent } from '../button/button.component';

import { ProfissionalService } from '../../services/professionalservice';
import { AtendimentoService } from '../../services/atendimento.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Profissional } from '../../models/professional';


@Component({
  selector: 'app-popup-profissionais',
  templateUrl: './popup-profissionais.component.html',
  styleUrls: ['./popup-profissionais.component.css'],
  imports: [
    SearchBarComponent,
    DateTimePickerComponent,
    MatButtonModule,
    TableComponent,
    ButtonComponent,
    MatIconModule
  ]
})
export class PopupProfissionaisComponent implements OnInit {
  alunoId!: number;
  profissionalSelecionadoId!: string;
  dataSelecionada!: Date;
  tipoAtendimento: string = 'Atendimento Padrão';
  searchText: string = '';

  tableData: Profissional[] = [];
  tableColumns: TableColumn[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Contato' }
  ];

  profissionais: Profissional[] = [];

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<PopupProfissionaisComponent>,
    private profissionalService: ProfissionalService,
    private atendimentoService: AtendimentoService,
    private snackBarService: SnackBarService, 
    @Inject(MAT_DIALOG_DATA) public data: { alunoId: number }
  ) {
    this.alunoId = data.alunoId;
    console.log('ID do aluno recebido no popup:', this.alunoId)
  }

  ngOnInit(): void {
    this.carregarProfissionais();
  }

  carregarProfissionais(): void {
    this.profissionalService.listarComPaginacao(0, 50).subscribe({
      next: (response) => {
        if (response && response.dados) {
          this.profissionais = response.dados.profissionais || [];
          this.tableData = this.profissionais;
        } else {
          console.error('Formato de resposta inesperado:', response);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar profissionais:', err);
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSearch(searchTerm: string): void {
    this.searchText = searchTerm.trim().toLowerCase();

    if (!this.searchText) {
      this.tableData = this.profissionais;
      return;
    }

    this.tableData = this.profissionais.filter(prof =>
      prof.nome.toLowerCase().includes(this.searchText)
    );
  }

  onDataSelecionada(data: Date): void {
    console.log('Data recebida do date-time-picker:', data);
    this.dataSelecionada = data;
  }

  selecionarProfissional(profissional: Profissional): void {
    if (!profissional?.id) {
      console.warn('Profissional inválido');
      return;
    }

    this.profissionalSelecionadoId = profissional.id.toString();
    console.log('Profissional selecionado:', profissional);
  }

  criarAtendimento(): void {
    console.log('Profissional:', this.profissionalSelecionadoId);
    console.log('Data selecionada:', this.dataSelecionada);

    if (!this.profissionalSelecionadoId || !this.dataSelecionada) {
      this.snackBarService.showMessage('Preencha todos os campos antes de confirmar.', true, '', 'top');
      return;
    }

    function formatarParaMySQL(data: Date): string {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const ano = data.getFullYear();
      const mes = pad(data.getMonth() + 1); // meses começam do 0
      const dia = pad(data.getDate());
      const hora = pad(data.getHours());
      const minuto = pad(data.getMinutes());
      const segundo = pad(data.getSeconds());
      return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
    }

    const dataFormatada = formatarParaMySQL(this.dataSelecionada);

    const novoAtendimento = {
      alunoId: this.alunoId.toString(),
      profissionalId: this.profissionalSelecionadoId,
      dataAtendimento: dataFormatada,
      tipoAtendimento: this.tipoAtendimento
    };

    console.log('Novo atendimento formatado:', novoAtendimento);

    this.atendimentoService.criar(novoAtendimento).subscribe({
      next: (res) => {
        this.snackBarService.showMessage('Atendimento criado com sucesso!', false, 'snackbar-success', 'top');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao criar atendimento:', err);
        this.snackBarService.showMessage('Erro ao criar atendimento. Verifique os dados e tente novamente.', true, 'snackbar-error', 'top');
      }
    });
  }
}
