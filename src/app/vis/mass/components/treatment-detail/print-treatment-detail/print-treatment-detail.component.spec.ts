import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTreatmentDetailComponent } from './print-treatment-detail.component';

describe('PrintTreatmentDetailComponent', () => {
  let component: PrintTreatmentDetailComponent;
  let fixture: ComponentFixture<PrintTreatmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintTreatmentDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTreatmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
