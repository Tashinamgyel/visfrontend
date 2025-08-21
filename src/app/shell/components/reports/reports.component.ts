import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { REPORT, Report } from '@app/shell/consts/model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  reports: Report[] = REPORT;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
