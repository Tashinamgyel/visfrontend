import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { PetRegistration } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-pet-register-type-form',
  templateUrl: './pet-register-type-form.component.html',
  styleUrls: ['./pet-register-type-form.component.scss'],
})
export class PetRegisterTypeFormComponent implements OnInit {
  petRegistrationForm: FormGroup;
  actionType: string;
  id: number;
  ownerType: string;
  petRegistration: PetRegistration[];

  constructor(
    public dialogRef: MatDialogRef<PetRegisterTypeFormComponent>,
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
    this.service.loadPetRegistration().subscribe((response) => {
      this.petRegistration = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadPetRegistrationById(this.id).subscribe(
        (response) => {
          this.petRegistrationForm.patchValue({
            ownerType: response.ownerType,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.petRegistrationForm = this.fb.group({
      ownerType: new FormControl('', Validators.required),
    });
  }
  savePetRegistration() {
    if (this.petRegistrationForm.valid) {
      const petRegistration = new PetRegistration();
      Object.assign(petRegistration, this.petRegistrationForm.value);
      petRegistration.status = 'Y';
      this.dialogRef.close(petRegistration);
    } else {
      return;
    }
  }

  updatePetRegistration() {
    if (this.petRegistrationForm.valid) {
      const petRegistration = new PetRegistration();
      Object.assign(petRegistration, this.petRegistrationForm.value);
      petRegistration.id = this.id;
      if (this.actionType === 'EDIT') {
        petRegistration.status = 'Y';
      } else {
        petRegistration.status = 'N';
      }
      this.dialogRef.close(petRegistration);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
