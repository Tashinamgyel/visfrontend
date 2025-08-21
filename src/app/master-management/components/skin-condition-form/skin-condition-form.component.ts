import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { SkinCondition } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-skin-condition-form',
  templateUrl: './skin-condition-form.component.html',
  styleUrls: ['./skin-condition-form.component.scss'],
})
export class SkinConditionFormComponent implements OnInit {
  skinConditionForm: FormGroup;
  actionType: String;
  id: number;
  conditionName: string;
  skinCondition: SkinCondition[];

  constructor(
    public dialogRef: MatDialogRef<SkinConditionFormComponent>,
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
  populateForm() {
    this.service.loadSkinCondition().subscribe((response) => {
      this.skinCondition = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadSkinConditionById(this.id).subscribe(
        (response) => {
          this.skinConditionForm.patchValue({
            conditionName: response.conditionName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.skinConditionForm = this.fb.group({
      conditionName: new FormControl('', Validators.required),
    });
  }
  saveSkinCondition() {
    if (this.skinConditionForm.valid) {
      const skinCondition = new SkinCondition();
      Object.assign(skinCondition, this.skinConditionForm.value);
      skinCondition.createdBy = this.credentialsService.credentials.userName;
      skinCondition.status = 'Y';

      this.dialogRef.close(skinCondition);
    } else {
      return;
    }
  }

  updateSkinCondition() {
    if (this.skinConditionForm.valid) {
      const skinCondition = new SkinCondition();
      Object.assign(skinCondition, this.skinConditionForm.value);
      skinCondition.id = this.id;
      if (this.actionType === 'EDIT') {
        skinCondition.status = 'Y';
      } else {
        skinCondition.status = 'N';
      }
      this.dialogRef.close(skinCondition);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
