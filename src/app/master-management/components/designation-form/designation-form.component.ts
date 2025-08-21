import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { CredentialsService } from '@app/auth';
import { Designations } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-designation-form',
  templateUrl: './designation-form.component.html',
  styleUrls: ['./designation-form.component.scss'],
})
export class DesignationFormComponent implements OnInit {
  desginForm: FormGroup;
  actionType: string;
  id: number;
  designation: Designations[];

  constructor(
    public dialogRef: MatDialogRef<DesignationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.desginForm = this.fb.group({
      designationName: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadDesignations().subscribe((response) => {
      this.designation = response;
    });
    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadDesignationById(this.id).subscribe(
        (response) => {
          this.desginForm.patchValue({
            designationName: response.designationName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveDesignation() {
    if (this.desginForm.valid) {
      const desigantion = new Designations();
      Object.assign(desigantion, this.desginForm.value);
      desigantion.status = 'Y';
      // desigantion.createdBy = this.credentialsService.credentials.userName;
      this.dialogRef.close(desigantion);
    } else {
      return;
    }
  }

  updateDesignation() {
    if (this.desginForm.valid) {
      const designation = new Designations();
      Object.assign(designation, this.desginForm.value);
      designation.id = this.id;
      if (this.actionType === 'EDIT') {
        designation.status = 'Y';
      } else {
        designation.status = 'N';
      }
      this.dialogRef.close(designation);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
