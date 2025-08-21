import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Class, Medicines } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-medicines-form',
  templateUrl: './medicines-form.component.html',
  styleUrls: ['./medicines-form.component.scss'],
})
export class MedicinesFormComponent implements OnInit {
  medincinesForm: FormGroup;
  actionType: String;
  id: number;
 classEntityId :number;
  medicineName: string;
  medicines: Medicines[];
  classEntity: Class[];
  constructor(
    public dialogRef: MatDialogRef<MedicinesFormComponent>,
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
    this.service.loadMedicines().subscribe((response) => {
      this.medicines = response;
      console.log("ddd",response);
      
    });
    this.service.loadClass().subscribe((response) => {
      this.classEntity = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadMedicinesById(this.id).subscribe(
        (response) => {
          
          this.medincinesForm.patchValue({
            medicineName: response.medicineName,
            classEntityId: response.classEntity.id,
            composition: response.composition,
            presentation:response.presentation,
            unit: response.unit
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.medincinesForm = this.fb.group({
      medicineName: new FormControl('', Validators.required),
      classEntityId: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      composition: new FormControl('', Validators.required),
      presentation: new FormControl('', Validators.required),
    });
  }
  saveMedicines() {
    if (this.medincinesForm.valid) {
      const medicines = new Medicines();
      Object.assign(medicines, this.medincinesForm.value);
      medicines.status = 'Y';
     
      this.dialogRef.close(medicines);
    } else {
      return;
    }
  }

  updateMedicines() {
    if (this.medincinesForm.valid) {
      const mediciness = new Medicines();
      Object.assign(mediciness, this.medincinesForm.value);
      mediciness.id = this.id;
      if (this.actionType === 'EDIT') {
        mediciness.status = 'Y';
      } else {
        mediciness.status = 'N';
      }
      this.dialogRef.close(mediciness);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
