import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyFOrmComponent } from './frequency-form.component';

describe('FrequencyFOrmComponent', () => {
  let component: FrequencyFOrmComponent;
  let fixture: ComponentFixture<FrequencyFOrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequencyFOrmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyFOrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
