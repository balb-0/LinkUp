import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // 🔥 Apenas isso, sem `HttpClientModule`
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cargo: ['', Validators.required]
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.registerForm.invalid) {
      alert("❌ Formulário inválido! Verifique os campos.");
      return;
    }

    this.http.post<{ message: string; redirect: string }>(
      'http://localhost:3000/api/auth/register',
      this.registerForm.value
    ).subscribe({
      next: (response) => {
        alert("✅ Cadastro realizado com sucesso!");
        this.router.navigate([response.redirect]);
      },
      error: (error) => {
        alert("❌ Erro ao cadastrar usuário!");
        this.errorMessage = error.error?.message || "Erro desconhecido.";
      }
    });
  }
}
