import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DewormConditionFormComponent } from './deworm-condition-form.component';

describe('DewormConditionFormComponent', () => {
  let component: DewormConditionFormComponent;
  let fixture: ComponentFixture<DewormConditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DewormConditionFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DewormConditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
