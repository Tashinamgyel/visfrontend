import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { NotificationService } from '@core';
import {
  AnimalTypes,
  Breeds,
  Country,
  Dzongkhags,
  Gewogs,
  OwnershipTypes,
  Species,
  Villages,
} from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { DogRegistration } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { AddMassComponent } from '../add-mass/add-mass.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MassConfirmationComponent } from './mass-confirmation/mass-confirmation.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/auth';

export const submitDet: DogRegistration = {
  mass_id: 1,
  passportNumber: '',
  massRegistrationId: '',
  nationality: 1,
  cidNumber: 12001003823,
  ownerName: 'John',
  dzongkhagId: 1,
  villageId: 1,
  gewogId: 2,
  mobileNumber: 11111111,
  emailId: 'someone@something.com',
  locality: 'Choekhor',
  ownershipTypeId: 1,
};

@Component({
  selector: 'app-dog-registration',
  templateUrl: './mass-registration.component.html',
  styleUrls: ['./mass-registration.component.scss'],
})
export class MassRegistrationComponent implements OnInit {
  massRegistrationForm: FormGroup;
  massRegistrationFormForSearch: FormGroup;

  public registered = false;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  animalTypes: AnimalTypes[];
  ownershipTypes: OwnershipTypes[];
  species: Species[];
  breeds: Breeds[];
  massRegistrationDetails: any;
  nationality: boolean;
  villages: Villages[];

  countrys: Country[];

  displayedColumns: string[] = ['slno', 'date'];
  dataSource = new MatTableDataSource();

  mobileNumberForValidation: any;

  animalTypeForBhutanese: any = [
    { id: 1, ownerType: 'Royal' },
    { id: 2, ownerType: 'Public' },
    { id: 3, ownerType: 'Government' },
    { id: 4, ownerType: 'CSO' },
  ];

  animalTypeForNonBhutanese: any = [
    { id: 2, ownerType: 'Public' },
    { id: 3, ownerType: 'Government' },
    { id: 4, ownerType: 'CSO' },
  ];

  forBhutanese: any = true;
  forNonBhutanese: any = false;

  clickedData: any;

  massRegistrationNoForSearch: any;

  nationalityForShowing: any;

