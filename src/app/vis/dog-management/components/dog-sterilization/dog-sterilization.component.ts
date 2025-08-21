import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NotificationService } from '@core';
import {
  AgeGroup,
  AnimalTypes,
  CatchingMethod,
  Dzongkhags,
  Gewogs,
  PetBreeds,
  SkinCondition,
  Villages,
  Program,
} from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { DogSterilization, PetRegistration } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { CredentialsService } from '@app/auth';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-dog-sterilization',
  templateUrl: './dog-sterilization.component.html',
  styleUrls: ['./dog-sterilization.component.scss'],
})
export class DogSterilizationComponent implements OnInit {
  [x: string]: any;
  public show = false;
  public buttonName: any = 'Show';
  massDogSterilizationForm: FormGroup;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  petBreeds: PetBreeds[];
  animalTypes: AnimalTypes[];
  ageGroup: AgeGroup[];
  villages: Villages[];
  catchMethods: CatchingMethod[];
  dogSterilizationId: any;
  petRegistration: PetRegistration;
  petRegistrationNo: any;
  skinconditions: SkinCondition[];
  microchipNo: any;
  programs: Program[];
  id: any;
  showOwnerStstus: boolean;
  maxDate = new Date();
  formValidation: boolean = false;
  userDetails: any;
  base64Image: any;
  picture: any;

  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private router: Router,
    private dialog: MatDialog,
    private notification: NotificationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.massDogSterilizationForm = this.fb.group({
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      tagNo: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      petBreedId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      ageGroupMassId: new FormControl(),
      village: new FormControl('', Validators.required),
      fate: new FormControl('', Validators.required),
      otherConditions: new FormControl(''),
      bodyColour: new FormControl('', Validators.required),
      healthCondition: new FormControl('', Validators.required),
      clinicalLocation: new FormControl('', Validators.required),
      vaccinationStatus: new FormControl('', Validators.required),
      surgeonName: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      sterilizationDate: new FormControl('', Validators.required),
      petRegistrationNo: new FormControl('', Validators.required),
      mobileNumber: new FormControl(''),
      petRegistrationNumber: new FormControl(''),
      villageId: new FormControl(''),
      petName: new FormControl('', Validators.required),
      ownerName: new FormControl(''),
      postOperative: new FormControl(''),
      transmissibleTumour: new FormControl('', Validators.required),
      catchMethodId: new FormControl('', Validators.required),
      skinConditionId: new FormControl('', Validators.required),
      locality: new FormControl(''),
      pregnancyStatus: new FormControl('', Validators.required),
      pregnancyStage: new FormControl('', Validators.required),
      foetuses: new FormControl('', Validators.required),
      ownershipStatus: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      //microchipNo: new FormControl('', Validators.required),
      month: new FormControl(''),
      year: new FormControl(''),
      programId: new FormControl('', Validators.required),
      cid: new FormControl(''),
      microchipNumber: new FormControl(''),
      breed: new FormControl('', Validators.required),
      day: new FormControl(''),
      petRegistrationNoOrMicro: new FormControl('', Validators.required),
      // staryDog: new FormControl(''),
    });
  }

  myimage: Observable<any>;

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    debugger;
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    this.myimage.subscribe((d) => {
      var base64Img = d;
      if (file.type === 'image/jpeg') {
        base64Img = base64Img.replace('data:image/jpeg;base64,', '');
      } else {
        base64Img = base64Img.replace('data:image/png;base64,', '');
      }

      this.picture = base64Img;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  populateForm() {
    var forPopulatingProgram = JSON.parse(localStorage.getItem('forPopulatingProgram'));

    if (forPopulatingProgram.program != null) {
      this.programs = [forPopulatingProgram.program];
    } else {
      this.programs = [];
    }

    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
    });

    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterService.loadPetBreeds().subscribe((response) => {
      this.petBreeds = response;
    });
    this.service.loadAnimalTypesDog().subscribe((response) => {
      this.animalTypes = response;
    });
    this.service.loadAgeGroup().subscribe((response) => {
      this.ageGroup = response;
    });
    this.service.loadCatchingMethod().subscribe((response) => {
      this.catchMethods = response;
    });
    this.service.loadSkinCondition().subscribe((response) => {
      this.skinconditions = response;
    });
  }
  getGewogs(dzongkhagId: number) {
    this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }

  getVillage(gewogId: number) {
    this.visMasterService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }

  getPetRegistrationNumberMassSterilisation() {
    this.petRegistrationNo = this.massDogSterilizationForm.get('petRegistrationNoOrMicro').value;
    this.visMasterService.getPetRegistrationNumberMassSterilisation(this.petRegistrationNo).subscribe((response) => {
      this.petRegistration = response;
      this.massDogSterilizationForm.patchValue({
        ownerName: this.petRegistration.ownerName,
        petRegistrationTypeId: this.petRegistration.ownerType,
        registrationDate: this.petRegistration.registrationDate,
        dzongkhagName: this.petRegistration.dzongkhagName,
        dzongkhagId: this.petRegistration.dzongkhagId,
        gewogName: this.petRegistration.gewogName,
        sex: this.petRegistration.sex,
        emailId: this.petRegistration.emailId,
        microchipNumber: this.petRegistration.microchipNumber,
        speciesName: this.petRegistration.speciesName,
        petName: this.petRegistration.petName,
        petBreedId: this.petRegistration.petBreedId,
        bodyColour: this.petRegistration.bodyColour,
        distinguishingMark: this.petRegistration.distinguishingMark,
        year: this.petRegistration.year,
        day: this.petRegistration.day,
        month: this.petRegistration.month,
        receiptNumber: this.petRegistration.receiptNumber,
        locality: this.petRegistration.locality,
        mobileNumber: this.petRegistration.mobileNumber,
        villageName: this.petRegistration.villageName,
        cid: this.petRegistration.cid,
        passportNumber: this.petRegistration.passportNumber,
        petRegistrationNo: this.petRegistration.petRegistrationNumber,
        petRegistrationId: this.petRegistration.id,
        gewogId: this.petRegistration.gewogId,
        villageId: this.petRegistration.villageId,
        petRegistrationNumber: this.petRegistration.petRegistrationNumber,
        clinicalLocation: this.petRegistration.clinicalLocation,
        healthCondition: this.petRegistration.healthCondition,
        otherConditions: this.petRegistration.otherConditions,
        weight: this.petRegistration.weight,
        skinConditionId: this.petRegistration.skinConditionId,
        transmissibleTumour: this.petRegistration.transmissibleTumour,
        vaccinationStatus: this.petRegistration.vaccinationStatus,
        pregnancyStatus: this.petRegistration.pregnancyStatus,
        pregnancyStage: this.petRegistration.pregnancyStage,
        foetuses: this.petRegistration.foetuses,
        postOperative: this.petRegistration.postOperative,
        fate: this.petRegistration.fate,
        surgeonName: this.petRegistration.surgeonName,
      });
      this.getGewogs(this.petRegistration.dzongkhagId);
      this.getVillage(this.petRegistration.gewogId);
    });
  }
  imageStray: any;
  showImage: boolean = false;
  skinConditionId: any;
  petBreedId: any;
  getTagDetails() {
    this.petRegistrationNo = this.massDogSterilizationForm.get('tagNo').value;
    this.visMasterService.getTagDetails(this.petRegistrationNo).subscribe((response) => {
      this.petRegistration = response;
      if (this.petRegistration.image !== null) {
        this.imageStray = this.petRegistration.image;
        this.showImage = true;
      }
      if (this.petRegistration.skinCondition !== null) {
        this.massDogSterilizationForm.get('skinConditionId').setValue(this.petRegistration.skinCondition.id);
      }
      if (this.petRegistration.petBreed !== null) {
        this.massDogSterilizationForm.get('petBreedId').setValue(this.petRegistration.petBreed.id);
      }
      if (this.petRegistration !== null) {
        this.getGewogs(this.petRegistration.dzongkhag.id);
        this.getVillage(this.petRegistration.gewog.id);
        this.massDogSterilizationForm.patchValue({
          catchMethodId: this.petRegistration.catchMethod.id,
          latitude: this.petRegistration.latitude,
          longitude: this.petRegistration.longitude,
          sex: this.petRegistration.sex,
          dzongkhagName: this.petRegistration.dzongkhagName,
          dzongkhagId: this.petRegistration.dzongkhag.id,
          locality: this.petRegistration.locality,
          bodyColour: this.petRegistration.bodyColour,
          clinicalLocation: this.petRegistration.clinicalLocation,
          weight: this.petRegistration.weight,
          transmissibleTumour: this.petRegistration.transmissibleTumour,
          healthCondition: this.petRegistration.healthCondition,
          otherConditions: this.petRegistration.otherConditions,
          vaccinationStatus: this.petRegistration.vaccinationStatus,
          pregnancyStatus: this.petRegistration.pregnancyStatus,
          pregnancyStage: this.petRegistration.pregnancyStage,
          foetuses: this.petRegistration.foetuses,
          postOperative: this.petRegistration.postOperative,
          fate: this.petRegistration.fate,
          surgeonName: this.petRegistration.surgeonName,
          year: this.petRegistration.year,
          day: this.petRegistration.day,
          month: this.petRegistration.month,
          gewogId: this.petRegistration.gewog.id,
          villageId: this.petRegistration.village.id,
        });
      }
    });
  }

  saveDogSterilization() {
    const dogSterilization = new DogSterilization();
    if (this.massDogSterilizationForm.value.programId === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.sterilizationDate === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.animalTypeId === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.ownershipStatus === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.fate === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.surgeonName === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.healthCondition === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.skinConditionId === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.transmissibleTumour === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.vaccinationStatus === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogSterilizationForm.value.gewogId === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    }
    if (this.massDogSterilizationForm.value.ownershipStatus === 'Owned') {
      if (this.massDogSterilizationForm.value.petRegistrationNoOrMicro === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      }
    }
    if (this.massDogSterilizationForm.value.ownershipStatus === 'Unowned') {
      if (this.massDogSterilizationForm.value.catchMethodId === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.tagNo === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.latitude === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.longitude === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.dzongkhagId === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.gewogId === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.petBreedId === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.sex === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.bodyColour === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.clinicalLocation === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogSterilizationForm.value.weight === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      }
    }
    this.formValidation = true;
    Object.assign(dogSterilization, this.massDogSterilizationForm.value);
    dogSterilization.device = 'SYSTEM';
    dogSterilization.type = 'DPM';
    dogSterilization.userName = this.userDetails.userName;
    dogSterilization.centreId = this.userDetails.centre.id;
    dogSterilization.levelUserId = this.userDetails.levelUser.id;
    dogSterilization.jurisdiction = this.userDetails.jurisdiction;
    dogSterilization.fullName = this.userDetails.fullName;

    if (this.petRegistration !== null) {
      dogSterilization.id = this.petRegistration.id;
    }
    if (this.picture !== null && this.picture !== undefined) {
      dogSterilization.image = this.picture;
    } else {
      if (this.imageStray !== null) {
        dogSterilization.image = this.imageStray;
      }
    }

    if (this.picture !== null && this.picture !== undefined) {
      dogSterilization.image = this.picture;
    } else {
      if (this.imageStray !== null) {
        dogSterilization.image = this.imageStray;
      }
    }

    if (this.massDogSterilizationForm.value.villageId === '') {
      dogSterilization.villageId = 0;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Do you want to submit?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.formValidation) {
          this.visMasterService.saveDogSterilization(dogSterilization).subscribe(
            () => {
              this.notification.openSuccessSnackBar('Submitted Successfully ');
              this.resetButton();
            },
            () => {
              this.notification.openErrorSnackBar('Could not be submitted, please try again');
              this.resetButton();
            }
          );
        }
      } else {
        dialogRef.close();
      }
    });
  }

  resetButton() {
    location.reload();
    this.massDogSterilizationForm.markAsPristine();
    Object.keys(this.massDogSterilizationForm.value).forEach((key) => {
      this.massDogSterilizationForm.get(key).setErrors(null);
    });

    this.massDogSterilizationForm.value.programId === '';
    this.massDogSterilizationForm.value.sterilizationDate === '';
    this.massDogSterilizationForm.value.animalTypeId === '';
    this.massDogSterilizationForm.value.ownershipStatus === '';
    this.massDogSterilizationForm.value.petRegistrationNoOrMicro === '';
    this.massDogSterilizationForm.value.healthCondition === '';
    this.massDogSterilizationForm.value.catchMethodId === '';
    this.massDogSterilizationForm.value.tagNo === '';
    this.massDogSterilizationForm.value.latitude === '';
    this.massDogSterilizationForm.value.longitude === '';
    this.massDogSterilizationForm.value.dzongkhagId === '';
    this.massDogSterilizationForm.value.gewogId === '';
    this.massDogSterilizationForm.value.year === '';
    this.massDogSterilizationForm.value.month === '';
    this.massDogSterilizationForm.value.day === '';
    this.massDogSterilizationForm.value.petBreedId === '';
    this.massDogSterilizationForm.value.sex === '';
    this.massDogSterilizationForm.value.bodyColour === '';
    this.massDogSterilizationForm.value.clinicalLocation === '';
    this.massDogSterilizationForm.value.weight;
    this.massDogSterilizationForm.value.healthCondition === '';
    this.massDogSterilizationForm.value.skinConditionId === '';
    this.massDogSterilizationForm.value.transmissibleTumour === '';
    this.massDogSterilizationForm.value.vaccinationStatus === '';
    this.massDogSterilizationForm.value.fate === '';
    this.massDogSterilizationForm.value.surgeonName === '';
  }

  validateYear(type: any) {
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
}
