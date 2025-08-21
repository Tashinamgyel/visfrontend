import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { INDIVIDUAL, Individual } from '@app/shell/consts/model';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit {
  individuals: Individual[] = INDIVIDUAL;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