  nationalityChange: any;
  userDetails: any;

  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private dialog: MatDialog,
    private notification: NotificationService,
    private activateRoute: ActivatedRoute,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
    this.massRegistrationForm.patchValue({
      nationality: 1,
    });
  }

  initializeForm() {
    this.massRegistrationForm = this.fb.group({
      nationality: new FormControl(''),
      passportNumber: new FormControl('', Validators.required),
      cidNumber: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.email),
      locality: new FormControl(''),
      ownershipTypeId: new FormControl('', Validators.required),
      villageId: new FormControl(''),
      countryId: new FormControl('', Validators.required),
      mobileNumberSelect: new FormControl('', Validators.required),
      tashicellNumber: new FormControl(''),
      bmobileNumber: new FormControl(''),
      telecomeService: new FormControl(''),
    });

    this.massRegistrationFormForSearch = this.fb.group({
      massRegistrationNoForSearch: new FormControl('', Validators.required),
    });

    //  console.log('clickedDataasdasdasdasdsadsadsads', this.activateRoute.snapshot.paramMap.get('clickedData'));
    this.checkClickedData();
  }

  getMassRegistrationNumber() {
    //  console.log('massRegistrationNoForSearch', this.massRegistrationFormForSearch.value.massRegistrationNoForSearch);
    if (this.massRegistrationFormForSearch.value.massRegistrationNoForSearch === '') {
      // this.notification.openErrorSnackBar('Enter Mass Registration Number');
    } else {
      var MRN = this.massRegistrationFormForSearch.value.massRegistrationNoForSearch;

      this.populateForm();

      this.visMasterService.getMassDetails(MRN).subscribe((response) => {
       // console.log('masss details in search', response);
        if (response.cidNumber != null) {
          this.nationalityChange = 1;
          //this.nationalityForShowing = "Bhutanese"
          this.changeNationality(1);
        } else if (response.cidNumber === null) {
          this.nationalityChange = 2;
          //this.nationalityForShowing = "Non-Bhutanese"
          this.changeNationality(2);
        }

        this.getGewogs(response.dzongkhag.id);

        this.massRegistrationForm.patchValue({
          nationality: this.nationalityChange,
          passportNumber: response.passportNumber,
          cidNumber: response.cidNumber,
          ownerName: response.ownerName,
          dzongkhagId: response.dzongkhag,
          gewogId: response.gewog,
          mobileNumber: response.mobileNumber,
          emailId: response.emailId,
          locality: response.locality,
          ownershipTypeId: response.ownerType,
          villageId: response.village,
          // countryId: response.,
        });

        this.getVillage(response.gewog.id);

        console.log('this.massRegistrationForm.value.gewog.id', response.gewog.id);
      });
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  checkClickedData() {
    var clicked = this.activateRoute.snapshot.paramMap.get('clickedData');
    if (clicked === 'search') {
      this.clickedData = true;
    } else if (clicked === 'registration') {
      this.clickedData = false;
    }
  }

  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
    });

    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterService.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });

    this.visMasterService.loadCountry().subscribe((response) => {
      this.countrys = response;
    });

    this.loadNationality(true);
  }
  getCitizen(cidNumber: number) {
    this.service.getCitizen(cidNumber).subscribe(
      (response) => {
        this.massRegistrationForm.patchValue({
          ownerName: response.fullName,
        });
      },
      () => {
        this.notification.openErrorSnackBar('Could not load details, please try again later');
      }
    );
  }

  getGewogs(dzongkhagId: number) {
    this.massRegistrationForm.get('gewogId').reset();
    this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  getVillage(gewogId: number) {
    this.visMasterService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }

  getAnimalTypes(speciesId: number) {
    this.visMasterService.getAnimalTypes(speciesId).subscribe((response) => {
      this.animalTypes = response;
    });
  }

  loadNationality(event: true) {
    this.nationality = event;
  }

  changeNationality(nationalityChangeValue: any) {
    var eventValue = this.massRegistrationForm.value.nationality;

    if (this.nationalityChange === 1) {
      eventValue = 1;
      if (nationalityChangeValue === 1) {
        eventValue = 1;
      } else if (nationalityChangeValue === 2) {
        eventValue = 2;
      }
    } else if (this.nationalityChange === 2) {
      // this.nationality = Number(eventValue) === 2;
      eventValue = 2;
      if (nationalityChangeValue === 1) {
        eventValue = 1;
      } else if (nationalityChangeValue === 2) {
        eventValue = 2;
      }
    }

    this.nationality = Number(eventValue) === 1;

    if (eventValue === 1) {
      this.forBhutanese = true;
      this.forNonBhutanese = false;
    } else if (eventValue === 2) {
      this.forBhutanese = false;
      this.forNonBhutanese = true;
    }
  }

  massConfirmation() {
    if (this.massRegistrationForm.value.nationality === 1) {
      if (
        this.massRegistrationForm.value.cidNumber != '' &&
        this.massRegistrationForm.value.ownerName != '' &&
        this.massRegistrationForm.value.dzongkhagId != '' &&
        this.massRegistrationForm.value.gewogId != '' &&
        this.massRegistrationForm.value.mobileNumber != '' &&
        this.massRegistrationForm.value.ownershipTypeId != ''
      ) {
        if (this.massRegistrationForm.value.mobileNumber.length < 8 || this.massRegistrationForm.value.cidNumber.length < 11) {
          this.notification.openErrorSnackBar('Please enter the required data');
        } else {
          const dialogRef = this.dialog.open(MassConfirmationComponent, {
            width: '800px',
          });

          dialogRef.afterClosed().subscribe((result) => {
            //    console.log('confirmationData', result);

            if (result === 1) {
              console.log('yes');
              this.saveMassRegistration();
            } else if (result === 2) {
              console.log('no');
            }
          });
        }
      } else {
        this.notification.openErrorSnackBar('Please enter the required data');
      }
    } else if (this.massRegistrationForm.value.nationality === 2) {
      if (
        this.massRegistrationForm.value.passportNumber != '' &&
        this.massRegistrationForm.value.ownerName != '' &&
        this.massRegistrationForm.value.countryId != '' &&
        this.massRegistrationForm.value.dzongkhagId != '' &&
        this.massRegistrationForm.value.gewogId != '' &&
        this.massRegistrationForm.value.mobileNumber != '' &&
        this.massRegistrationForm.value.ownershipTypeId != ''
      ) {
        const dialogRef = this.dialog.open(MassConfirmationComponent, {
          width: '800px',
        });

        dialogRef.afterClosed().subscribe((result) => {
          // console.log('confirmationData', result);

          if (result === 1) {
            console.log('yes');
            this.saveMassRegistration();
          } else if (result === 2) {
            console.log('no');
          }
        });
      } else {
        this.notification.openErrorSnackBar('Please enter the required data');
      }
    }
  }

  saveMassRegistration() {
    const dogRegistration = new DogRegistration();
    Object.assign(dogRegistration, this.massRegistrationForm.value);

    var dogRegistrationValueReassigning = {};
    dogRegistrationValueReassigning['cidNumber'] = this.massRegistrationForm.value.cidNumber;
    dogRegistrationValueReassigning['countryId'] = this.massRegistrationForm.value.countryId;
    dogRegistrationValueReassigning['dzongkhagId'] = this.massRegistrationForm.value.dzongkhagId.id;
    dogRegistrationValueReassigning['emailId'] = this.massRegistrationForm.value.emailId;
    dogRegistrationValueReassigning['gewogId'] = this.massRegistrationForm.value.gewogId.id;
    dogRegistrationValueReassigning['locality'] = this.massRegistrationForm.value.locality;

    // console.log('this.massRegistrationForm.value.telecomeService', this.massRegistrationForm.value.telecomeService);

    dogRegistrationValueReassigning['mobileNumber'] = this.massRegistrationForm.value.mobileNumber;
    dogRegistrationValueReassigning['nationality'] = this.massRegistrationForm.value.nationality;
    dogRegistrationValueReassigning['ownerName'] = this.massRegistrationForm.value.ownerName;
    dogRegistrationValueReassigning['ownershipTypeId'] = this.massRegistrationForm.value.ownershipTypeId.id;
    dogRegistrationValueReassigning['passportNumber'] = this.massRegistrationForm.value.passportNumber;
    dogRegistrationValueReassigning['villageId'] = this.massRegistrationForm.value.villageId.id;

    //  console.log('dogRegistrationValueReassigning', dogRegistrationValueReassigning);

    dogRegistrationValueReassigning['userName'] = this.userDetails.userName;
    dogRegistrationValueReassigning['centreId'] = this.userDetails.centre.id;
    dogRegistrationValueReassigning['levelUserId'] = this.userDetails.levelUser.id;
    dogRegistrationValueReassigning['jurisdiction'] = this.userDetails.jurisdiction;
    dogRegistrationValueReassigning['fullName'] = this.userDetails.fullName;

    this.visMasterService.saveDogRegistration(dogRegistrationValueReassigning).subscribe(
      (res) => {
        this.notification.openSuccessSnackBar('Submitted Successfully');
        this.massRegistrationDetails = res;
        this.registered = true;
        localStorage.setItem('massRegistrationFormData', JSON.stringify(this.massRegistrationForm.value));
      },
      () => {
        this.notification.openErrorSnackBar(' could not be Submitted, please try again');
      }
    );
  }

  submitMassDog() {
    this.visMasterService.saveDogRegistration(submitDet).subscribe(
      (res) => {
        this.notification.openSuccessSnackBar('Mass registration successfully added');
        this.massRegistrationDetails = res;
        this.registered = true;
      },
      () => {
        this.notification.openErrorSnackBar('Mass registration could not be saved, please try again');
      }
    );
  }

  printPage() {
    window.print();
  }

  getMobileNumber(whatMobileNumber: any) {
    this.mobileNumberForValidation = whatMobileNumber.value;
  }
}
