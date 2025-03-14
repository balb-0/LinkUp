import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfissionalService } from '../../services/professionalservice';
import { Profissional } from '../../models/professional';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private profissionalService: ProfissionalService,
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

      },
      error: (erro: any) => {
        console.error('Erro ao cadastrar profissional', erro);
        this.isSubmitting = false;
      }
    });
  }

  campoInvalido(campo: string): boolean {
    return !!(this.profissionalForm.get(campo)?.invalid &&
              this.profissionalForm.get(campo)?.touched);
  }
}
