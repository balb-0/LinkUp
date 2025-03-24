import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${this.apiUrl}/ListarTodos`);
  }

  listarComPaginacao(pagina: number = 0, tamanhoPagina: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/ListarPaginado?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}`);
  }

  // Buscar profissional por ID
  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/BuscarPorId/${id}`);
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
