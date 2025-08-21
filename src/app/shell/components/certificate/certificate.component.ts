import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CERTIFICATE, Certificate } from '@app/shell/consts/model';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],
})
export class CertificateComponent implements OnInit {
  certificates: Certificate[] = CERTIFICATE;

  constructor(private media: MediaObserver) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {}
}
