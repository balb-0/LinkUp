import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  constructor(private http: HttpClient) {}

  buscarPorId(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/alunos/students/${id}`);
  }
}
