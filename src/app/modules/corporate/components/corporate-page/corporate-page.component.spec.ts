import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatePageComponent } from './corporate-page.component';

describe('CorporatePageComponent', () => {
  let component: CorporatePageComponent;
  let fixture: ComponentFixture<CorporatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorporatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
