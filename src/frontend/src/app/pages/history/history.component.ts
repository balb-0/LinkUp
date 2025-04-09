import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableComponent, TableColumn } from '../../components/table/table.component';
import axios from 'axios';

// Interface para a resposta da API
interface ApiResponse {
  dados?: {
    logs: any[];
    total: number;
    totalPages: number;
  };
  data?: {
    logs: any[];
    total: number;
    totalPages: number;
  };
  logs?: any[];
  total?: number;
  totalPages?: number;
}

@Component({
  selector: 'app-history',
  imports: [TableComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit, OnDestroy {
  colunasDaTabela: TableColumn[] = [
    { key: 'data', header: 'Data/Hora' },
    { key: 'usuario', header: 'Usuario' },
    { key: 'acao', header: 'Ação' }
  ];

  dadosDaTabela: any[] = [];
  dadosOriginais: any[] = [];
  
  // Parâmetros de paginação
  paginaAtual = 1;
  itensPorPagina = 10;
  totalDeRegistros = 0;
  totalDePaginas = 0;

  // Intervalo para atualização automática (a cada 10 segundos)
  private atualizacaoAutomatica: any;

  async ngOnInit(){
    await this.carregarDados();
    
    // Configura atualização automática a cada 10 segundos
    this.atualizacaoAutomatica = setInterval(() => {
      this.carregarDados(this.paginaAtual);
    }, 10000);
  }

  ngOnDestroy() {
    // Limpa o intervalo de atualização quando o componente é destruído
    if (this.atualizacaoAutomatica) {
      clearInterval(this.atualizacaoAutomatica);
    }
  }
  
  async carregarDados(pagina: number = 1) {
    try {
      console.log('Carregando dados da página', pagina);
      this.paginaAtual = pagina;
      
      // Adiciona um timestamp para evitar cache do navegador
      const timestamp = new Date().getTime();
      const response = await axios.get(
        `http://localhost:3000/api/historico?page=${this.paginaAtual}&limit=${this.itensPorPagina}&_=${timestamp}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      console.log('Resposta da API:', response.data);
      
      // Cast da resposta para o tipo definido
      const responseData = response.data as ApiResponse;
      
      // Verifica a estrutura da resposta para compatibilidade
      let data: ApiResponse;
      if (responseData.dados) {
        // Formato: { dados: { logs: [], ... } }
        data = responseData.dados;
      } else if (responseData.data && responseData.data.logs) {
        // Formato: { data: { logs: [], ... } }
        data = responseData.data;
      } else if (responseData.logs) {
        // Formato: { logs: [], ... }
        data = responseData;
      } else {
        console.error('Formato de resposta desconhecido:', responseData);
        throw new Error('Formato de resposta desconhecido');
      }
      
      // Atualizar informações de paginação
      this.totalDeRegistros = data.total || 0;
      this.totalDePaginas = data.totalPages || Math.ceil(this.totalDeRegistros / this.itensPorPagina);
      
      // Verificar se logs existe e é uma array
      const logs = Array.isArray(data.logs) ? data.logs : [];
      
      // Armazenar os dados originais para uso posterior
      this.dadosOriginais = logs;
      
      // Processar os dados para o formato da tabela
      this.dadosDaTabela = logs.map((item: any, index: number) => {
        // Criar uma string de descrição da ação baseada nos valores
        let acaoDetalhada = item.acao;
        
        if (item.detalhes) {
          if (item.detalhes.valores_anteriores) {
            const valoresAnteriores = JSON.stringify(item.detalhes.valores_anteriores);
            acaoDetalhada += ` (de: ${this.truncarTexto(valoresAnteriores, 50)})`;
          }
          
          if (item.detalhes.valores_novos) {
            const valoresNovos = JSON.stringify(item.detalhes.valores_novos);
            acaoDetalhada += ` (para: ${this.truncarTexto(valoresNovos, 50)})`;
          }
        }
        
        return {
          id: index, // Adicionar um ID para associar com os dados originais
          data: this.formatarData(item.data),
          usuario: item.usuario,
          acao: acaoDetalhada
        };
      });
    } catch (erro) {
      this.handleError('Erro ao buscar dados da tabela', erro);
      alert('Erro ao carregar os dados do histórico. Verifique o console para mais detalhes.');
    }
  }
  
  async mudarPagina(event: any) {
    await this.carregarDados(event.page + 1);
  }

  // Método para forçar uma atualização manual
  async atualizarAgora() {
    await this.carregarDados(this.paginaAtual);
  }

  onRowClick(item: any): void {
    // Recuperar os dados originais completos
    const dadoOriginal = this.dadosOriginais[item.id];
    if (!dadoOriginal) return;
    
    // Formatar os detalhes para melhor visualização
    let detalhes = '';
    
    if (dadoOriginal.detalhes && (dadoOriginal.detalhes.valores_anteriores || dadoOriginal.detalhes.valores_novos)) {
      if (dadoOriginal.detalhes.valores_anteriores) {
        detalhes += `Valores anteriores:\n${JSON.stringify(dadoOriginal.detalhes.valores_anteriores, null, 2)}\n\n`;
      }
      
      if (dadoOriginal.detalhes.valores_novos) {
        detalhes += `Valores novos:\n${JSON.stringify(dadoOriginal.detalhes.valores_novos, null, 2)}`;
      }
      
      // Exibir um alerta com os detalhes completos
      alert(`Detalhes do registro:\n\nData: ${this.formatarData(dadoOriginal.data)}\nUsuário: ${dadoOriginal.usuario}\nAção: ${dadoOriginal.acao}\n\n${detalhes}`);
    }
  }

  private formatarData(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR');
  }
  
  private truncarTexto(texto: string, tamanhoMaximo: number): string {
    if (texto.length <= tamanhoMaximo) {
      return texto;
    }
    return texto.substring(0, tamanhoMaximo) + '...';
  }

  private handleError(message: string, erro: any): void {
    console.error(message, erro);
  }
}
