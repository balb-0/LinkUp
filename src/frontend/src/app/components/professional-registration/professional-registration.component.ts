import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfissionalService } from '../../services/professionalservice';
import { Profissional } from '../../models/professional';
import { Router } from '@angular/router';
import { ProfessionalStateService } from '../../services/professional-state.service';

@Component({
  selector: 'app-professional-registration',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './professional-registration.component.html',
  styleUrl: './professional-registration.component.css'
})
export class ProfessionalRegistrationComponent implements OnInit {
  profissionalForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profissionalService: ProfissionalService,
    private professionalState: ProfessionalStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.profissionalForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ocupacao: ['', [Validators.required]]
    });
  }

  cadastrarProfissional(): void {
    if (this.profissionalForm.invalid) {
      Object.keys(this.profissionalForm.controls).forEach(key => {
        this.profissionalForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const profissional: Profissional = {
      nome: this.profissionalForm.get('nome')?.value,
      email: this.profissionalForm.get('email')?.value,
      ocupacao: this.profissionalForm.get('ocupacao')?.value,
      dataCadastro: new Date(),
      ativo: true
    };

    this.profissionalService.criar(profissional).subscribe({
      next: (response: any) => {
        console.log('Profissional cadastrado com sucesso', response);
        // Limpar formulário após sucesso
        this.profissionalForm.reset();
        this.isSubmitting = false;
        
        // Adiciona o novo profissional ao estado
        this.professionalState.addProfissional(response.dados);
        
        // Limpar o cache
        this.profissionalService.limparCache().subscribe({
          next: () => {
            console.log('Cache limpo com sucesso');
          },
          error: (error) => {
            console.error('Erro ao limpar cache:', error);
          }
        });
      },
      error: (erro: any) => {
        console.error('Erro ao cadastrar profissional', erro);
        this.errorMessage = erro.error?.message || 'Erro ao cadastrar profissional';
        this.isSubmitting = false;
      }
    });
  }

  campoInvalido(campo: string): boolean {
    return !!(this.profissionalForm.get(campo)?.invalid &&
              this.profissionalForm.get(campo)?.touched);
  }
}
