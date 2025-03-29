import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface para definir a estrutura de uma seção da tabela
 * @property title - Título da seção
 * @property columns - Array com os nomes das colunas
 * @property rows - Array bidimensional com os dados das linhas (vazio para campos de entrada)
 */

export interface TableSection {
  title: string;
  columns: string[];
  rows: string[][];
}

/**
 * Componente de tabela de informações reutilizável
 *
 * Uso:
 * 1. Importe o componente: import { InformationTableComponent, TableSection } from 'path/to/information-table.component';
 * 2. Adicione aos imports: imports: [CommonModule, InformationTableComponent]
 * 3. Crie os dados: tableSections: TableSection[] = [{ title, columns, rows }];
 * 4. HTML: <app-information-table [sections]="tableSections"></app-information-table>
 */
@Component({
  selector: 'app-information-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information-table.component.html',
  styleUrl: './information-table.component.css'
})
export class InformationTableComponent {
  @Input() sections: TableSection[] = [];
}
