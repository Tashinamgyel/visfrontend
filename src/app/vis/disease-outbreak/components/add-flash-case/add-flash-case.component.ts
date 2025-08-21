import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Species, AnimalTypes, Breeds, Cases } from '@app/master-management/models/master';
import { STATUS_TYPE, OTHER_AGE, POUTRY_AGE } from '@app/vis/shared/model/model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-add-flash-case',
  templateUrl: './add-flash-case.component.html',
  styleUrls: ['./add-flash-case.component.scss'],
})
export class AddFlashCaseComponent implements OnInit {
  flashCase: FormGroup;
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  statusType = STATUS_TYPE;
  otherAnimalAges = OTHER_AGE;
  poultryAges = POUTRY_AGE;
  actionType: string;
  id: number;
  poultry: boolean = true;
  maleHidden: boolean = true;
  femaleHidden: boolean = true;
  mixedHidden: boolean = true;

  totalData: any;
  constructor(
    public dialogRef: MatDialogRef<AddFlashCaseComponent>,
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
    this.dataToPopulate();
  }
  populateForm() {
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });

    if (this.actionType === 'EDIT') {
      this.visMasterService.loadCaseById(this.id, 'FlashCase').subscribe(
        (response) => {
          this.flashCase.patchValue({
            speciesId: response.speciesId,
            animalTypeId: response.animalTypeId,
            breedId: response.breedId,
            age: response.age,
            male: response.male,
            female: response.female,
            total: response.total,
            status: response.status,
          });
          this.getAnimalTypes(this.flashCase.value.speciesId);
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not load details, please try again later');
        }
      );
    }
  }

  dataToPopulate() {
    var dataToPopulateVariable = JSON.parse(localStorage.getItem('dataToPopulate'));

    if (dataToPopulateVariable != null) {
      this.flashCase.patchValue({
        speciesId: dataToPopulateVariable.speciesId,
        animalTypeId: dataToPopulateVariable.animalType,
        breedId: dataToPopulateVariable.breedId,
      });
      this.getAnimalTypes(dataToPopulateVariable.speciesId);
    } else {
    }
  }

  getAnimalTypes(speciesId: number) {
    this.visMasterService.getAnimalTypes(speciesId).subscribe((response) => {
      this.animalTypes = response;
    });
    this.flashCase.value.speciesId;

    if (this.flashCase.value.speciesId === 3) {
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
      this.totalData = Number(this.flashCase.value.male) + Number(this.flashCase.value.female);
    } else if (event === 'female' || event === 'Female') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.flashCase.value.male) + Number(this.flashCase.value.female);
    } else if (event === 'mixed' || event === 'Mixed') {
      this.maleHidden = false;
      this.femaleHidden = false;
      this.mixedHidden = true;
      this.totalData = this.flashCase.value.mixed;
    }
  }

  initializeForm() {
    this.flashCase = this.fb.group({
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      breedId: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      male: new FormControl(''),
      female: new FormControl(''),
      mixed: new FormControl(''),
      total: new FormControl(''),
      status: new FormControl('', Validators.required),
    });
  }

  saveCase() {
    if (this.flashCase.valid) {
      const cases = new Cases();
      Object.assign(cases, this.flashCase.value);
      cases.total = this.totalData;
      cases.speciesId = this.flashCase.value.speciesId;
      //Object.assign(this.flashCase + this.totalData);
      cases.type = 'flashCase';
      cases.createdBy = this.credentialsService.credentials.userName;

      let dataToPopulate = {};
      (dataToPopulate['speciesId'] = this.flashCase.value.speciesId),
        (dataToPopulate['animalType'] = this.flashCase.value.animalTypeId),
        (dataToPopulate['breedId'] = this.flashCase.value.breedId);
      localStorage.setItem('dataToPopulate', JSON.stringify(dataToPopulate));
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  updateCase() {
    if (this.flashCase.valid) {
      const cases = new Cases();
      Object.assign(cases, this.flashCase.value);
      cases.id = this.id;
      cases.total = this.totalData;
      cases.type = 'flashCase';
      cases.createdBy = this.credentialsService.credentials.userName;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  closeDialog() {
    // console.log('animalForm', this.animalForm.value)
    this.dialogRef.close();
  }
}
