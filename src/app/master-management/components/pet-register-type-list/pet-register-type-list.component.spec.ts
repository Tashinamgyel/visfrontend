import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetRegisterTypeListComponent } from './pet-register-type-list.component';

describe('PetRegisterTypeListComponent', () => {
  let component: PetRegisterTypeListComponent;
  let fixture: ComponentFixture<PetRegisterTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetRegisterTypeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetRegisterTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
