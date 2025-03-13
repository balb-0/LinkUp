import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true, // 🚀 Define como componente Standalone (sem necessidade de module)
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // 🚀 Importa módulos diretamente
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
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cargo: ['', Validators.required]
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    alert("📌 onSubmit() chamado!"); // 🚀 Se isso aparecer, a função foi chamada!

    if (this.registerForm.invalid) {
      alert("❌ Formulário inválido!"); // 🚀 Testar se está entrando nessa condição
      return;
    }

    console.log("✅ Formulário válido, enviando requisição...");

    this.http.post<{ message: string; redirect: string }>('http://localhost:3000/api/register', this.registerForm.value)
      .subscribe({
        next: (response) => {
          alert("✅ Usuário cadastrado com sucesso!");
          console.log("✅ Usuário cadastrado:", response.message);
          this.router.navigate([response.redirect]);
        },
        error: (error) => {
          alert("❌ Erro ao registrar usuário!");
          this.errorMessage = error.error?.message || "Erro ao registrar usuário";
          console.error("❌ Erro ao registrar:", error);
        }
      });
  }
}
