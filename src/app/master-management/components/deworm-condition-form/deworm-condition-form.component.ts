import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { CredentialsService } from '@app/auth';
import { DewormingCondition } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-deworm-condition-form',
  templateUrl: './deworm-condition-form.component.html',
  styleUrls: ['./deworm-condition-form.component.scss'],
})
export class DewormConditionFormComponent implements OnInit {
  desginForm: FormGroup;
  actionType: string;
  id: number;
  deworming: DewormingCondition[];

  constructor(
    public dialogRef: MatDialogRef<DewormConditionFormComponent>,
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
      conditionsName: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadDeworming().subscribe((response) => {
      this.deworming = response;
    });
    if (this.actionType === 'EDIT') {
      this.service.loadDewormingById(this.id).subscribe(
        (response) => {
          this.desginForm.patchValue({
            conditionsName: response.conditionsName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveDeworming() {
    if (this.desginForm.valid) {
      const desigantion = new DewormingCondition();
      Object.assign(desigantion, this.desginForm.value);
      this.dialogRef.close(desigantion);
    } else {
      return;
    }
  }

  updateDeworming() {
    if (this.desginForm.valid) {
      const designation = new DewormingCondition();
      Object.assign(designation, this.desginForm.value);
      designation.id = this.id;
      this.dialogRef.close(designation);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
