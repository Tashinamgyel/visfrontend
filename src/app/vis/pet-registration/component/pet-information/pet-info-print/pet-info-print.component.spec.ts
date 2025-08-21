import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetInfoPrintComponent } from './pet-info-print.component';

describe('PetInfoPrintComponent', () => {
  let component: PetInfoPrintComponent;
  let fixture: ComponentFixture<PetInfoPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetInfoPrintComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetInfoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
