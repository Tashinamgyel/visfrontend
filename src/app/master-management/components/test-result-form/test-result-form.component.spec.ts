import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultFormComponent } from './test-result-form.component';

describe('TestResultFormComponent', () => {
  let component: TestResultFormComponent;
  let fixture: ComponentFixture<TestResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestResultFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
