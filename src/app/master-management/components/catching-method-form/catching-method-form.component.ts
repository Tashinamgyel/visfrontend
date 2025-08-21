import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { CatchingMethod } from '@app/master-management/models/master';

@Component({
  selector: 'app-catching-method-form',
  templateUrl: './catching-method-form.component.html',
  styleUrls: ['./catching-method-form.component.scss'],
})
export class CatchingMethodFormComponent implements OnInit {
  catchingMethodForm: FormGroup;

  catchName: string;
  actionType: string;
  id: number;
  catchingMethod: CatchingMethod[];

  constructor(
    public dialogRef: MatDialogRef<CatchingMethodFormComponent>,
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
    this.catchingMethodForm = this.fb.group({
      catchName: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadCatchingMethod().subscribe((response) => {
      this.catchingMethod = response;
    });
    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadCatchingMethodById(this.id).subscribe(
        (response) => {
          this.catchingMethodForm.patchValue({
            catchName: response.catchName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveCatchingMethod() {
    if (this.catchingMethodForm.valid) {
      const catchingMethod = new CatchingMethod();
      Object.assign(catchingMethod, this.catchingMethodForm.value);
      catchingMethod.status = 'Y';
      this.dialogRef.close(catchingMethod);
    } else {
      return;
    }
  }

  updateCatchingMethod() {
    if (this.catchingMethodForm.valid) {
      const catchingMethod = new CatchingMethod();
      Object.assign(catchingMethod, this.catchingMethodForm.value);
      catchingMethod.id = this.id;
      if (this.actionType === 'EDIT') {
        catchingMethod.status = 'Y';
      } else {
        catchingMethod.status = 'N';
      }
      this.dialogRef.close(catchingMethod);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
