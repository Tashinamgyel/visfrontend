import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryFormComponent } from './laboratory-form.component';

describe('LaboratoryFormComponent', () => {
  let component: LaboratoryFormComponent;
  let fixture: ComponentFixture<LaboratoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaboratoryFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
