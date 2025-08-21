import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Class } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
})
export class ClassFormComponent implements OnInit {
  classForm: FormGroup;
  class: Class[];
  actionType: string;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<Class>,
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
    this.classForm = this.fb.group({
      className: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadClass().subscribe((response) => {
      this.class = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadClassById(this.id).subscribe(
        (response) => {
          console.log(response, 'sdsadsadsad');

          this.classForm.patchValue({
            className: response.className,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveClass() {
    if (this.classForm.valid) {
      const newClass = new Class();
      Object.assign(newClass, this.classForm.value);
      newClass.status = 'Y';
      this.dialogRef.close(newClass);
    } else {
      return;
    }
  }

  updateClass() {
    if (this.classForm.valid) {
      const newClass = new Class();
      Object.assign(newClass, this.classForm.value);
      newClass.id = this.id;
      if (this.actionType === 'EDIT') {
        newClass.status = 'Y';
      } else {
        newClass.status = 'N';
      }
      this.dialogRef.close(newClass);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
