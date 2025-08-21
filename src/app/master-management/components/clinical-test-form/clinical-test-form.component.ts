import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { BasisOfDiagnosis } from '@app/master-management/models/master';

@Component({
  selector: 'app-clinical-test-form',
  templateUrl: './clinical-test-form.component.html',
  styleUrls: ['./clinical-test-form.component.scss'],
})
export class ClinicalTestFormComponent implements OnInit {
  clinicalTestForm: FormGroup;
  actionType: string;
  id: number;
  testName: string;
  clinicalTest: BasisOfDiagnosis[];

  constructor(
    public dialogRef: MatDialogRef<ClinicalTestFormComponent>,
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
    this.service.loadClinicalTest().subscribe((response) => {
      this.clinicalTest = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadClinicalTestById(this.id).subscribe(
        (response) => {
          this.clinicalTestForm.patchValue({
            basisName: response.basisName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.clinicalTestForm = this.fb.group({
      basisName: new FormControl('', Validators.required),
    });
  }
  saveClinicalTest() {
    if (this.clinicalTestForm.valid) {
      const clinicalTest = new BasisOfDiagnosis();
      Object.assign(clinicalTest, this.clinicalTestForm.value);
      clinicalTest.status = 'Y';
      this.dialogRef.close(clinicalTest);
    } else {
      return;
    }
  }

  updateClinicalTest() {
    if (this.clinicalTestForm.valid) {
      const clinicalTest = new BasisOfDiagnosis();
      Object.assign(clinicalTest, this.clinicalTestForm.value);
      clinicalTest.id = this.id;
      if (this.actionType === 'EDIT') {
        clinicalTest.status = 'Y';
      } else {
        clinicalTest.status = 'N';
      }
      this.dialogRef.close(clinicalTest);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
