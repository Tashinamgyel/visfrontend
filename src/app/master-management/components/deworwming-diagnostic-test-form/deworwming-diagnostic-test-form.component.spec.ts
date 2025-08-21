import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeworwmingDiagnosticTestFormComponent } from './deworwming-diagnostic-test-form.component';

describe('DeworwmingDiagnosticTestFormComponent', () => {
  let component: DeworwmingDiagnosticTestFormComponent;
  let fixture: ComponentFixture<DeworwmingDiagnosticTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeworwmingDiagnosticTestFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeworwmingDiagnosticTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
