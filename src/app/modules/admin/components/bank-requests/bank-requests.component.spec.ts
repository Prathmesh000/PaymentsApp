import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRequestsComponent } from './bank-requests.component';

describe('BankRequestsComponent', () => {
  let component: BankRequestsComponent;
  let fixture: ComponentFixture<BankRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
