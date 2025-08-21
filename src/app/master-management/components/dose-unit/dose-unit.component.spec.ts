import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseUnitComponent } from './dose-unit.component';

describe('DoseUnitComponent', () => {
  let component: DoseUnitComponent;
  let fixture: ComponentFixture<DoseUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoseUnitComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
