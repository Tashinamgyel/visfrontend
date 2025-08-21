import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinConditionListComponent } from './skin-condition-list.component';

describe('SkinConditionListComponent', () => {
  let component: SkinConditionListComponent;
  let fixture: ComponentFixture<SkinConditionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkinConditionListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinConditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
