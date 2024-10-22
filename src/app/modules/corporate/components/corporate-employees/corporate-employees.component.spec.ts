import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateEmployeesComponent } from './corporate-employees.component';

describe('CorporateEmployeesComponent', () => {
  let component: CorporateEmployeesComponent;
  let fixture: ComponentFixture<CorporateEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorporateEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
