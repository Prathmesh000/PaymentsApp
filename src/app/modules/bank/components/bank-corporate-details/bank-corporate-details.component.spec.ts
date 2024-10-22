import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCorporateDetailsComponent } from './bank-corporate-details.component';

describe('BankCorporateDetailsComponent', () => {
  let component: BankCorporateDetailsComponent;
  let fixture: ComponentFixture<BankCorporateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankCorporateDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCorporateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
