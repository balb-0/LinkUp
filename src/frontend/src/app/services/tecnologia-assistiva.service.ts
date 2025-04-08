import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TecnologiaAssistiva } from '../models/tecnologiaAssistiva';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaAssistivaService {
  private apiUrl = `${environment.apiUrl}/tecnologias`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<TecnologiaAssistiva[]> {
    // Adicionar timestamp para evitar cache
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get<TecnologiaAssistiva[]>(`${this.apiUrl}/listarTodos`, { params });
  }

  buscarPorId(id: string): Observable<TecnologiaAssistiva> {
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get<TecnologiaAssistiva>(`${this.apiUrl}/buscarPorId/${id}`, { params });
  }

  criar(tecnologia: TecnologiaAssistiva): Observable<TecnologiaAssistiva> {
    return this.http.post<TecnologiaAssistiva>(`${this.apiUrl}/criar`, tecnologia);
  }

  atualizar(id: string, tecnologia: Partial<TecnologiaAssistiva>): Observable<TecnologiaAssistiva> {
    return this.http.put<TecnologiaAssistiva>(`${this.apiUrl}/atualizar/${id}`, tecnologia);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remover/${id}`);
  }

  limparCache(): Observable<any> {
    return this.http.post(`${this.apiUrl}/limpar-cache`, {});
  }
}
