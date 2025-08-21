import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineTypeListComponent } from './vaccine-type-list.component';

describe('VaccineTypeListComponent', () => {
  let component: VaccineTypeListComponent;
  let fixture: ComponentFixture<VaccineTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VaccineTypeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
