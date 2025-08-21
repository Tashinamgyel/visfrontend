import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypeFormComponent } from './test-type-form.component';

describe('TestTypeFormComponent', () => {
  let component: TestTypeFormComponent;
  let fixture: ComponentFixture<TestTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTypeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
