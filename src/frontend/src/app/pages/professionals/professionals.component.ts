import { SearchBarComponent } from './../../components/search-bar/search-bar.component';
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProfissionalService } from '../../services/professionalservice';
import { Profissional } from '../../models/professional';
import { TableColumn, TableComponent } from '../../components/table/table.component';
import { ProfessionalRegistrationComponent } from '../../components/professional-registration/professional-registration.component';
import { ProfessionalStateService } from '../../services/professional-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-professionals',
  standalone: true,
  imports: [SearchBarComponent, TableComponent, ProfessionalRegistrationComponent, CommonModule],
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

  paginaAtual = 0;
  tamanhoPagina = 6;
  totalRegistros = 0;

  constructor(
    private profissionalService: ProfissionalService,
    private professionalState: ProfessionalStateService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('Constructor do componente chamado');
  }

  ngOnInit(): void {
    console.log('ngOnInit chamado');
    
    // Primeiro, verificar se temos um parâmetro de atualização na URL
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        console.log('Atualização forçada detectada:', params['refresh']);
        // Reiniciar para a primeira página quando houver atualização forçada
        this.paginaAtual = 0;
      }
      
      // Carregar profissionais (agora com a página possivelmente atualizada)
      this.carregarProfissionais();
    });
    
    // Verificar o estado atual após carregar da API
    this.subscription = this.professionalState.profissionais$.subscribe(profissionais => {
      // Só atualiza a variável local se o estado tiver dados e as listas forem diferentes
      if (profissionais && profissionais.length > 0 && 
          JSON.stringify(profissionais) !== JSON.stringify(this.profissionais)) {
        console.log('Atualizando da state', profissionais.length);
        this.applyFilter();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  carregarProfissionais(): void {
    console.log(`Carregando profissionais - Página: ${this.paginaAtual}, Tamanho: ${this.tamanhoPagina}`);
    this.loading = true;

    this.profissionalService.listarComPaginacao(this.paginaAtual, this.tamanhoPagina)
      .subscribe({
        next: (response) => {
          console.log('Resposta paginada recebida:', response);

          if (response && response.dados) {
            const { profissionais, total } = response.dados;

            this.profissionais = profissionais || [];
            this.totalRegistros = total || 0;
            
            // Atualizar o tableData imediatamente com os profissionais carregados
            this.updateTableData();
            
            this.loading = false;
          } else {
            console.error('Formato de resposta inesperado:', response);
            this.error = 'Erro: formato de resposta inválido';
            this.loading = false;
          }
        },
        error: (err) => {
          console.error('Erro na requisição paginada:', err);
          this.error = 'Erro ao carregar profissionais: ' + (err.message || err);
          this.loading = false;
        }
      });
  }

  mudarPagina(pagina: number): void {
    if (pagina !== this.paginaAtual && pagina >= 0) {
      this.paginaAtual = pagina;
      this.carregarProfissionais();
    }
  }

  mudarTamanhoPagina(tamanho: number): void {
    if (tamanho !== this.tamanhoPagina && tamanho > 0) {
      this.tamanhoPagina = tamanho;
      this.paginaAtual = 0; // Volta para a primeira página
      this.carregarProfissionais();
    }
  }

  onPageEvent(event: {page: number, pageSize: number}): void {
    this.paginaAtual = event.page;
    this.tamanhoPagina = event.pageSize;
    this.carregarProfissionais();
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
        (prof.email && prof.email.toLowerCase().includes(searchTermLower)) ||
        (prof.ocupacao && prof.ocupacao.toLowerCase().includes(searchTermLower))
      );
    }

    // Atualizar a visualização da tabela com os resultados filtrados
    this.tableData = this.filteredProfissionais.map(profissional => ({
      nome: profissional.nome,
      email: profissional.email || 'Não informado'
    }));
  }

  updateTableData(): void {
    // Usar diretamente this.profissionais para a tabela, não a versão filtrada
    this.tableData = this.profissionais.map(profissional => ({
      nome: profissional.nome,
      email: profissional.email || 'Não informado'
    }));
  }

  navegarParaPerfil(profissional: any): void {
    const profissionalCompleto = this.profissionais.find(p =>
      p.nome === profissional.nome && p.email === profissional.email
    );

    if (profissionalCompleto) {
      this.router.navigate(['/professional', profissionalCompleto.id]);
    }
  }
}
