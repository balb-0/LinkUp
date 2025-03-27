import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProfissionaisComponent } from './popup-profissionais.component';

describe('PopupProfissionaisComponent', () => {
  let component: PopupProfissionaisComponent;
  let fixture: ComponentFixture<PopupProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupProfissionaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
