import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profissional } from '../models/professional';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {
  private apiUrl = `${environment.apiUrl}/profissionais`;

  constructor(private http: HttpClient) { }

  // Listar todos os profissionais
  listarTodos(): Observable<any> {
    // Adicionar timestamp para evitar cache
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get(`${this.apiUrl}/ListarTodos`, { params });
  }

  listarComPaginacao(pagina: number = 0, tamanhoPagina: number = 10): Observable<any> {
    // Adicionar timestamp para evitar cache
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanhoPagina', tamanhoPagina.toString())
      .set('_t', Date.now().toString());
    
    return this.http.get(`${this.apiUrl}/ListarPaginado`, { params });
  }

  // Buscar profissional por ID
  buscarPorId(id: string): Observable<any> {
    // Adicionar timestamp para evitar cache
    const params = new HttpParams().set('_t', Date.now().toString());
    return this.http.get(`${this.apiUrl}/BuscarPorId/${id}`, { params });
  }

  // Criar novo profissional
  criar(profissional: Profissional): Observable<any> {
    return this.http.post(`${this.apiUrl}/Criar`, profissional);
  }

  // Atualizar profissional existente
  atualizar(id: string, profissional: Partial<Profissional>): Observable<any> {
    return this.http.put(`${this.apiUrl}/Atualizar/${id}`, profissional);
  }

  // Remover profissional
  remover(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Remover/${id}`);
  }

  // Limpar cache
  limparCache(): Observable<any> {
    return this.http.post(`${this.apiUrl}/limpar-cache`, {});
  }
}
