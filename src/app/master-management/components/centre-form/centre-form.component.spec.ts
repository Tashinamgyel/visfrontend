import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreFormComponent } from './centre-form.component';

describe('CentreFormComponent', () => {
  let component: CentreFormComponent;
  let fixture: ComponentFixture<CentreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentreFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
