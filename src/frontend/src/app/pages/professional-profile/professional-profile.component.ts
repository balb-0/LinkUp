import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../models/professional';
import { ActivatedRoute } from '@angular/router';
import { ProfissionalService } from '../../services/professionalservice';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { InformationTableComponent, TableSection } from '../../components/information-table/information-table.component';
import { TabServiceTechnologyComponent } from "../../components/tab-service-technology/tab-service-technology.component";
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';

@Component({
  selector: 'app-professional-profile',
  imports: [CommonModule, ProfileHeaderComponent, InformationTableComponent, TabServiceTechnologyComponent, StatusBadgeComponent],
  templateUrl: './professional-profile.component.html',
  styleUrl: './professional-profile.component.css'
})
export class ProfessionalProfileComponent implements OnInit {
  profissional: Profissional | null = null;
  contatoSections: TableSection[] = [];

  constructor(
    private route: ActivatedRoute,
    private profissionalService: ProfissionalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profissionalService.buscarPorId(id).subscribe({
        next: (response) => {
          this.profissional = response.dados;
          this.updateSections();
        },
        error: (err) => {
          console.error('Erro ao buscar profissional:', err);
        }
      });
    }
  }

  updateSections() {
    if (this.profissional) {
      this.contatoSections = [
        {
          title: 'Informações de Contato',
          columns: ['E-mail'],
          rows: [
            [this.profissional.email || ''],
          ]
        }
      ];
    }
  }
}
