import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GewogFormComponent } from './gewog-form.component';

describe('GewogFormComponent', () => {
  let component: GewogFormComponent;
  let fixture: ComponentFixture<GewogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GewogFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GewogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
