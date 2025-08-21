import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageformComponent } from './villageform.component';

describe('VillageformComponent', () => {
  let component: VillageformComponent;
  let fixture: ComponentFixture<VillageformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillageformComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
