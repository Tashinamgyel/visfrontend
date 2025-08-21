import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBreedFormComponent } from './general-breed-form.component';

describe('GeneralBreedFormComponent', () => {
  let component: GeneralBreedFormComponent;
  let fixture: ComponentFixture<GeneralBreedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralBreedFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBreedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
