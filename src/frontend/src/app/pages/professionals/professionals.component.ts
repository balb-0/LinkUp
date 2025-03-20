import { SearchBarComponent } from './../../components/search-bar/search-bar.component';
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfissionalService } from '../../services/professionalservice';
import { Profissional } from '../../models/professional';
import { TableColumn, TableComponent } from '../../components/table/table.component';
import { ProfessionalRegistrationComponent } from '../../components/professional-registration/professional-registration.component';
import { ProfessionalStateService } from '../../services/professional-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-professionals',
  standalone: true,
  imports: [SearchBarComponent, TableComponent, ProfessionalRegistrationComponent, CommonModule, RouterLink],
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit, OnDestroy {
  tableData: any[] = [];
  tableColumns: TableColumn[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Contato' }
  ];

  profissionais: Profissional[] = [];
  filteredProfissionais: Profissional[] = [];
  searchTerm: string = '';
  loading = false;
  error = '';
  private subscription: Subscription | null = null;

  constructor(
    private profissionalService: ProfissionalService,
    private professionalState: ProfessionalStateService,
    private ngZone: NgZone
  ) {
    console.log('Constructor do componente chamado');
  }

  ngOnInit(): void {
    console.log('ngOnInit chamado');
    this.carregarProfissionais();
    
    // Inscreve-se nas mudanças do estado
    this.subscription = this.professionalState.profissionais$.subscribe(profissionais => {
      this.profissionais = profissionais;
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  carregarProfissionais(): void {
    console.log('Iniciando carregamento de profissionais');
    this.loading = true;
    this.profissionalService.listarTodos()
      .subscribe({
        next: (response) => {
          console.log('Resposta recebida:', response);
          const profissionais = response.dados || [];
          this.professionalState.setProfissionais(profissionais);
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

  handleSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredProfissionais = [...this.profissionais];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredProfissionais = this.profissionais.filter(prof => 
        prof.nome.toLowerCase().includes(searchTermLower) || 
        prof.email.toLowerCase().includes(searchTermLower) ||
        prof.ocupacao.toLowerCase().includes(searchTermLower)
      );
    }

    this.updateTableData();
  }

  updateTableData(): void {
    this.tableData = this.filteredProfissionais.map(profissional => ({
      nome: profissional.nome,
      email: profissional.email || 'Não informado'
    }));
  }
}
