import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { AgeGroup } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-age-group-form',
  templateUrl: './age-group-form.component.html',
  styleUrls: ['./age-group-form.component.scss'],
})
export class AgeGroupFormComponent implements OnInit {
  ageGroupForm: FormGroup;
  actionType: String;
  id: number;
  ageName: string;
  ageGroup: AgeGroup[];

  constructor(
    public dialogRef: MatDialogRef<AgeGroupFormComponent>,
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
    this.service.loadAgeGroup().subscribe((response) => {
      this.ageGroup = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadAgeGroupById(this.id).subscribe(
        (response) => {
          this.ageGroupForm.patchValue({
            ageName: response.ageName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.ageGroupForm = this.fb.group({
      ageName: new FormControl('', Validators.required),
    });
  }
  saveAgeGroup() {
    if (this.ageGroupForm.valid) {
      const ageGroup = new AgeGroup();
      ageGroup.status = 'Y';
      Object.assign(ageGroup, this.ageGroupForm.value);
      this.dialogRef.close(ageGroup);
    } else {
      return;
    }
  }

  updateAgeGroup() {
    if (this.ageGroupForm.valid) {
      const ageGroup = new AgeGroup();
      Object.assign(ageGroup, this.ageGroupForm.value);
      ageGroup.id = this.id;
      if (this.actionType === 'EDIT') {
        ageGroup.status = 'Y';
      } else {
        ageGroup.status = 'N';
      }
      this.dialogRef.close(ageGroup);
    } else {
      return;
    }
  }

  deleteAgeGroup() {
    //   if (this.ageGroupForm.valid) {
    //     const ageGroup = new AgeGroup();
    //     Object.assign(ageGroup, this.ageGroupForm.value);
    //     ageGroup.id = this.id;
    //     if (this.actionType === 'EDIT') {
    //       ageGroup.status = 'Y';
    //     } else {
    //       ageGroup.status = 'N';
    //     }
    //     this.dialogRef.close(ageGroup);
    //   } else {
    //     return;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
