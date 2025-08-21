import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mass-confirmation',
  templateUrl: './mass-confirmation.component.html',
  styleUrls: ['./mass-confirmation.component.scss'],
})
export class MassConfirmationComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MassConfirmationComponent>) {}

  ngOnInit(): void {}

  onConfirm(option: any) {
    this.dialogRef.close(option);
  }
}
