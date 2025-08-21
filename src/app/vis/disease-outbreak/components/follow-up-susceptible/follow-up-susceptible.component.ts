import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Species, AnimalTypes, Cases } from '@app/master-management/models/master';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-follow-up-susceptible',
  templateUrl: './follow-up-susceptible.component.html',
  styleUrls: ['./follow-up-susceptible.component.scss'],
})
export class FollowUpSusceptibleComponent implements OnInit {
  [x: string]: any;
  followUpSusceptibleForm: FormGroup;
  species: Species[];
  animalTypes: AnimalTypes[];
  actionType: string;
  id: number;
  cidDetails: any;

  constructor(
    public dialogRef: MatDialogRef<FollowUpSusceptibleComponent>,
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
      this.visMasterService.loadCaseById(this.id, 'FollowUpSusceptible').subscribe(
        (response) => {
          this.followUpSusceptibleForm.patchValue({
            speciesId: response.speciesId,
            animalTypeId: response.animalTypeId,
            breedId: response.breedId,
            susceptibleAnimals: response.susceptibleAnimals,
          });
          this.getAnimalTypes(this.followUpSusceptibleForm.value.speciesId);
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
    this.followUpSusceptibleForm = this.fb.group({
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      susceptibleAnimals: new FormControl('', Validators.required),
    });
  }

  saveCase() {
    if (this.followUpSusceptibleForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.followUpSusceptibleForm.value);
      cases.type = 'followUpSusceptible';
      cases.createdBy = this.credentialsService.credentials.userName;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }
  updateCase() {
    if (this.followUpSusceptibleForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.followUpSusceptibleForm.value);
      cases.type = 'followUpSusceptible';
      cases.id = this.id;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
