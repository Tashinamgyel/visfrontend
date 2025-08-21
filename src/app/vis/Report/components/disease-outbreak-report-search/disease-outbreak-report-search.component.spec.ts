import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseOutbreakReportSearchComponent } from './disease-outbreak-report-search.component';

describe('DiseaseOutbreakReportSearchComponent', () => {
  let component: DiseaseOutbreakReportSearchComponent;
  let fixture: ComponentFixture<DiseaseOutbreakReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiseaseOutbreakReportSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseOutbreakReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
