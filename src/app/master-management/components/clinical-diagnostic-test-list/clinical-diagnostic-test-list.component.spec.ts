import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalDiagnosticTestListComponent } from './clinical-diagnostic-test-list.component';

describe('ClinicalDiagnosticTestListComponent', () => {
  let component: ClinicalDiagnosticTestListComponent;
  let fixture: ComponentFixture<ClinicalDiagnosticTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClinicalDiagnosticTestListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalDiagnosticTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
