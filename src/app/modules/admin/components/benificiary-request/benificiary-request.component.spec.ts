import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiaryRequestComponent } from './benificiary-request.component';

describe('BenificiaryRequestComponent', () => {
  let component: BenificiaryRequestComponent;
  let fixture: ComponentFixture<BenificiaryRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BenificiaryRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenificiaryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
