import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NotificationService } from '@app/@core';
import { Frequency } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-frequency-form',
  templateUrl: './frequency-form.component.html',
  styleUrls: ['./frequency-form.component.scss'],
})
export class FrequencyFOrmComponent implements OnInit {
  frequencyForm: FormGroup;
  actionType: string;
  id: number;
  frequencyName: string;
  frequency: Frequency[];

  constructor(
    public dialogRef: MatDialogRef<FrequencyFOrmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }
  populateForm() {
    this.service.loadFrequency().subscribe((response) => {
      this.frequency = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadFrequencyById(this.id).subscribe(
        (response) => {
          this.frequencyForm.patchValue({
            frequencyName: response.frequencyName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.frequencyForm = this.fb.group({
      frequencyName: new FormControl('', Validators.required),
    });
  }
  saveFrequency() {
    if (this.frequencyForm.valid) {
      const frequency = new Frequency();
      Object.assign(frequency, this.frequencyForm.value);
      frequency.status = 'Y';
      this.dialogRef.close(frequency);
    } else {
      return;
    }
  }

  updateFrequency() {
    if (this.frequencyForm.valid) {
      const frequency = new Frequency();
      Object.assign(frequency, this.frequencyForm.value);
      frequency.id = this.id;
      if (this.actionType === 'EDIT') {
        frequency.status = 'Y';
      } else {
        frequency.status = 'N';
      }
      this.dialogRef.close(frequency);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
