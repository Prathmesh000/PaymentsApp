import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRequestComponent } from './corporate-request.component';

describe('CorporateRequestComponent', () => {
  let component: CorporateRequestComponent;
  let fixture: ComponentFixture<CorporateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorporateRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
