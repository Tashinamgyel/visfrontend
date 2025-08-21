import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { UserManagement, USER_MANAGEMENTS } from '@app/shell/consts/model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  userManagements: UserManagement[] = USER_MANAGEMENTS;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
