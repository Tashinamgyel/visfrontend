import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { AnimalTypes, Species } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-animal-type-form',
  templateUrl: './animal-type-form.component.html',
  styleUrls: ['./animal-type-form.component.scss'],
})
export class AnimalTypeFormComponent implements OnInit {
  animalTypesForm: FormGroup;
  animalTypes: AnimalTypes[];
  actionType: string;
  id: number;
  animalType: string;
  speciesId: number;
  species: Species[];

  constructor(
    public dialogRef: MatDialogRef<AnimalTypeFormComponent>,
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
    this.animalTypesForm = this.fb.group({
      animalType: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadSpecies().subscribe((response) => {
      this.species = response;
    });

    if (this.actionType === 'EDIT') {
      this.service.loadAnimalTypesById(this.id).subscribe(
        (response) => {
          this.animalTypesForm.patchValue({
            animalType: response.animalType,
            speciesId: response.species.id,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveAnimalTypes() {
    if (this.animalTypesForm.valid) {
      const animalTypes = new AnimalTypes();
      Object.assign(animalTypes, this.animalTypesForm.value);
      console.log(animalTypes, 'aaaaaaaaaaaaaaaaaa');

      this.dialogRef.close(animalTypes);
    } else {
      return;
    }
  }

  updateAnimalTypes() {
    if (this.animalTypesForm.valid) {
      const animalTypes = new AnimalTypes();
      Object.assign(animalTypes, this.animalTypesForm.value);
      animalTypes.id = this.id;
      this.dialogRef.close(animalTypes);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
