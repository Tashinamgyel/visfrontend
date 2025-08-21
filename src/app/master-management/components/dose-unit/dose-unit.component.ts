import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { CredentialsService } from '@app/auth';
import { DoseUnit } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-dose-unit',
  templateUrl: './dose-unit.component.html',
  styleUrls: ['./dose-unit.component.scss'],
})
export class DoseUnitComponent implements OnInit {
  doseUnitForm: FormGroup;
  diseaseName: string;
  notifiable: string;
  actionType: string;
  id: number;
  doseUnit: DoseUnit[];

  constructor(
    public dialogRef: MatDialogRef<DoseUnitComponent>,
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
    this.doseUnitForm = this.fb.group({
      unitType: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadDoseUnit().subscribe((response) => {
      this.doseUnit = response;
    });
    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadUnitById(this.id).subscribe(
        (response) => {
          console.log(response, 'khan boss is testing');

          this.doseUnitForm.patchValue({
            unitType: response.unitType,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveDoseUnit() {
    if (this.doseUnitForm.valid) {
      const doseUnit = new DoseUnit();
      Object.assign(doseUnit, this.doseUnitForm.value);
      doseUnit.createdBy = this.credentialsService.credentials.userName;
      doseUnit.status = 'Y';
      this.dialogRef.close(doseUnit);
    } else {
      return;
    }
  }

  updateDoseUnit() {
    if (this.doseUnitForm.valid) {
      const doseUnit = new DoseUnit();
      Object.assign(doseUnit, this.doseUnitForm.value);
      doseUnit.id = this.id;
      if (this.actionType === 'EDIT') {
        doseUnit.status = 'Y';
      } else {
        doseUnit.status = 'N';
      }
      this.dialogRef.close(doseUnit);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
