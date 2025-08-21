import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyListComponent } from './frequency-list.component';

describe('FrequencyListComponent', () => {
  let component: FrequencyListComponent;
  let fixture: ComponentFixture<FrequencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequencyListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
