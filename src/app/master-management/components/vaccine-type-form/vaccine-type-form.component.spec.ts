import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineTypeFormComponent } from './vaccine-type-form.component';

describe('VaccineTypeFormComponent', () => {
  let component: VaccineTypeFormComponent;
  let fixture: ComponentFixture<VaccineTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VaccineTypeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
