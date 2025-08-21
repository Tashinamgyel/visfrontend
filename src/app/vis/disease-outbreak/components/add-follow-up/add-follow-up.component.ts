import { Component, OnInit, Inject } from '@angular/core';
import { Species, AnimalTypes, Cases, Breeds, VaccineType } from '@app/master-management/models/master';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { NotificationService } from '@app/@core';
import { FATE_TYPE } from '@app/vis/shared/model/model';
import { CredentialsService } from '@app/auth';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-add-follow-up',
  templateUrl: './add-follow-up.component.html',
  styleUrls: ['./add-follow-up.component.scss'],
})
export class AddFollowUpComponent implements OnInit {
  followUpForm: FormGroup;
  fateType = FATE_TYPE;
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  vaccines: any = [];
  actionType: string;
  id: number;
  fate: boolean;
  flashId: number;
  cidDetails: any;
  cid: number;
  fetchedCID: number;
  vaqccinea: VaccineType[];

  constructor(
    public dialogRef: MatDialogRef<AddFollowUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private sharedService: MasterService,
    private notificationService: NotificationService,
    private credentialsService: CredentialsService
  ) {
    this.fetchedCID = JSON.parse(localStorage.getItem('fetchedCID'));
    //alert("this.fetchedCID"+ this.fetchedCID );
  }

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.flashId = this.data.flash;
    this.cid = JSON.parse(localStorage.getItem('cid'));
    //  alert(this.cid);
    this.initializeForm();
    this.populateForm();
  }

  populateForm() {
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.sharedService.loadVaccineType().subscribe((response) => {
      this.vaccines = response;

      // this, (this.vaccines = response);
      // console.log(response, 'dffds');

      // this.followUpForm.patchValue({
      //   vaccineTypeId: response,
      // });
    });

    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });
    if (this.actionType === 'EDIT') {
      this.visMasterService.loadCaseById(this.id, 'FateOfAnimal').subscribe(
        (response) => {
          this.followUpForm.patchValue({
            cidNumber: response.cidNumber,
            fate: response.fate,
            speciesId: response.speciesId,
            animalTypeId: response.animalTypeId,
            breedId: response.breedId,
            numbers: response.numbers,
            vaccineTypeId: response.vaccineTypeId,
          });
          this.getAnimalTypes(this.followUpForm.value.speciesId);
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
  // getVaccineType(animalTypeId: number) {
  //   this.visMasterService.getVaccineType(animalTypeId).subscribe((response) => {
  //     this.vaccines.push(response);
  //     console.log(response, 'asdasd');
  //   });
  // }

  changeFate(fate: string) {
    this.fate = fate === 'Vaccinated';
  }

  initializeForm() {
    this.followUpForm = this.fb.group({
      // cidNumber:new FormControl('', Validators.required),
      fate: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      breedId: new FormControl('', Validators.required),
      numbers: new FormControl('', Validators.required),
      vaccineTypeId: new FormControl(''),
    });
  }

  saveCase() {
    if (this.followUpForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.followUpForm.value);
      cases.type = 'FateOfAnimal';
      if (this.cid != null) {
        cases.cidNumber = this.cid;
      } else {
        cases.cidNumber = this.fetchedCID;
      }
      if (cases.fate == '') {
      }
      cases.createdBy = this.credentialsService.credentials.userName;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  updateCase() {
    if (this.followUpForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.followUpForm.value);
      cases.type = 'FateOfAnimal';
      cases.id = this.id;
      cases.cidNumber = this.fetchedCID;
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
