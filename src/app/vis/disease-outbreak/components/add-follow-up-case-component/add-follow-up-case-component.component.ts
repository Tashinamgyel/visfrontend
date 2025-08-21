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
  selector: 'app-add-follow-up-case-component',
  templateUrl: './add-follow-up-case-component.component.html',
  styleUrls: ['./add-follow-up-case-component.component.scss'],
})
export class AddFollowUpCaseComponentComponent implements OnInit {
  followUpCase: FormGroup;
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  cidDetails: any;
  statusType = STATUS_TYPE;
  otherAnimalAges = OTHER_AGE;
  poultryAges = POUTRY_AGE;
  actionType: string;
  flashId: number;
  reportStatus: number;
  id: number;
  poultry: boolean = true;
  maleHidden: boolean = true;
  femaleHidden: boolean = true;
  mixedHidden: boolean = true;
  totalData: any;
  cid: number;
  fetchedCID: number;

  constructor(
    public dialogRef: MatDialogRef<AddFollowUpCaseComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private masterService: MasterService,
    private visMasterService: SharedService,
    private credentialsService: CredentialsService
  ) {
    this.fetchedCID = JSON.parse(localStorage.getItem('fetchedCID'));
    if (this.fetchedCID === undefined) {
      this.fetchedCID = null;
    }
  }

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.cid = JSON.parse(localStorage.getItem('cid'));
    this.initializeForm();
    this.populateForm();
    this.dataToPopulate();

    if (this.actionType === 'EDIT') {
      this.visMasterService.loadCaseById(this.id, 'followUpCase').subscribe(
        (response) => {
          this.followUpCase.patchValue({
            cidNumber: response.cidNumber,
            speciesId: response.speciesId,
            animalTypeId: response.animalTypeId,
            breedId: response.breedId,
            age: response.age,
            male: response.male,
            female: response.female,
            mixed: response.female,
            total: response.total,
            status: response.status,
          });
          this.getAnimalTypes(this.followUpCase.value.speciesId);
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
      this.followUpCase.patchValue({
        speciesId: dataToPopulateVariable.speciesId,
        animalTypeId: dataToPopulateVariable.animalType,
        breedId: dataToPopulateVariable.breedId,
      });
      this.getAnimalTypes(dataToPopulateVariable.speciesId);
    } else {
    }
  }

  populateForm() {
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });
  }
  initializeForm() {
    this.followUpCase = this.fb.group({
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
  getAnimalTypes(speciesId: number) {
    this.visMasterService.getAnimalTypes(speciesId).subscribe((response) => {
      this.animalTypes = response;
    });
    this.followUpCase.value.speciesId;

    if (this.followUpCase.value.speciesId === 3) {
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
      this.totalData = Number(this.followUpCase.value.male) + Number(this.followUpCase.value.female);
    } else if (event === 'female' || event === 'Female') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.followUpCase.value.male) + Number(this.followUpCase.value.female);
    } else if (event === 'mixed' || event === 'Mixed') {
      this.maleHidden = false;
      this.femaleHidden = false;
      this.mixedHidden = true;
      this.totalData = this.followUpCase.value.mixed;
    }
  }
  saveCase() {
    debugger;
    if (this.followUpCase.valid) {
      const cases = new Cases();
      Object.assign(cases, this.followUpCase.value);
      cases.total = this.totalData;
      cases.type = 'followUpCase';
      if (this.cid != null) {
        cases.cidNumber = this.cid;
      } else {
        cases.cidNumber = this.fetchedCID;
      }

      cases.createdBy = this.credentialsService.credentials.userName;

      let dataToPopulate = {};
      (dataToPopulate['speciesId'] = this.followUpCase.value.speciesId),
        (dataToPopulate['animalType'] = this.followUpCase.value.animalTypeId),
        (dataToPopulate['breedId'] = this.followUpCase.value.breedId);
      localStorage.setItem('dataToPopulate', JSON.stringify(dataToPopulate));

      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  updateCase() {
    if (this.followUpCase.valid) {
      const cases = new Cases();
      cases.createdBy = this.credentialsService.credentials.userName;
      Object.assign(cases, this.followUpCase.value);
      cases.total = this.totalData;
      cases.type = 'followUpCase';
      if (cases.male != null || cases.female != null || cases.male != 0 || cases.female != 0) {
        cases.mixed = 0;
      }
      cases.id = this.id;
      cases.cidNumber = this.fetchedCID;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
