import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DewormConditionListComponent } from './deworm-condition-list.component';

describe('DewormConditionListComponent', () => {
  let component: DewormConditionListComponent;
  let fixture: ComponentFixture<DewormConditionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DewormConditionListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DewormConditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
