import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { ClinicalDiagnosticTest, Conditions } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-clinical-diagnostic-test-form',
  templateUrl: './clinical-diagnostic-test-form.component.html',
  styleUrls: ['./clinical-diagnostic-test-form.component.scss'],
})
export class ClinicalDiagnosticTestFormComponent implements OnInit {
  conditionForm: FormGroup;

  condition: string;
  actionType: string;
  //systemId: number;
  clininalTest: ClinicalDiagnosticTest[];

  id: number;

  constructor(
    public dialogRef: MatDialogRef<ClinicalDiagnosticTestFormComponent>,
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
    this.conditionForm = this.fb.group({
      clinicalTest: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadClinicalDiagnosticTest().subscribe((response) => {
      this.clininalTest = response;
    });
    // this.service.loadClinicalDignosticTestById().subscribe((response) => {
    //   this.clinalTest = response;
    // });
    if (this.actionType === 'EDIT') {
      this.service.loadClinicalDignosticTestById(this.id).subscribe(
        (response) => {
          console.log(response, 'dsfdsfds');
          this.conditionForm.patchValue({
            clinicalTest: response.clinicalTest,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveClinicalTest() {
    if (this.conditionForm.valid) {
      const test = new ClinicalDiagnosticTest();
      Object.assign(test, this.conditionForm.value);

      this.dialogRef.close(test);
    } else {
      return;
    }
  }

  updateClinicalTest() {
    if (this.conditionForm.valid) {
      const test = new ClinicalDiagnosticTest();
      Object.assign(test, this.conditionForm.value);
      test.id = this.id;
      this.dialogRef.close(test);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
