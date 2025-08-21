import { Component, OnInit, Inject } from '@angular/core';
import { Species, AnimalTypes, Cases } from '@app/master-management/models/master';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-add-susceptible',
  templateUrl: './add-susceptible.component.html',
  styleUrls: ['./add-susceptible.component.scss'],
})
export class AddSusceptibleComponent implements OnInit {
  [x: string]: any;
  susceptibleForm: FormGroup;
  species: Species[];
  animalTypes: AnimalTypes[];
  actionType: string;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<AddSusceptibleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }
  populateForm() {
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    if (this.actionType === 'EDIT') {
      this.visMasterService.loadCaseById(this.id, 'Susceptible').subscribe(
        (response) => {
          this.susceptibleForm.patchValue({
            speciesId: response.speciesId,
            animalTypeId: response.animalTypeId,
            susceptibleAnimals: response.susceptibleAnimals,
          });
          this.getAnimalTypes(this.susceptibleForm.value.speciesId);
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not load details, please try again later');
        }
      );
    }
  }

  getAnimalTypes(speciesId: number) {
    this.visMasterService.getAnimalTypes(speciesId).subscribe((response) => {
      this.animalTypes = response;
    });
  }
  initializeForm() {
    this.susceptibleForm = this.fb.group({
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      susceptibleAnimals: new FormControl('', Validators.required),
    });
  }

  saveCase() {
    if (this.susceptibleForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.susceptibleForm.value);
      cases.type = 'Susceptible';
      cases.createdBy = this.credentialsService.credentials.userName;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }
  updateCase() {
    if (this.susceptibleForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.susceptibleForm.value);
      cases.type = 'Susceptible';
      cases.id = this.id;
      cases.createdBy = this.credentialsService.credentials.userName;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
