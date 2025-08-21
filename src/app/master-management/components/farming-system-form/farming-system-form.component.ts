import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { FarmingSystem } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-farming-system-form',
  templateUrl: './farming-system-form.component.html',
  styleUrls: ['./farming-system-form.component.scss'],
})
export class FarmingSystemFormComponent implements OnInit {
  farmingSystemForm: FormGroup;
  actionType: String;
  id: number;
  farmName: string;
  farmingSystem: FarmingSystem[];

  constructor(
    public dialogRef: MatDialogRef<FarmingSystemFormComponent>,
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
    this.service.loadFarmingSystem().subscribe((response) => {
      this.farmingSystem = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadFarmingSystemById(this.id).subscribe(
        (response) => {
          this.farmingSystemForm.patchValue({
            farmName: response.farmName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.farmingSystemForm = this.fb.group({
      farmName: new FormControl('', Validators.required),
    });
  }
  saveFarmingSystem() {
    if (this.farmingSystemForm.valid) {
      const farmingSystem = new FarmingSystem();

      Object.assign(farmingSystem, this.farmingSystemForm.value);
      farmingSystem.status = 'Y';
      this.dialogRef.close(farmingSystem);
    } else {
      return;
    }
  }

  updateFarmingSystem() {
    if (this.farmingSystemForm.valid) {
      const farmingSystem = new FarmingSystem();
      Object.assign(farmingSystem, this.farmingSystemForm.value);
      farmingSystem.id = this.id;
      if (this.actionType === 'EDIT') {
        farmingSystem.status = 'Y';
      } else {
        farmingSystem.status = 'N';
      }

      this.dialogRef.close(farmingSystem);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
