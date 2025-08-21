import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsFormComponent } from './conditions-form.component';

describe('ConditionsFormComponent', () => {
  let component: ConditionsFormComponent;
  let fixture: ComponentFixture<ConditionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConditionsFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
