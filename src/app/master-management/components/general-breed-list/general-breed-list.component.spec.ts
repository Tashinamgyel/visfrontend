import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBreedListComponent } from './general-breed-list.component';

describe('GeneralBreedListComponent', () => {
  let component: GeneralBreedListComponent;
  let fixture: ComponentFixture<GeneralBreedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralBreedListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBreedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
