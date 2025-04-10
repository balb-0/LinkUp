import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfissionalService } from '../../services/professionalservice';
import { Profissional } from '../../models/professional';
import { Router } from '@angular/router';
import { ProfessionalStateService } from '../../services/professional-state.service';
import { SnackBarService } from '../../services/snack-bar.service';


@Component({
  selector: 'app-professional-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    private router: Router,
    private snackBarService: SnackBarService
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
        this.snackBarService.showMessage('Profissional cadastrado com sucesso!', false, 'custom-snackbar');
        this.profissionalForm.reset();
        this.isSubmitting = false;

        // Limpar o cache primeiro, depois redirecionar para garantir atualização completa
        this.profissionalService.limparCache().subscribe({
          next: () => {
            console.log('Cache limpo com sucesso');
            
            // Redirecionar para a própria tela para forçar recarregamento completo 
            // Isso garante que a página será renderizada do zero
            // Indicamos um timestamp como query param para evitar cache do navegador
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/professionals'], { 
                queryParams: { refresh: new Date().getTime() } 
              });
            });
          },
          error: (error) => {
            console.error('Erro ao limpar cache:', error);
            
            // Mesmo se falhar o limpamento de cache, ainda forçamos navegação
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/professionals'], { 
                queryParams: { refresh: new Date().getTime() } 
              });
            });
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
