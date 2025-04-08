import { TestBed } from '@angular/core/testing';

import { TecnologiaAlunoService } from './tecnologia-aluno.service';

describe('TecnologiaAlunoService', () => {
  let service: TecnologiaAlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnologiaAlunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
