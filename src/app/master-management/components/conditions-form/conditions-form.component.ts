import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core/notification.service';
import { Class, Conditions, System } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { cond } from 'lodash';

@Component({
  selector: 'app-conditions-form',
  templateUrl: './conditions-form.component.html',
  styleUrls: ['./conditions-form.component.scss'],
})
export class ConditionsFormComponent implements OnInit {
  conditionForm: FormGroup;

  condition: string;
  actionType: string;
  //systemId: number;
  system: System[];
  classId: number;
  class: Class[];

  id: number;
  condsitions: Conditions[];

  constructor(
    public dialogRef: MatDialogRef<ConditionsFormComponent>,
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
      conditions: new FormControl('', Validators.required),
      systemId: new FormControl(' ', Validators.required),
    });
  }

  populateForm() {
    this.service.loadSystem().subscribe((response) => {
      this.system = response;
    });

    if (this.actionType === 'EDIT') {
      this.service.loadConditionsById(this.id).subscribe(
        (response) => {
          console.log(response, 'dsfdsfds');
          this.conditionForm.patchValue({
            conditions: response.conditions,
            systemId: response.system.id,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveConditions() {
    if (this.conditionForm.valid) {
      const conditions = new Conditions();
      Object.assign(conditions, this.conditionForm.value);

      this.dialogRef.close(conditions);
    } else {
      return;
    }
  }

  updateConditions() {
    if (this.conditionForm.valid) {
      const conditions = new Conditions();
      Object.assign(conditions, this.conditionForm.value);
      conditions.id = this.id;
      this.dialogRef.close(conditions);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
