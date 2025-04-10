import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTechnologyCardComponent } from './service-technology-card.component';

describe('ServiceTechnologyCardComponent', () => {
  let component: ServiceTechnologyCardComponent;
  let fixture: ComponentFixture<ServiceTechnologyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceTechnologyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTechnologyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
