import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TecnologiaAssistivaService } from '../../services/tecnologia-assistiva.service';
import { TecnologiaAssistiva } from '../../../../../backend/src/models/tecnologiaAssistiva';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, DropDownComponent, DateTimePickerComponent],
  templateUrl: './popup-tec-assistiva.component.html',
  styleUrls: ['./popup-tec-assistiva.component.css'],
})
export class PopupTecAssistivaComponent implements OnInit {
  tecnologias: string[] = [];
  tecnologiasSelecionadas: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<PopupTecAssistivaComponent>,
    private tecnologiaService: TecnologiaAssistivaService
  ) {}

  ngOnInit(): void {
    this.tecnologiaService.listarTodas().subscribe({
      next: (res: string[]) => {
        this.tecnologias = res;
      },
      error: (err) => {
        console.error('Erro ao carregar tecnologias assistivas:', err);
        this.tecnologias = [];
      },
    });
  }

  onTecnologiaSelecionada(tecnologia: string) {
    if (!this.tecnologiasSelecionadas.includes(tecnologia)) {
      this.tecnologiasSelecionadas.push(tecnologia);
    }
  }

  removerTecnologia(tecnologia: string) {
    this.tecnologiasSelecionadas = this.tecnologiasSelecionadas.filter(t => t !== tecnologia);
  }

  confirm() {
    console.log('Selecionadas:', this.tecnologiasSelecionadas);
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
