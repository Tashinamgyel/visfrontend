import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientIdPopupComponent } from './patient-id-popup.component';

describe('PatientIdPopupComponent', () => {
  let component: PatientIdPopupComponent;
  let fixture: ComponentFixture<PatientIdPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientIdPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientIdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
