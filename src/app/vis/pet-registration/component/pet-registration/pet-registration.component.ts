import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@core';
import { Dzongkhags, Gewogs, OwnershipTypes, PetBreeds, Species, Villages } from '@app/master-management/models/master';
import { Country, PetRegistration } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { Router } from '@angular/router';
import { CommonDialogComponent } from '@app/vis/common-dialog/common-dialog.component';
import { MatRadioChange } from '@angular/material/radio';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-pet-registration',
  templateUrl: './pet-registration.component.html',
  styleUrls: ['./pet-registration.component.scss'],
})
export class PetRegistrationComponent implements OnInit {
  petRegistrationForm: FormGroup;
  ownershipTypes: OwnershipTypes[];
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  dzongkhagId: number;
  species: Species[];
  petBreeds: PetBreeds[];
  maxDate = new Date();
  fileToUpload: File = null;
  fileId: number;
  petRegistrationNumber: any;
  villages: Villages[];
  registrationDetails: any;
  public registered = false;
  nationality: boolean;
  nonbFlag: boolean = true;
  countrys: Country[];
  isReadOnly: boolean = true;
  cidValidation: boolean = true;
  hasPetPhoto: any;
  hasBarcodeImage: any;
  hasPetPhotoFlag: boolean = false;
  hasBarcodeImageFlag: boolean = false;
  userDetails: any;
  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private router: Router,
    private notification: NotificationService,
    private dialog: MatDialog,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
    //console.log(this.credentialsService.credentials,"this.credentialsService.credentials");

