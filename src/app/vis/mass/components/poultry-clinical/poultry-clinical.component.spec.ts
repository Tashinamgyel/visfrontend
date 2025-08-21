import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoultryClinicalComponent } from './poultry-clinical.component';

describe('PoultryClinicalComponent', () => {
  let component: PoultryClinicalComponent;
  let fixture: ComponentFixture<PoultryClinicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoultryClinicalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoultryClinicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
