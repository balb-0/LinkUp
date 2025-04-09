import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AlunoTecnologiaAssistiva } from '../models/tecnologiaAluno';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaAlunoService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  associar(associacao: AlunoTecnologiaAssistiva): Observable<AlunoTecnologiaAssistiva> {
    return this.http.post<AlunoTecnologiaAssistiva>(`${this.apiUrl}/alunos/tecnologias/associar`, associacao);
  }

  listarTodos(): Observable<AlunoTecnologiaAssistiva[]> {
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get<AlunoTecnologiaAssistiva[]>(`${this.apiUrl}/alunos/tecnologias`, { params });
  }

  buscarPorId(id: string): Observable<AlunoTecnologiaAssistiva> {
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get<AlunoTecnologiaAssistiva>(`${this.apiUrl}/alunos/tecnologias/${id}`, { params });
  }

  listarPorAluno(alunoId: string): Observable<AlunoTecnologiaAssistiva[]> {
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get<AlunoTecnologiaAssistiva[]>(`${this.apiUrl}/alunos/${alunoId}/tecnologias`, { params });
  }

  listarPorTecnologia(tecnologiaId: string): Observable<AlunoTecnologiaAssistiva[]> {
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get<AlunoTecnologiaAssistiva[]>(`${this.apiUrl}/tecnologias/${tecnologiaId}/alunos`, { params });
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/alunos/tecnologias/${id}`);
  }

  removerPorAluno(alunoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/alunos/${alunoId}/tecnologias`);
  }

  removerPorTecnologia(tecnologiaId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tecnologias/${tecnologiaId}/alunos`);
  }
}