    this.petRegistrationForm.patchValue({
      nationality: 1,
    });
    this.nonbFlag == true;
  }

  initializeForm() {
    this.petRegistrationForm = this.fb.group({
      petRegistrationTypeId: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      locality: new FormControl(),

      mobileNumber: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])
      ),
      emailId: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      ),
      petName: new FormControl('', [Validators.required]),
      // microchipNumber: new FormControl('', Validators.compose([Validators.minLength(15), Validators.maxLength(15)])),
      registrationDate: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
      colour: new FormControl('', Validators.required),
      distinguishingMark: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      dateRenewal: new FormControl('', Validators.required),
      microchipNumber: new FormControl(''),
      receiptNumber: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      photos: new FormControl(''),
      petBreedId: new FormControl('', Validators.required),
      files: new FormControl('', Validators.required),
      cid: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
      ),

      villageId: new FormControl(),
      passportNumber: new FormControl('', Validators.required),
      neuterStatus: new FormControl('', Validators.required),
      breederStatus: new FormControl('', Validators.required),
      countryId: new FormControl(''),
      hasPetPhoto: new FormControl('', Validators.required),
      hasBarcodeImage: new FormControl(''),
    });
  }

  public checkFormControl = (controlName: string, errorName: string) => {
    return this.petRegistrationForm.controls[controlName].hasError(errorName);
  };

  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
    });

    this.visMasterService.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterService.loadDogSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadCountry().subscribe((response) => {
      this.countrys = response;
    });

    this.loadNationality(true);
  }
  loadNationality(event: true) {
    this.nationality = event;
  }

  changeNationality(event: MatRadioChange) {
    this.nationality = Number(event.value) === 1;
    this.petRegistrationForm.get('cid').setValue('');
    this.validateRoyal();
  }

  getCitizen(cid: number) {
    this.petRegistrationForm.value.ownerName == '';
    this.service.getCitizen(cid).subscribe(
      (response) => {
        if (response != null) {
          this.petRegistrationForm.patchValue({
            ownerName: response.fullName,
          });
        } else {
          this.petRegistrationForm.patchValue({
            ownerName: '',
          });
        }
      },
      () => {
        this.notification.openErrorSnackBar('Could not load details, please try again later');
      }
    );
  }

  getCheckMicrochipNumber(microchipNumber: string) {
    this.service.checkMicrochipNumber(microchipNumber).subscribe((response) => {
      if (response === true) {
        this.notification.openErrorSnackBar('Microchip number already exists');
        this.petRegistrationForm.get('microchipNumber').setValue('');
      }
    });
  }
  getGewogs(dzongkhagId: number) {
    this.petRegistrationForm.get('gewogId').reset();
    this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
      //this.petRegistrationForm.controls.gewogId.setValidators(Validators.required);
      // this.petRegistrationForm.value.dzongkhagId.clearValidators;
    });
  }
  getVillage(gewogId: number) {
    this.visMasterService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }
  showBarImage: boolean = false;
  showMgs: boolean = false;
  dontShowSign: boolean = false;

  hideRequiredMarker: boolean = true;
  getPetBreeds(speciesId: number) {
    if (speciesId === 7) {
      this.showBarImage = true;
      this.dontShowSign = true;
      this.showMgs = true;
    } else {
      this.showBarImage = false;
      this.dontShowSign = false;
      this.showMgs = false;
    }
    this.visMasterService.getPetBreeds(speciesId).subscribe((response) => {
      this.petBreeds = response;
    });
  }
  selectFile(files: FileList, docName: string) {
    this.fileToUpload = files.item(0);
    this.visMasterService
      .uploadAttachment(this.fileToUpload, this.credentialsService.credentials.userName, docName)
      .subscribe(
        (response) => {
          this.fileId = response['id'];
        },
        () => {
          this.notification.openErrorSnackBar('File could not be saved, please try again');
        }
      );
  }
  viladateAnimal() {}

  petRegistrationNumbers: any;
  savePetRegistration() {
    debugger;
    const petRegistration = new PetRegistration();
    if (this.hasPetPhoto == undefined) {
      this.hasPetPhotoFlag = true;
      return;
    } else {
      this.hasPetPhotoFlag = false;
    }
    if (this.petRegistrationForm.value.speciesId == 7 && this.hasBarcodeImage == undefined) {
      this.hasBarcodeImageFlag = true;
      return;
    } else {
      this.hasBarcodeImageFlag = false;
    }

    if (this.petRegistrationForm.value.nationality == 1) {
      if (this.petRegistrationForm.value.petRegistrationTypeId != 1) {
        if (this.petRegistrationForm.value.cid === '') {
          this.notification.openErrorSnackBar('Enter required fields');
          return;
        }
      }
    } else {
      if (this.petRegistrationForm.value.passportNumber == '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      }
    }

    if (
      this.petRegistrationForm.value.mobileNumber.length < 8 ||
      this.petRegistrationForm.value.sex == '' ||
      this.petRegistrationForm.value.dzongkhagId == '' ||
      this.petRegistrationForm.value.gewogId == '' ||
      this.petRegistrationForm.value.gewogId == null ||
      this.petRegistrationForm.value.petName == '' ||
      this.petRegistrationForm.value.speciesId == '' ||
      this.petRegistrationForm.value.breedId == '' ||
      this.petRegistrationForm.value.colour == '' ||
      this.petRegistrationForm.value.distinguishingMark == '' ||
      this.petRegistrationForm.value.neuterStatus == '' ||
      this.petRegistrationForm.value.registrationDate == ''
    ) {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else {
      Object.assign(petRegistration, this.petRegistrationForm.value);
      if (this.petRegistrationForm.value.speciesId == 7) {
        if (this.petRegistrationForm.value.microchipNumber.length < 15) {
          this.notification.openErrorSnackBar('Microchip Number required');
          return;
        }
      }
      petRegistration.fileId = this.fileId;
      if (petRegistration.countryId === '') {
        petRegistration.countryId = 0;
      }
      // petRegistration.userId = this.credentialsService.credentials.userName;

      petRegistration.userName = this.userDetails.userName;
      petRegistration.centreId = this.userDetails.centre.id;
      petRegistration.levelUserId = this.userDetails.levelUser.id;
      petRegistration.jurisdiction = this.userDetails.jurisdiction;
      petRegistration.fullName = this.userDetails.fullName;

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          title: 'Confirmation',
          message: 'Do you want to submit pet registration?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.visMasterService.savePetRegistration(petRegistration).subscribe(
            (response) => {
              console.log(response, 'this is isisi ');

              const res = JSON.parse(JSON.stringify(response));
              this.petRegistrationNumbers = res.petRegistrationNumber;
              console.log(response, ' save here  ');
              this.saveClinicals();
              this.notification.openSuccessSnackBar('Submitted Successfully ');
              this.registered = true;
              this.registrationDetails = response;
              this.router.navigate(['/', 'dashboard']);
            },
            () => {
              this.notification.openErrorSnackBar('Cannot be Submitted');
            }
          );
        } else {
          dialogRef.close();
        }
      });
    }
  }

  array(len: number): number[] {
    return new Array(len);
  }
  saveClinicals() {
    petRegistrationNumber: this.petRegistrationNumbers;
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '800px',
      data: {
        petRegistrationNumber: this.petRegistrationNumbers,
      },
    });
  }

  printPage() {
    window.print();
  }

  validateYear(type: any) {
    if (type == 'year') {
      if (this.petRegistrationForm.value.year > 100 || this.petRegistrationForm.value.year == 0) {
        this.petRegistrationForm.get('year').reset();
      }
    }

    if (type == 'month') {
      if (this.petRegistrationForm.value.month > 11 || this.petRegistrationForm.value.month == 0) {
        this.petRegistrationForm.get('month').reset();
      }
    }

    if (type == 'day') {
      if (this.petRegistrationForm.value.day > 29 || this.petRegistrationForm.value.day == 0) {
        this.petRegistrationForm.get('day').reset();
      }
    }
  }
  dontShow: boolean = true;
  ownerValidation = true;
  validateRoyal() {
    this.dateChange();
    if (
      this.petRegistrationForm.value.petRegistrationTypeId == 1 ||
      this.petRegistrationForm.value.petRegistrationTypeId == 3
    ) {
      this.nonbFlag = false;
      this.dontShow = false;
      this.ownerValidation = false;
    } else {
      this.nonbFlag = true;
    }
    if (this.petRegistrationForm.value.petRegistrationTypeId == 1 || this.nationality == false) {
      this.isReadOnly = false;
      this.cidValidation = false;
    } else {
      this.isReadOnly = true;
      this.cidValidation = true;
    }
    if (this.petRegistrationForm.value.petRegistrationTypeId == 1) {
      this.petRegistrationForm.controls.cid.clearValidators();
      this.petRegistrationForm.controls.cid.updateValueAndValidity();
      this.petRegistrationForm.controls.mobileNumber.clearValidators();
      this.petRegistrationForm.controls.mobileNumber.updateValueAndValidity();
    } else {
      this.petRegistrationForm.controls.cid.setValidators(
        Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
      );
      this.petRegistrationForm.controls.cid.updateValueAndValidity();
      this.petRegistrationForm.controls.mobileNumber.setValidators(
        Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(8)])
      );
      this.petRegistrationForm.controls.mobileNumber.updateValueAndValidity();

      // this.petRegistrationForm.controls.microchipNumber.updateValueAndValidity();
    }
  }
  dateChange() {
    if (this.petRegistrationForm.value.registrationDate != '') {
      var d = new Date(this.petRegistrationForm.value.registrationDate);
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var newYear = new Date(year + 1, month, day);
      var renewalDate =
        newYear.getDate().toString().padStart(2, '0') +
        '/' +
        ('0' + (newYear.getMonth() + 1)).slice(-2) +
        '/' +
        newYear.getFullYear();
      this.petRegistrationForm.patchValue({
        dateRenewal: newYear,
      });
    }
  }
  getError(formControlName: string, validatorName: string): string {
    return this.determineErroMessage(formControlName, validatorName);
  }

  private determineErroMessage(formControlName: string, validatorName: string): string {
    switch (formControlName) {
      case 'email':
        return 'You must enter a valid email';
      default:
        return 'You must enter a value';
    }
  }

  getRandomNumber() {
    let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    console.log('random number ' + random);
  }
}
