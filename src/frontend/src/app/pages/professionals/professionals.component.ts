import { SearchBarComponent } from './../../components/search-bar/search-bar.component';
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfissionalService } from '../../services/professionalservice';
import { Profissional } from '../../models/professional';
import { TableColumn, TableComponent } from '../../components/table/table.component';
import { ProfessionalRegistrationComponent } from '../../components/professional-registration/professional-registration.component';

@Component({
  selector: 'app-professionals',
  standalone: true,
  imports: [SearchBarComponent, TableComponent, ProfessionalRegistrationComponent, CommonModule, RouterLink],
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit {
  tableData: any[] = [];
  tableColumns: TableColumn[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Contato' }
  ];

  profissionais: Profissional[] = [];
  loading = false;
  error = '';

  constructor(private profissionalService: ProfissionalService, private ngZone: NgZone) {
    console.log('Constructor do componente chamado');
  }

  ngOnInit(): void {
    console.log('ngOnInit chamado');
    this.carregarProfissionais();
  }

  carregarProfissionais(): void {
    console.log('Iniciando carregamento de profissionais');
    this.loading = true;
    this.profissionalService.listarTodos()
      .subscribe({
        next: (response) => {
          console.log('Resposta recebida:', response);
          this.profissionais = response.dados || [];
          this.tableData = this.profissionais.map(profissional => ({
            nome: profissional.nome,
            email: profissional.email || 'Não informado'
          }));
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
          this.error = 'Erro ao carregar profissionais: ' + (err.message || err);
          this.loading = false;
        },
        complete: () => {
          console.log('Requisição completada');
        }
      });
  }
}
