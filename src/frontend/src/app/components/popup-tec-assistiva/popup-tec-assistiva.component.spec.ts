import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTecnologiasComponent } from './popup-tec-assistiva.component';

describe('PopupTecAssistivaComponent', () => {
  let component: PopupTecnologiasComponent;
  let fixture: ComponentFixture<PopupTecnologiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupTecnologiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTecnologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
