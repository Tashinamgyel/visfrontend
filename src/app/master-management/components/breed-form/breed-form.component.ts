import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { BreedMapping, PetBreeds, Species } from '@app/master-management/models/master';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-breed-form',
  templateUrl: './breed-form.component.html',
  styleUrls: ['./breed-form.component.scss'],
})
export class BreedFormComponent implements OnInit {
  breedMappingForm: FormGroup;
  species: Species[];
  actionType: string;
  id: number;
  petBreeds: PetBreeds[];

  constructor(
    public dialogRef: MatDialogRef<BreedFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService,
    private visMasterService: SharedService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.breedMappingForm = this.fb.group({
      breed: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    // this.service.loadSpecies().subscribe((response) => {
    //   this.species = response;
    //   console.log(response,"DSF'dfd");

    // });
    this.visMasterService.loadDogSpecies().subscribe((response) => {
      this.species = response;
    });

    if (this.actionType === 'EDIT') {
      this.service.loadBreedMappingById(this.id).subscribe(
        (response) => {
          console.log(response, 'dfffffffffffffffffffffffff');

          this.breedMappingForm.patchValue({
            breed: response.breed,
            speciesId: response.species.id,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }
  getPetBreeds(speciesId: number) {
    if (speciesId === 7) {
    } else {
    }
    this.visMasterService.getPetBreeds(speciesId).subscribe((response) => {
      this.petBreeds = response;
    });
  }
  saveBreedMapping() {
    if (this.breedMappingForm.valid) {
      const breedMapping = new BreedMapping();
      Object.assign(breedMapping, this.breedMappingForm.value);

      this.dialogRef.close(breedMapping);
    } else {
      return;
    }
  }

  updateBreedMapping() {
    if (this.breedMappingForm.valid) {
      const breedMapping = new BreedMapping();
      Object.assign(breedMapping, this.breedMappingForm.value);
      breedMapping.id = this.id;

      this.dialogRef.close(breedMapping);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
