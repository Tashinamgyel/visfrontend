import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetRegisterTypeFormComponent } from './pet-register-type-form.component';

describe('PetRegisterTypeFormComponent', () => {
  let component: PetRegisterTypeFormComponent;
  let fixture: ComponentFixture<PetRegisterTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetRegisterTypeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetRegisterTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
