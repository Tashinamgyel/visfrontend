import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { DOG_MANAGEMENTS, DogManagement } from '@app/shell/consts/model';

@Component({
  selector: 'app-dog-management',
  templateUrl: './dog-management.component.html',
  styleUrls: ['./dog-management.component.scss'],
})
export class DogManagementComponent implements OnInit {
  dogDogManagements: DogManagement[] = DOG_MANAGEMENTS;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
