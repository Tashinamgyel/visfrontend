import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillagelistComponent } from './villagelist.component';

describe('VillagelistComponent', () => {
  let component: VillagelistComponent;
  let fixture: ComponentFixture<VillagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillagelistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
