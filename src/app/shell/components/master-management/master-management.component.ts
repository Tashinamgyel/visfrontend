import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MASTER_USER_ROUTES, MasterUserRoute } from '../../consts/model';

@Component({
  selector: 'app-master-management',
  templateUrl: './master-management.component.html',
  styleUrls: ['./master-management.component.scss'],
})
export class MasterManagementComponent implements OnInit {
  masterUserRoutes: MasterUserRoute[] = MASTER_USER_ROUTES;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
