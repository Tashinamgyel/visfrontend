import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeworwmingDiagnosticTestListComponent } from './deworwming-diagnostic-test-list.component';

describe('DeworwmingDiagnosticTestListComponent', () => {
  let component: DeworwmingDiagnosticTestListComponent;
  let fixture: ComponentFixture<DeworwmingDiagnosticTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeworwmingDiagnosticTestListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeworwmingDiagnosticTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
