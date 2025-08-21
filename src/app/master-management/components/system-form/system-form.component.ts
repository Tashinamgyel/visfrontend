import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { System } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-system-form',
  templateUrl: './system-form.component.html',
  styleUrls: ['./system-form.component.scss'],
})
export class SystemFormComponent implements OnInit {
  systemForm: FormGroup;
  actionType: String;
  id: number;
  SystemName: string;
  system: System[];

  constructor(
    public dialogRef: MatDialogRef<SystemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private masService: MasterService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }
  populateForm() {
    this.masService.loadSystem().subscribe((response) => {
      this.system = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.masService.loadSytemById(this.id).subscribe(
        (response) => {
          this.systemForm.patchValue({
            systemName: response.systemName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.systemForm = this.fb.group({
      systemName: new FormControl('', Validators.required),
    });
  }
  saveSystem() {
    if (this.systemForm.valid) {
      const system = new System();
      Object.assign(system, this.systemForm.value);
      system.status = 'Y';
      this.dialogRef.close(system);
    } else {
      return;
    }
  }

  updateSystem() {
    if (this.systemForm.valid) {
      const system = new System();
      Object.assign(this.system, this.systemForm.value);
      system.id = this.id;
      if (this.actionType === 'EDIT') {
        system.status = 'Y';
      } else {
        system.status = 'N';
      }
      this.dialogRef.close(system);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
