import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentrequestsComponent } from './view-paymentrequests.component';

describe('ViewPaymentrequestsComponent', () => {
  let component: ViewPaymentrequestsComponent;
  let fixture: ComponentFixture<ViewPaymentrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPaymentrequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPaymentrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
