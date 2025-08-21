import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { TypeOfTest } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-test-type-form',
  templateUrl: './test-type-form.component.html',
  styleUrls: ['./test-type-form.component.scss'],
})
export class TestTypeFormComponent implements OnInit {
  Form: FormGroup;
  diagnosisType: string;
  typeOfTestForm: FormGroup;
  actionType: string;
  typeOfTests: TypeOfTest[];
  id: number;

  constructor(
    public dialogRef: MatDialogRef<TestTypeFormComponent>,
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
    this.service.loadTypeOfTest().subscribe((response) => {
      this.typeOfTests = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadTypeOfTestById(this.id).subscribe(
        (response) => {
          this.typeOfTestForm.patchValue({
            typeoftest: response.typeoftest,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.typeOfTestForm = this.fb.group({
      typeoftest: new FormControl('', Validators.required),
    });
  }

  saveTypeOfTest() {
    if (this.typeOfTestForm.valid) {
      const typeOfTest = new TypeOfTest();
      Object.assign(typeOfTest, this.typeOfTestForm.value);
      typeOfTest.status = 'Y';
      this.dialogRef.close(typeOfTest);
    } else {
      return;
    }
  }
  updateTypeOfTest() {
    if (this.typeOfTestForm.valid) {
      const typeOfTest = new TypeOfTest();
      Object.assign(typeOfTest, this.typeOfTestForm.value);
      typeOfTest.id = this.id;
      if (this.actionType === 'EDIT') {
        typeOfTest.status = 'Y';
      } else {
        typeOfTest.status = 'N';
      }
      this.dialogRef.close(typeOfTest);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
