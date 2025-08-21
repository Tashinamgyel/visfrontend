import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseData, NOTCH_STATUS, OTHER_AGE } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { AnimalTypes, Dzongkhags, Gewogs } from '@app/master-management/models/master';
import { PoultryCaseComponent } from '../poultry-case/poultry-case.component';

import { NotificationService } from '@app/@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flash-case-detail',
  templateUrl: './epidemiology.component.html',
  styleUrls: ['./epidemiology.component.scss'],
})
export class EpidemiologyComponent implements OnInit {
  //poultryForm: FormGroup;
  animalType: any = [];
  breeds: any = [];
  notchStatus = NOTCH_STATUS;
  otherAnimalAges = OTHER_AGE;
  species: any = [];
  //poultryDetailTracker = 0;
  OtherForm: FormGroup;
  animalTypes: AnimalTypes[];

  @ViewChild(PoultryCaseComponent) poultryDtls: PoultryCaseComponent;
  //@ViewChild(OtherCaseComponent) otherCase: OtherCaseComponent;

  id: number;
  registrationId: string;
  flashId: number;
  constructor(
    private sharedService: SharedService,
    private masterService: MasterService,
    private router: Router,
    private notification: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm(0);
  }

  initializeForm() {
    // this.poultryForm = this.fb.group({
    //   poultry: this.fb.array([]),
    // });
  }

  populateForm(index: number) {
    this.masterService.loadMassSpecies().subscribe((res) => {
      this.species[index] = res;
      console.log(this.species);
    });

    this.masterService.loadBreeds().subscribe((res) => {
      this.breeds[index] = res;
    });
  }

  getAnimalType(speciesId: number, index: number) {
    this.sharedService.getAnimalType(speciesId).subscribe((response) => {
      this.animalType[index] = response;
    });
  }

  // deletePoultryRow(index: number) {
  //   if (index > 0) {
  //     const add = this.poultryForm.get('poultry') as FormArray;
  //     add.removeAt(index);
  //   }
  //   this.poultryDetailTracker--;
  // }

  // addOtherSpeciesDetailRow() {
  //   const push = this.poultryForm.get('poultry') as FormArray;
  //   push.push(
  //     this.fb.group({
  //       number: new FormControl('', Validators.required),
  //       female: new FormControl('', Validators.required),
  //       poultryType: new FormControl('', Validators.required),
  //       breedId: new FormControl('', Validators.required),
  //       speciesId: new FormControl('', Validators.required),
  //       animalTypeId: new FormControl('', Validators.required),
  //       vaccinationDate: new FormControl('', Validators.required),
  //       householdAffected: new FormControl('', Validators.required),
  //     })
  //   );
  //   this.poultryDetailTracker++;
  //   this.populateForm(this.poultryDetailTracker);
  // }

  treatmentType = 'poultryDtls';

  saveFlashReport() {
    const caseData: CaseData = {};
    caseData.poultryCase = this.poultryDtls ? this.poultryDtls.saveFlashReport() : [];
    // caseData.OtherCase = this.otherCase ? this.otherCase.saveFlashReport() : [];
    console.log('case', caseData.poultryCase);

    // this.case.id = this.id;
    caseData.flashId = this.registrationId;
    this.sharedService.submitEpidiology(caseData).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/', 'dashboard']);
        this.notification.openSuccessSnackBar('User successfully added');
      },
      () => {
        this.notification.openErrorSnackBar('User details could not be saved, Please try again');
      }
    );
  }
}
