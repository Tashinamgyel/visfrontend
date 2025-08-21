import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalDiagnosticTestFormComponent } from './clinical-diagnostic-test-form.component';

describe('ClinicalDiagnosticTestFormComponent', () => {
  let component: ClinicalDiagnosticTestFormComponent;
  let fixture: ComponentFixture<ClinicalDiagnosticTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClinicalDiagnosticTestFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalDiagnosticTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
