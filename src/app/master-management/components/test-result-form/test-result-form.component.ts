import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { Tests } from '@app/master-management/models/master';

@Component({
  selector: 'app-test-result-form',
  templateUrl: './test-result-form.component.html',
  styleUrls: ['./test-result-form.component.scss'],
})
export class TestResultFormComponent implements OnInit {
  testForm: FormGroup;
  actionType: String;
  id: number;
  resultName: string;
  test: Tests[];

  constructor(
    public dialogRef: MatDialogRef<TestResultFormComponent>,
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
    this.service.loadTest().subscribe((response) => {
      this.test = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadTestById(this.id).subscribe(
        (response) => {
          this.testForm.patchValue({
            resultName: response.resultName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.testForm = this.fb.group({
      resultName: new FormControl('', Validators.required),
    });
  }
  saveTest() {
    if (this.testForm.valid) {
      const test = new Tests();
      test.status = 'Y';
      Object.assign(test, this.testForm.value);
      this.dialogRef.close(test);
    } else {
      return;
    }
  }

  updateTest() {
    if (this.testForm.valid) {
      const test = new Tests();
      Object.assign(test, this.testForm.value);
      test.id = this.id;
      if (this.actionType === 'Y') {
        test.status = 'Y';
      } else {
        test.status = 'N';
      }
      this.dialogRef.close(test);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
