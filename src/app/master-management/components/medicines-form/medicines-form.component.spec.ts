import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesFormComponent } from './medicines-form.component';

describe('MedicinesFormComponent', () => {
  let component: MedicinesFormComponent;
  let fixture: ComponentFixture<MedicinesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicinesFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
