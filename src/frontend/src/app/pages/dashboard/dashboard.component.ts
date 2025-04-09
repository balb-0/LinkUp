import { Component, OnInit } from '@angular/core';
import { RadialGaugeComponent } from '../../components/radial-gauge/radial-gauge.component';
import { DashboardInfoComponent } from '../../components/dashboard-info/dashboard-info.component';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RadialGaugeComponent, DashboardInfoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardInfo = [
    { label: 'Total de Alunos', value: '0' },
    { label: 'Alunos Atendidos (em todas unidades)', value: '0' },
  ];
  
  percentualAtendimento = 0;
  instituicoes: { id: number, name: string }[] = [];
  opcoesDropdown: string[] = [];
  selecionada: string = '';

  ngOnInit() {
    this.buscarInstituicoes();
  }

  async buscarInstituicoes() {
    try {
      const res = await axios.get('http://localhost:3000/api/alunos/institutions');
      this.instituicoes = res.data;
      this.opcoesDropdown = this.instituicoes.map(i => i.name);
      
    } catch (e) {
      console.error('Erro ao buscar instituições', e);
    }
  }

  async buscarDados(id: number) {
    try {
      const res = await axios.get(`http://localhost:3000/api/dashboard/alunos-atendidos?institutionId=${id}`);
      const dados = res.data.dados;

      const total = dados.total_alunos || 0;
      const atendidos = dados.total_alunos_atendidos || 0;

      this.percentualAtendimento = total > 0 ? Math.round((atendidos / total) * 100) : 0;

      this.dashboardInfo = [
        { label: 'Total de Alunos', value: total.toString() },
        { label: 'Alunos Atendidos (em todas unidades)', value: atendidos.toString() },
      ];
    } catch (e) {
      console.error('Erro ao buscar dados de atendimento', e);
    }
  }

  onSelecionado(nome: string) {
    this.selecionada = nome;
    const inst = this.instituicoes.find(i => i.name === nome);
    if (inst) this.buscarDados(inst.id);
  }
}
