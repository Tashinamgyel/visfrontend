import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@core';
import { MatRadioChange } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { routes } from '@app/shell/consts';
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
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { Registration } from '@app/vis/shared/model/model';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { PatientIdPopupComponent } from './patient-id-popup/patient-id-popup.component';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public routes: typeof routes = routes;
  public registered = false;
  registrationForm: FormGroup;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  ownershipTypes: OwnershipTypes[];
  species: Species[];
  animalTypes: AnimalTypes[];
  dzongkhagId: number;
  breeds: Breeds[];
  nationality: boolean;
  villages: Villages[];
  countrys: Country[];
  statusFlag: boolean;
  registration: Observable<Registration[]>;
  registrationDetails: any;
  cidNumber: number;
  neuterStatus: boolean;
  userDetails: any;
  data: any;
  constructor(
    // public data: any,
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private dialog: MatDialog,
    private service: MasterService,
    private notification: NotificationService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
    this.registrationForm.patchValue({
      nationality: 1,
    });
    var registrationFormData = JSON.parse(localStorage.getItem('registrationFormData'));
    if (registrationFormData != null) {
      this.formFillUp();
    }
  }
  loadDraftNationality(event: any) {
    this.nationality = event;
  }
  formFillUp() {
    var registrationFormData = JSON.parse(localStorage.getItem('registrationFormData'));

    console.log(registrationFormData, 'registrationFormData');

    this.data = JSON.parse(localStorage.getItem('registrationFormData'));
    if (this.data.nationality === 1) {
      this.registrationForm.patchValue({
        nationality: 1,
        cidNumber: registrationFormData.cidNumber,
      });
      this.loadDraftNationality(true);
    } else {
      this.registrationForm.patchValue({
        nationality: 2,
        passportNumber: registrationFormData.passportNumber,
        countryId: registrationFormData.countryId,
      });
      this.loadDraftNationality(false);
    }
    this.registrationForm.patchValue({
      //nationality: registrationFormData.nationality,
      //passportNumber: registrationFormData.passportNumber,
      //cidNumber: registrationFormData.cidNumber,
      ownerName: registrationFormData.ownerName,
      dzongkhagId: registrationFormData.dzongkhagId,
      gewogId: registrationFormData.gewogId,
      //changeNationality:registrationFormData.changeNationality,
      villageId: registrationFormData.villageId,
      mobileNumber: registrationFormData.mobileNumber,
      emailId: registrationFormData.emailId,
      locality: registrationFormData.locality,
      petRegistrationTypeId: registrationFormData.petRegistrationTypeId,
      earTagNumber: registrationFormData.earTagNumber,
      microchipNumber: registrationFormData.microchipNumber,
      petRegistrationNumber: registrationFormData.petRegistrationNumber,
      animalName: registrationFormData.animalName,
      locationOfAnimal: registrationFormData.locationOfAnimal,
      speciesId: registrationFormData.speciesId,
      animalTypeId: registrationFormData.animalTypeId,
      breedId: registrationFormData.breedId,
      //countryId: registrationFormData.countryId,
      age: registrationFormData.age,
      sex: registrationFormData.sex,
      day: registrationFormData.day,
      year: registrationFormData.year,
      month: registrationFormData.month,
      bodyweight: registrationFormData.bodyweight,
      weightUnit: registrationFormData.weightUnit,
      neuterStatus: registrationFormData.neuterStatus,
    });
    this.getGewogs(registrationFormData.dzongkhagId);
    this.getVillage(registrationFormData.gewogId);
    this.getAnimalTypes(registrationFormData.speciesId);
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      nationality: new FormControl(''),
      passportNumber: new FormControl('', Validators.required),
      cidNumber: new FormControl('', Validators.required),

      ownerName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      villageId: new FormControl(''),
      mobileNumber: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8), Validators.minLength(8)])
      ),
      emailId: new FormControl(''),
      countryId: new FormControl('', Validators.required),
      locality: new FormControl(''),
      petRegistrationTypeId: new FormControl('', Validators.required),
      earTagNumber: new FormControl(''),
      microchipNumber: new FormControl(''),
      petRegistrationNumber: new FormControl(''),
      animalName: new FormControl(''),
      locationOfAnimal: new FormControl(''),
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      breedId: new FormControl('', Validators.required),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      sex: new FormControl(''),
      bodyweight: new FormControl('', Validators.required),
      weightUnit: new FormControl(''),
      neuterStatus: new FormControl('', Validators.required),
    });
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

  getVillage(gewogId: number) {
    this.visMasterService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }
  getGewogs(dzongkhagId: number) {
    this.registrationForm.get('gewogId').reset();
    this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
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

  changeNationality(event: MatRadioChange) {
    this.nationality = Number(event.value) === 1;
    this.registrationForm.get('cidNumber').setValue('');
  }

  getCitizen(cidNumber: number) {
    this.service.getCitizen(cidNumber).subscribe(
      (response) => {
        this.registrationForm.patchValue({
          ownerName: response.fullName,
        });
      },
      () => {
        this.notification.openErrorSnackBar('Could not load details, please try again later');
      }
    );
  }

  DogOrCat() {
    var animalType = this.registrationForm.value.animalTypeId;
    if (animalType === 14 || animalType === 15) {
      this.neuterStatus = true;
    } else {
      this.neuterStatus = false;
    }
  }

  saveRegistration() {
    if (this.registrationForm.value.sex === '') {
      this.statusFlag = true;
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else {
      this.statusFlag = false;
    }
    if (this.registrationForm.value.animalTypeId === 14 || this.registrationForm.value.animalTypeId === 15)
      if (this.registrationForm.value.neuterStatus === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      }
    if (this.registrationForm.value.nationality === 1) {
      if (
        this.registrationForm.value.cidNumber != '' &&
        this.registrationForm.value.ownerName != '' &&
        this.registrationForm.value.dzongkhagId != '' &&
        this.registrationForm.value.gewogId != '' &&
        this.registrationForm.value.mobileNumber != '' &&
        this.registrationForm.value.petRegistrationTypeId != '' &&
        this.registrationForm.value.animalTypeId != '' &&
        this.registrationForm.value.breedId != '' &&
        this.registrationForm.value.sex != '' &&
        this.registrationForm.value.bodyweight != ''
      ) {
        const registration = new Registration();
        registration.userName = this.userDetails.userName;
        registration.centreId = this.userDetails.centre.id;
        registration.levelUserId = this.userDetails.levelUser.id;
        registration.jurisdiction = this.userDetails.jurisdiction;
        registration.fullName = this.userDetails.fullName;
        if (
          this.registrationForm.value.cidNumber.length < 11 ||
          this.registrationForm.value.mobileNumber < 8 ||
          this.registrationForm.value.sex === ''
        ) {
          this.notification.openErrorSnackBar('Enter all required fields');
          // this.statusFlag = true;
        } else {
          Object.assign(registration, this.registrationForm.value);
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px',
            data: {
              title: 'Confirmation',
              message: 'Do you want to submit?',
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.visMasterService.saveRegistration(registration).subscribe(
                (response) => {
                  this.notification.openSuccessSnackBar('Submitted successfully');
                  localStorage.removeItem('registrationFormData');
                  const dialogRef = this.dialog.open(PatientIdPopupComponent, {
                    width: '500px',
                    data: {
                      registrationDetails: response,
                    },
                  });
                  this.router.navigate(['/', 'dashboard']);
                  this.registrationDetails = response;
                  localStorage.setItem('ownerDetails', JSON.stringify(this.registrationDetails));
                },
                () => {
                  this.notification.openErrorSnackBar('Could not be submitted');
                }
              );
            } else {
              dialogRef.close();
            }
          });
        }
      } else {
        this.notification.openErrorSnackBar('Enter all required fields');
      }
    } else {
      if (
        this.registrationForm.value.passportNumber != '' &&
        this.registrationForm.value.ownerName != '' &&
        this.registrationForm.value.dzongkhagId != '' &&
        this.registrationForm.value.gewogId != '' &&
        this.registrationForm.value.mobileNumber != '' &&
        this.registrationForm.value.petRegistrationTypeId != '' &&
        this.registrationForm.value.animalTypeId != '' &&
        this.registrationForm.value.breedId != '' &&
        this.registrationForm.value.countryId != '' &&
        this.registrationForm.value.sex != '' &&
        this.registrationForm.value.bodyweight != ''
      ) {
        const registration = new Registration();
        registration.userName = this.userDetails.userName;
        registration.centreId = this.userDetails.centre.id;
        registration.levelUserId = this.userDetails.levelUser.id;
        registration.jurisdiction = this.userDetails.jurisdiction;
        registration.fullName = this.userDetails.fullName;

        if (this.registrationForm.value.mobileNumber.length < 8) {
          this.notification.openErrorSnackBar('Enter all required fields');
        } else {
          Object.assign(registration, this.registrationForm.value);
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px',
            data: {
              title: 'Confirmation',
              message: 'Do you want to submit?',
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.visMasterService.saveRegistration(registration).subscribe(
                (response) => {
                  this.notification.openSuccessSnackBar('Submitted successfully');
                  localStorage.removeItem('registrationFormData');
                  this.router.navigate(['/', 'dashboard']);
                  const dialogRef = this.dialog.open(PatientIdPopupComponent, {
                    width: '500px',
                    data: {
                      registrationDetails: response,
                    },
                  });
                  this.registrationDetails = response;
                  this.router.navigate(['/', 'dashboard']);
                  localStorage.setItem('ownerDetails', JSON.stringify(this.registrationDetails));
                },
                () => {
                  this.notification.openErrorSnackBar('Could not be Submitted');
                }
              );
            } else {
              dialogRef.close();
            }
          });
        }
      } else {
        this.notification.openErrorSnackBar('Enter all required fields');
      }
    }
  }

  viewPage() {
    const registration = new Registration();
    Object.assign(registration, this.registrationForm.value);
    const dialogRef = this.dialog.open(RegistrationComponent, {
      height: '1000px',
      width: '1000px',
    });
  }

  printPage() {
    window.print();
  }

  saveAsDraft() {
    localStorage.setItem('registrationFormData', JSON.stringify(this.registrationForm.value));
    this.notification.openSuccessSnackBar('Successfully saved as draft');
  }

  validateNumber(type: any) {
    if (type == 'cidNumber') {
      if (this.registrationForm.value.cidNumber == 0) {
        this.registrationForm.get('cidNumber').reset();
      }
    }
  }
  validateYear(type: any) {
    if (type == 'year') {
      if (this.registrationForm.value.year == 0) {
        this.registrationForm.get('year').reset();
      }
    }

    if (type == 'month') {
      if (this.registrationForm.value.month > 11 || this.registrationForm.value.month == 1) {
        this.registrationForm.get('month').reset();
      }
    }

    if (type == 'day') {
      if (this.registrationForm.value.day > 29 || this.registrationForm.value.day == 1) {
        this.registrationForm.get('day').reset();
      }
    }
  }
}
