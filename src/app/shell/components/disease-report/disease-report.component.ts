import { Component, OnInit } from '@angular/core';
import { DISEASE_OUTBREAK, DiseaseOutbreak } from '@app/shell/consts/model';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-disease-report',
  templateUrl: './disease-report.component.html',
  styleUrls: ['./disease-report.component.scss'],
})
export class DiseaseReportComponent implements OnInit {
  diseaseOutBreaks: DiseaseOutbreak[] = DISEASE_OUTBREAK;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
