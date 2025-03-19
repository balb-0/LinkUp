import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profissional } from '../models/professional';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalStateService {
  private profissionaisSubject = new BehaviorSubject<Profissional[]>([]);
  profissionais$ = this.profissionaisSubject.asObservable();

  constructor() {}

  setProfissionais(profissionais: Profissional[]): void {
    this.profissionaisSubject.next(profissionais);
  }

  addProfissional(profissional: Profissional): void {
    const currentProfissionais = this.profissionaisSubject.value;
    this.profissionaisSubject.next([...currentProfissionais, profissional]);
  }

  clearProfissionais(): void {
    this.profissionaisSubject.next([]);
  }
} 