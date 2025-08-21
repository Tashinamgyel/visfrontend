import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseUnitListComponent } from './dose-unit-list.component';

describe('DoseUnitListComponent', () => {
  let component: DoseUnitListComponent;
  let fixture: ComponentFixture<DoseUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoseUnitListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoseUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
