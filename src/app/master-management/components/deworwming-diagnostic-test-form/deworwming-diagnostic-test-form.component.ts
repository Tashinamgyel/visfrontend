import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { DewormingDiagnosticTest } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-deworwming-diagnostic-test-form',
  templateUrl: './deworwming-diagnostic-test-form.component.html',
  styleUrls: ['./deworwming-diagnostic-test-form.component.scss'],
})
export class DeworwmingDiagnosticTestFormComponent implements OnInit {
  desginForm: FormGroup;
  actionType: string;
  id: number;
  deworningTest: DewormingDiagnosticTest[];

  constructor(
    public dialogRef: MatDialogRef<DeworwmingDiagnosticTestFormComponent>,
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
    this.desginForm = this.fb.group({
      typeOfTest: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadDeworningDiagnosticTest().subscribe((response) => {
      this.deworningTest = response;
    });
    if (this.actionType === 'EDIT') {
      this.service.loadDewormingDiagnosticTestById(this.id).subscribe(
        (response) => {
          this.desginForm.patchValue({
            typeOfTest: response.typeOfTest,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveDwormTest() {
    if (this.desginForm.valid) {
      const dewormingTest = new DewormingDiagnosticTest();
      Object.assign(dewormingTest, this.desginForm.value);
      // desigantion.status = 'Y';
      // desigantion.createdBy = this.credentialsService.credentials.userName;
      this.dialogRef.close(dewormingTest);
    } else {
      return;
    }
  }

  updateDewormTest() {
    if (this.desginForm.valid) {
      const dewormingTest = new DewormingDiagnosticTest();
      Object.assign(dewormingTest, this.desginForm.value);
      dewormingTest.id = this.id;
      // if (this.actionType === 'EDIT') {
      //   designation.status = 'Y';
      // } else {
      //   designation.status = 'N';
      // }
      this.dialogRef.close(dewormingTest);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
