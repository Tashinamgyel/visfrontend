import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Centre } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-centre-form',
  templateUrl: './centre-form.component.html',
  styleUrls: ['./centre-form.component.scss'],
})
export class centreFormComponent implements OnInit {
  centreForm: FormGroup;

  actionType: string;
  id: number;
  centres: Centre[];

  constructor(
    public dialogRef: MatDialogRef<centreFormComponent>,
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
    this.centreForm = this.fb.group({
      centreAgencies: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadCentre().subscribe((response) => {
      this.centres = response;
    });
    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadCentreById(this.id).subscribe(
        (response) => {
          this.centreForm.patchValue({
            centreAgencies: response.centreAgencies,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveCentre() {
    if (this.centreForm.valid) {
      const centre = new Centre();
      Object.assign(centre, this.centreForm.value);
      centre.status = 'Y';
      this.dialogRef.close(centre);
    } else {
      return;
    }
  }

  updateCentre() {
    if (this.centreForm.valid) {
      const centre = new Centre();
      Object.assign(centre, this.centreForm.value);
      centre.id = this.id;
      if (this.actionType === 'EDIT') {
        centre.status = 'Y';
      } else {
        centre.status = 'N';
      }
      this.dialogRef.close(centre);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
