import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from "../add-button/add-button.component";

@Component({
  selector: 'app-tab-service-technology',
  imports: [CommonModule, AddButtonComponent],
  templateUrl: './tab-service-technology.component.html',
  styleUrl: './tab-service-technology.component.css',
  standalone: true
})
export class TabServiceTechnologyComponent {
  @Input() titulo: string = 'Atendimentos Profissionais';
  @Input() textoAtendimentos: string = 'Atendimentos';
  @Input() textoHistorico: string = 'Histórico';
  @Input() botaoAdicionar: boolean = false;
  @Input() textoBotaoAdicionar: string = 'Adicionar';

  abaSelecionada: 'atendimentos' | 'historico' = 'atendimentos';

  selecionarAba(aba: 'atendimentos' | 'historico'): void {
    this.abaSelecionada = aba;
  }
}
