import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-service-technology',
  imports: [CommonModule],
  templateUrl: './tab-service-technology.component.html',
  styleUrl: './tab-service-technology.component.css',
  standalone: true
})
export class TabServiceTechnologyComponent {
  @Input() titulo: string = 'Atendimentos Profissionais';
  @Input() textoAtendimentos: string = 'Atendimentos';
  @Input() textoHistorico: string = 'Histórico';
  
  abaSelecionada: 'atendimentos' | 'historico' = 'atendimentos';
  
  selecionarAba(aba: 'atendimentos' | 'historico'): void {
    this.abaSelecionada = aba;
  }
}
