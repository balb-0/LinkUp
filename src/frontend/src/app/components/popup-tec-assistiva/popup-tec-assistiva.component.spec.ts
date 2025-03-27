import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTecAssistivaComponent } from './popup-tec-assistiva.component';

describe('PopupTecAssistivaComponent', () => {
  let component: PopupTecAssistivaComponent;
  let fixture: ComponentFixture<PopupTecAssistivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupTecAssistivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTecAssistivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
