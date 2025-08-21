import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalTypeListComponent } from './animal-type-list.component';

describe('AnimalTypeListComponent', () => {
  let component: AnimalTypeListComponent;
  let fixture: ComponentFixture<AnimalTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalTypeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
