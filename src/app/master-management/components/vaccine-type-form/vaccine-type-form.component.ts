import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { AnimalTypes, Species, VaccineType } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-vaccine-type-form',
  templateUrl: './vaccine-type-form.component.html',
  styleUrls: ['./vaccine-type-form.component.scss'],
})
export class VaccineTypeFormComponent implements OnInit {
  vaccineForm: FormGroup;
  actionType: String;
  id: number;
  vaccineName: string;
  vaccineType: VaccineType[];
  animalType: AnimalTypes[];
  animalTypeId: number;
  speciesId: number;
  species: Species[];

  constructor(
    public dialogRef: MatDialogRef<VaccineTypeFormComponent>,
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
    this.populateForm();
  }
  populateForm() {
    this.service.loadAnimalTypes().subscribe((response) => {
      this.animalType = response;
      this.service.loadMassSpecies().subscribe((response) => {
        this.species = response;
      });
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadVaccineTypeById(this.id).subscribe(
        (response) => {
          this.vaccineForm.patchValue({
            vaccineName: response.vaccineName,
            // animalTypeId: response.animalTypeId,
            speciesId: response.speciesId,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.vaccineForm = this.fb.group({
      vaccineName: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
    });
  }
  saveVaccineType() {
    if (this.vaccineForm.valid) {
      const vaccineType = new VaccineType();
      Object.assign(vaccineType, this.vaccineForm.value);
      vaccineType.status = 'Y';
      this.dialogRef.close(vaccineType);
    } else {
      return;
    }
  }

  updateVaccineType() {
    if (this.vaccineForm.valid) {
      const vaccineType = new VaccineType();
      Object.assign(vaccineType, this.vaccineForm.value);
      vaccineType.id = this.id;
      if (this.actionType === 'EDIT') {
        vaccineType.status = 'Y';
      } else {
        vaccineType.status = 'N';
      }
      this.dialogRef.close(vaccineType);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
