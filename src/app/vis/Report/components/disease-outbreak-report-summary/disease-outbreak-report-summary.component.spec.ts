import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseOutbreakReportSummaryComponent } from './disease-outbreak-report-summary.component';

describe('DiseaseOutbreakReportSummaryComponent', () => {
  let component: DiseaseOutbreakReportSummaryComponent;
  let fixture: ComponentFixture<DiseaseOutbreakReportSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseOutbreakReportSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseOutbreakReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
