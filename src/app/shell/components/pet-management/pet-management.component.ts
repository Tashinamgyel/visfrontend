import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { PET_MANAGEMENTS, PetManagement } from '../../consts/model';

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.scss'],
})
export class PetManagementComponent implements OnInit {
  petManagements: PetManagement[] = PET_MANAGEMENTS;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
