import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchPaymentComponent } from './batch-payment.component';

describe('BatchPaymentComponent', () => {
  let component: BatchPaymentComponent;
  let fixture: ComponentFixture<BatchPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
