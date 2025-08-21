import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalTypeFormComponent } from './animal-type-form.component';

describe('AnimalTypeFormComponent', () => {
  let component: AnimalTypeFormComponent;
  let fixture: ComponentFixture<AnimalTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalTypeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
