import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CredentialsService } from '@app/auth';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { Species, AnimalTypes, Breeds, Cases } from '@app/master-management/models/master';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STATUS_TYPE, OTHER_AGE } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss'],
})
export class AddAnimalComponent implements OnInit {
  animalForm: FormGroup;
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  statusType = STATUS_TYPE;
  otherAnimalAges = OTHER_AGE;
  actionType: string;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<AddAnimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private masterService: MasterService,
    private visMasterService: SharedService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    console.log(this.data.actionType);
    console.log(this.data.id);

    this.initializeForm();
    this.populateForm();
  }

  populateForm() {
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });

    if (this.actionType === 'EDIT') {
      this.visMasterService.loadCaseById(this.id, 'Animal').subscribe(
        (response) => {
          this.animalForm.patchValue({
            speciesId: response.speciesId,
            animalTypeId: response.animalTypeId,
            breedId: response.breedId,
            age: response.age,
            male: response.male,
            female: response.female,
            total: response.total,
            status: response.status,
          });
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
    this.animalForm = this.fb.group({
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      breedId: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      male: new FormControl('', Validators.required),
      female: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  saveCase() {
    if (this.animalForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.animalForm.value);
      cases.type = 'Animal';
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  updateCase() {
    if (this.animalForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.animalForm.value);
      cases.type = 'Animal';
      cases.id = this.id;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
