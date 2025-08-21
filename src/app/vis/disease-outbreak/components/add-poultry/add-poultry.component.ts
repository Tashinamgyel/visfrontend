import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { POUTRY_AGE, POULTRY_TYPE, STATUS_TYPE } from '@app/vis/shared/model/model';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService } from '@app/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Species, AnimalTypes, Breeds, Cases } from '@app/master-management/models/master';

@Component({
  selector: 'app-add-poultry',
  templateUrl: './add-poultry.component.html',
  styleUrls: ['./add-poultry.component.scss'],
})
export class AddPoultryComponent implements OnInit {
  poultryForm: FormGroup;
  poultryAges = POUTRY_AGE;
  poultryType = POULTRY_TYPE;
  statusType = STATUS_TYPE;
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  actionType: string;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<AddPoultryComponent>,
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
    this.initializeForm();
    this.populateForm();
  }

  populateForm() {
    this.masterService.getAnimalPoultryType().subscribe((res) => {
      this.animalTypes = res;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });

    if (this.actionType === 'EDIT') {
      this.visMasterService.loadCaseById(this.id, 'Poultry').subscribe(
        (response) => {
          this.poultryForm.patchValue({
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
    this.poultryForm = this.fb.group({
      animalTypeId: new FormControl('', Validators.required),
      breedId: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      male: new FormControl('', Validators.required),
      female: new FormControl('', Validators.required),
      mixed: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  saveCase() {
    if (this.poultryForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.poultryForm.value);
      cases.type = 'Poultry';
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }
  updateCase() {
    if (this.poultryForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.poultryForm.value);
      cases.type = 'Poultry';
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
