import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GewogComponent } from './gewog.component';

describe('GewogComponent', () => {
  let component: GewogComponent;
  let fixture: ComponentFixture<GewogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GewogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GewogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
