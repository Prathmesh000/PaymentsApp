import { ComponentFixture, TestBed } from '@angular/core/testing';

import RegisterBankComponent from './register-bank.component';

describe('RegisterBankComponent', () => {
  let component: RegisterBankComponent;
  let fixture: ComponentFixture<RegisterBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
