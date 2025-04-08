import { TestBed } from '@angular/core/testing';

import { TecnologiaAssistivaService } from './tecnologia-assistiva.service';

describe('TecnologiaAssistivaService', () => {
  let service: TecnologiaAssistivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnologiaAssistivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
