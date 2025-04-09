import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin, of, catchError } from 'rxjs';

import { DropDownComponent } from '../drop-down/drop-down.component';
import { SnackBarService } from '../../services/snack-bar.service';

import { TecnologiaAssistivaService } from '../../services/tecnologia-assistiva.service';
import { TecnologiaAlunoService } from '../../services/tecnologia-aluno.service';
import { TecnologiaAssistiva } from '../../models/tecnologiaAssistiva';

@Component({
  selector: 'app-popup-tec-assistiva',
  templateUrl: './popup-tec-assistiva.component.html',
  styleUrls: ['./popup-tec-assistiva.component.css'],
  imports: [
    NgIf,
    NgFor,
    DropDownComponent,
    MatIconModule,
  ],
  standalone: true
})
export class PopupTecnologiasComponent implements OnInit {
  alunoId!: string;
  tecnologias: TecnologiaAssistiva[] = [];
  nomesParaDropdown: string[] = [];
  tecnologiasSelecionadas: string[] = [];
  mapaNomeParaTecnologia: Map<string, TecnologiaAssistiva> = new Map();
  processando: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PopupTecnologiasComponent>,
    private tecnologiaService: TecnologiaAssistivaService,
    private tecnologiaAlunoService: TecnologiaAlunoService,
    private snackBarService: SnackBarService, 
    @Inject(MAT_DIALOG_DATA) public data: { alunoId: string }
  ) {
    this.alunoId = data.alunoId;
    console.log('ID do aluno recebido no popup de tecnologias:', this.alunoId);
  }

  ngOnInit(): void {
    this.carregarTecnologias();
  }

  carregarTecnologias(): void {
    this.tecnologiaService.listarTodos().subscribe({
      next: (response: any) => {
        console.log('Resposta bruta da API:', response);

        // Extrair as tecnologias da resposta
        let tecnologiasArray: TecnologiaAssistiva[] = [];

        if (Array.isArray(response)) {
          tecnologiasArray = response as TecnologiaAssistiva[];
        } else if (response && typeof response === 'object') {
          if ('dados' in response && response.dados) {
            if (Array.isArray(response.dados)) {
              tecnologiasArray = response.dados as TecnologiaAssistiva[];
            } else if ('tecnologias' in response.dados && Array.isArray(response.dados.tecnologias)) {
              tecnologiasArray = response.dados.tecnologias as TecnologiaAssistiva[];
            }
          } else if ('data' in response && Array.isArray(response.data)) {
            tecnologiasArray = response.data as TecnologiaAssistiva[];
          } else if ('tecnologias' in response && Array.isArray(response.tecnologias)) {
            tecnologiasArray = response.tecnologias as TecnologiaAssistiva[];
          } else {
            Object.keys(response).forEach(key => {
              if (Array.isArray(response[key])) {
                tecnologiasArray = response[key] as TecnologiaAssistiva[];
              }
            });
          }
        }

        this.tecnologias = tecnologiasArray;
        console.log('Tecnologias extraídas:', this.tecnologias);

        this.atualizarNomesDropdown();
      },
      error: (err) => {
        console.error('Erro ao carregar tecnologias assistivas:', err);
      }
    });
  }

  atualizarNomesDropdown(): void {
    this.nomesParaDropdown = [];
    this.mapaNomeParaTecnologia.clear();

    if (Array.isArray(this.tecnologias)) {
      this.tecnologias.forEach(tech => {
        if (tech && typeof tech === 'object' && 'nome' in tech && tech.nome) {
          this.nomesParaDropdown.push(tech.nome);
          this.mapaNomeParaTecnologia.set(tech.nome, tech);
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onTecnologiaSelecionada(itemSelecionado: string): void {
    if (!itemSelecionado) return;

    if (!this.tecnologiasSelecionadas.includes(itemSelecionado)) {
      this.tecnologiasSelecionadas.push(itemSelecionado);
      console.log('Tecnologia selecionada:', itemSelecionado);
    }
  }

  removerTecnologia(nome: string): void {
    const index = this.tecnologiasSelecionadas.indexOf(nome);
    if (index >= 0) {
      this.tecnologiasSelecionadas.splice(index, 1);
    }
  }

  confirm(): void {
    if (this.tecnologiasSelecionadas.length === 0) {
      this.snackBarService.showMessage('Selecione pelo menos uma tecnologia assistiva antes de confirmar.', true);
      return;
    }

    if (this.processando) {
      return; // Evita cliques duplos
    }

    this.processando = true;

    // Array para armazenar todas as observáveis de associação
    const associacoes = this.tecnologiasSelecionadas
      .map(nome => {
        const tecnologia = this.mapaNomeParaTecnologia.get(nome);

        if (tecnologia && tecnologia.id) {
          const associacao: any = {
            alunoId: String(this.alunoId),
            tecnologiaAssistivaId: String(tecnologia.id)
          };

          console.log('Enviando associação:', associacao);

          // Retorna a observable com tratamento de erro para cada associação
          return this.tecnologiaAlunoService.associar(associacao)
            .pipe(
              catchError(error => {
                console.error(`Erro ao associar tecnologia ${tecnologia.nome}:`, error);
                return of(null); // Retorna um valor nulo em caso de erro, mas não interrompe as outras associações
              })
            );
        }
        return of(null); // Para tecnologias sem ID
      })
      .filter(obs => obs !== null); // Remover observáveis nulas

    // Se não houver associações válidas
    if (associacoes.length === 0) {
      this.processando = false;
      this.snackBarService.showMessage('Nenhuma tecnologia válida para associar.', true);
      return;
    }

    // Usar forkJoin para processar todas as observáveis em paralelo
    forkJoin(associacoes).subscribe({
      next: (results) => {
        console.log('Resultados das associações:', results);

        const sucessos = results.filter(r => r !== null).length;
        const total = this.tecnologiasSelecionadas.length;

        if (sucessos === 0) {
          this.snackBarService.showMessage('Erro ao associar as tecnologias assistivas. Verifique os dados e tente novamente.', true);
        } else if (sucessos < total) {
          this.snackBarService.showMessage(`${sucessos} de ${total} tecnologias foram associadas com sucesso.`, false);
        } else {
          this.snackBarService.showMessage('Todas as tecnologias assistivas foram associadas com sucesso!', false);
        }

        this.processando = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro geral ao processar associações:', err);
        this.snackBarService.showMessage('Erro ao associar tecnologias assistivas. Verifique os dados e tente novamente.', true);
        this.processando = false;
      }
    });
  }
}
