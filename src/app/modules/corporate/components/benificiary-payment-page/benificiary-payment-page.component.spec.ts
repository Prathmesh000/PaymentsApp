import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiaryPaymentPageComponent } from './benificiary-payment-page.component';

describe('BenificiaryPaymentPageComponent', () => {
  let component: BenificiaryPaymentPageComponent;
  let fixture: ComponentFixture<BenificiaryPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BenificiaryPaymentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenificiaryPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
