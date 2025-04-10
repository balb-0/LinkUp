import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaAssistivaService {
  private apiUrl = `${environment.apiUrl}/tecnologias`;

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
