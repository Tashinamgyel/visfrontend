import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { DiseaseSampleType } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-sample-type-form',
  templateUrl: './sample-type-form.component.html',
  styleUrls: ['./sample-type-form.component.scss'],
})
export class SampleTypeFormComponent implements OnInit {
  catchName: string;
  diseaseSampleTypeForm: FormGroup;
  actionType: string;
  id: number;
  diseaseSampleType: DiseaseSampleType[];

  constructor(
    public dialogRef: MatDialogRef<SampleTypeFormComponent>,
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

  initializeForm() {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.diseaseSampleTypeForm = this.fb.group({
      sampleName: new FormControl('', Validators.required),
    });
  }
  populateForm() {
    this.service.loadDiseaseSampleType().subscribe((response) => {
      this.diseaseSampleType = response;
    });
    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadDiseaseSampleTypeById(this.id).subscribe(
        (response) => {
          this.diseaseSampleTypeForm.patchValue({
            sampleName: response.sampleName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  updateDiseaseSampleType() {
    if (this.diseaseSampleTypeForm.valid) {
      const diseaseSampleType = new DiseaseSampleType();
      Object.assign(diseaseSampleType, this.diseaseSampleTypeForm.value);

      diseaseSampleType.id = this.id;
      if (this.actionType === 'EDIT') {
        diseaseSampleType.status = 'Y';
      } else {
        diseaseSampleType.status = 'N';
      }
      this.dialogRef.close(diseaseSampleType);
    } else {
      return;
    }
  }
  deleteDiseaseSampleType() {
    if (this.diseaseSampleTypeForm.valid) {
      const diseaseSampleType = new DiseaseSampleType();
      Object.assign(diseaseSampleType, this.diseaseSampleTypeForm.value);

      diseaseSampleType.id = this.id;
      if (this.actionType === 'EDIT') {
        diseaseSampleType.status = 'Y';
      } else {
        diseaseSampleType.status = 'N';
      }
      this.dialogRef.close(diseaseSampleType);
    } else {
      return;
    }
  }

  saveDiseaseSampleType() {
    if (this.diseaseSampleTypeForm.valid) {
      const diseaseSampleType = new DiseaseSampleType();
      Object.assign(diseaseSampleType, this.diseaseSampleTypeForm.value);
      diseaseSampleType.status = 'Y';
      this.dialogRef.close(diseaseSampleType);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
