import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabServiceTechnologyComponent } from './tab-service-technology.component';

describe('TabServiceTechnologyComponent', () => {
  let component: TabServiceTechnologyComponent;
  let fixture: ComponentFixture<TabServiceTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabServiceTechnologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabServiceTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
