import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Atendimento } from '../models/atendimento'; // Caminho para o model

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  private apiUrl = `${environment.apiUrl}/atendimentos`;

  constructor(private http: HttpClient) { }

  // Listar todos os atendimentos
  listarTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar`);
  }

  // Buscar atendimento por ID
  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar/${id}`);
  }

  // Criar novo atendimento
  criar(atendimento: Atendimento): Observable<any> {
    return this.http.post(`${this.apiUrl}/criar`, atendimento);
  }

  // Atualizar atendimento existente
  atualizar(id: string, atendimento: Partial<Atendimento>): Observable<any> {
    return this.http.put(`${this.apiUrl}/atualizar/${id}`, atendimento);
  }

  // Remover atendimento
  remover(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remover/${id}`);
  }
}
