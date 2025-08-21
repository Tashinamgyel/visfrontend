import { Component, OnInit, Inject } from '@angular/core';
import { Breeds, Species, AnimalTypes, Cases } from '@app/master-management/models/master';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { STATUS_TYPE, OTHER_AGE, POUTRY_AGE } from '@app/vis/shared/model/model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-add-mass-case',
  templateUrl: './add-mass-case.component.html',
  styleUrls: ['./add-mass-case.component.scss'],
})
export class AddMassCaseComponent implements OnInit {
  massCase: FormGroup;
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  statusType = STATUS_TYPE;
  otherAnimalAges = OTHER_AGE;
  poultryAges = POUTRY_AGE;
  actionType: string;
  treatment: string;
  speciesId: number;
  flashId: number;
  reportStatus: number;
  id: number;
  poultry: boolean = true;
  maleHidden: boolean = true;
  femaleHidden: boolean = true;
  mixedHidden: boolean = true;
  totalData: any;
  fetchedCID: number;
  treatmentDate: Date;
  ddate: any;
  constructor(
    public dialogRef: MatDialogRef<AddMassCaseComponent>,
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
    this.treatment = this.data.treatment;
    this.treatmentDate = this.data.treatmentDate;
    this.speciesId = Number(this.data.speciesId);
    this.initializeForm();
    this.populateForm();
    //console.log(this.treatment, 'this.id');

    if (this.actionType === 'EDIT') {
      this.visMasterService.loadMassCaseById(this.id).subscribe(
        (response) => {
          if (response.vaccinationState !== '') {
            this.massCase.get('vaccinationState').setValue(response.vaccinationState);
          }
          if (response.notVaccinated !== '') {
            this.massCase.get('notVaccinated').setValue(response.notVaccinated);
          }
          if (response.reasons !== '') {
            this.massCase.get('reasons').setValue(response.reasons);
          }
          this.massCase.get('age').setValue(response.age);
          this.massCase.patchValue({
            cidNumber: response.cidNumber,
            speciesId: response.speciesId,
            animalTypeId: response.animalTypeId,
            breedId: response.breedId,
            male: response.male,
            female: response.female,
            mixed: response.mixed,
            total: response.total,
          });
          this.getAnimalTypes(this.massCase.value.speciesId);
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not load details, please try again later');
        }
      );
    }
  }

  populateForm() {
    this.massCase.patchValue({
      speciesId: this.speciesId,
    });
    this.visMasterService.getAnimalTypes(this.speciesId).subscribe((response) => {
      this.animalTypes = response;
    });

    if (this.speciesId === 3) {
      this.poultry = true;
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = true;
    } else {
      this.poultry = false;
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
    }

    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });
  }
  initializeForm() {
    this.massCase = this.fb.group({
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      breedId: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      male: new FormControl(''),
      female: new FormControl(''),
      mixed: new FormControl(''),
      total: new FormControl(''),
      vaccinationState: new FormControl(''),
      notVaccinated: new FormControl(''),
      reasons: new FormControl(''),
    });
  }

  getAnimalTypes(speciesId: number) {
    this.visMasterService.getAnimalTypes(speciesId).subscribe((response) => {
      this.animalTypes = response;
    });

    this.massCase.value.speciesId;
    if (this.massCase.value.speciesId === 3) {
      this.poultry = true;
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = true;
    } else {
      this.poultry = false;
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
    }
  }

  choose(event: any) {
    if (event === 'male' || event === 'Male') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.massCase.value.male) + Number(this.massCase.value.female);
    } else if (event === 'female' || event === 'Female') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.massCase.value.male) + Number(this.massCase.value.female);
    } else if (event === 'mixed' || event === 'Mixed') {
      this.maleHidden = false;
      this.femaleHidden = false;
      this.mixedHidden = true;
      this.totalData = this.massCase.value.mixed;
    }
  }
  // saveCase() {
  //   if (this.massCase.valid) {
  //     const cases = new Cases();
  //     Object.assign(cases, this.massCase.value);
  //     cases.total = this.totalData;
  //     cases.treatment = this.treatment;
  //     cases.treatementDate = this.treatmentDate;
  //     cases.createdBy = this.credentialsService.credentials.userName;
  //     this.dialogRef.close(cases);
  //   } else {
  //     return;
  //   }
  // }

  updateCase() {
    if (this.massCase.valid) {
      const cases = new Cases();
      Object.assign(cases, this.massCase.value);
      if (this.totalData) {
        cases.total = this.totalData;
      }
      cases.treatment = this.treatment;
      cases.createdBy = this.credentialsService.credentials.userName;
      if (cases.male != null || cases.female != null || cases.male != 0 || cases.female != 0) {
        cases.mixed = 0;
      }
      cases.id = this.id;
      cases.dateDate = this.treatmentDate;
      cases.treatementDate = new Date(this.treatmentDate);
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
