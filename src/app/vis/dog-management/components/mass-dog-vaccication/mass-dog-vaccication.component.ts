import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@core';
import {
  AgeGroup,
  AnimalTypes,
  CatchingMethod,
  Dzongkhags,
  Gewogs,
  PetBreeds,
  Program,
  Villages,
} from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { MassDogVaccination } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-mass-dog-vaccication',
  templateUrl: './mass-dog-vaccication.component.html',
  styleUrls: ['./mass-dog-vaccication.component.scss'],
})
export class MassDogVaccicationComponent implements OnInit {
  massDogForm: FormGroup;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  petBreeds: PetBreeds[];
  animalTypes: AnimalTypes[];
  ageGroup: AgeGroup[];
  villages: Villages[];
  catchMethods: CatchingMethod[];
  villId: any;
  gewog: any;
  dzoId: any;
  neuterStatusFlag: boolean;
  fileToUpload: File = null;
  fileId: number;
  maxDate = new Date();
  editableShow: boolean;
  notEditableShow: boolean;
  petRegistrationNo: any;
  id: any;
  programs: Program[];
  microchipNo: string;
  petRegistration: any;

  userDetails: any;
  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private notification: NotificationService,
    private router: Router,
    private dialog: MatDialog,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.massDogForm = this.fb.group({
      ownerName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      mobileNumber: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8), Validators.minLength(8)])
      ),
      petName: new FormControl(''),
      petRegistrationNo: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      petBreedId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      neuterStatus: new FormControl('', Validators.required),
      vaccinationDate: new FormControl('', Validators.required),
      vaccineType: new FormControl(''),
      ownershipStatus: new FormControl('', Validators.required),
      petRegistrationNumber: new FormControl(''),
      catchMethodId: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      locality: new FormControl(),
      villageId: new FormControl(),
      microchipNo: new FormControl(),
      programId: new FormControl('', Validators.required),
      day: new FormControl(),
      month: new FormControl(),
      cid: new FormControl(),
      breed: new FormControl(),
      microchipNumber: new FormControl(),
      breederStatus: new FormControl(),
      year: new FormControl(),
      bodyColour: new FormControl('', Validators.required),
      tagNo: new FormControl(),
      petRegistrationNoOrMicrochip: new FormControl(),
    });
  }

  populateForm() {
    var forPopulatingProgram = JSON.parse(localStorage.getItem('forPopulatingProgram'));

    if (forPopulatingProgram.program != null) {
      this.programs = [forPopulatingProgram.program];
      // console.log('programsasdasdsad', this.programs);
    } else {
      this.programs = [];
    }

    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
      console.log(this.userDetails, 'this.userDetails');
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

  getPetBreeds(speciesId: number) {
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

  getPetRegistrationNumberMass() {
    this.petRegistrationNo = this.massDogForm.get('petRegistrationNoOrMicrochip').value;
    this.visMasterService.getPetRegistrationNumberMass(this.petRegistrationNo).subscribe((response) => {
      this.petRegistration = response;
      if (this.petRegistration.neuterStatus === 'Yes') {
        this.editableShow = false;
        this.notEditableShow = true;
        this.neuterStatusFlag = true;
      } else {
        this.editableShow = true;
        this.notEditableShow = false;
      }
      if (this.petRegistration.neuterStatus === 'No') {
        this.neuterStatusFlag = false;
      }
      if (this.petRegistration.neuterStatus === 'No') {
        this.neuterStatusFlag = true;
      } else {
        this.neuterStatusFlag = false;
      }

      this.massDogForm.patchValue({
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
        colour: this.petRegistration.colour,
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
        petRegistrationNumber: this.petRegistration.petRegistrationNumber,
        petRegistrationId: this.petRegistration.id,
        gewogId: this.petRegistration.gewogId,
        villageId: this.petRegistration.villageId,
        neuterStatus: this.petRegistration.neuterStatus,
      });
      this.getGewogs(this.petRegistration.dzongkhagId);
      this.getVillage(this.petRegistration.gewogId);
    });
  }

  saveMassDog() {
    if (this.massDogForm.value.programId === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogForm.value.vaccinationDate === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogForm.value.ownershipStatus === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogForm.value.dzongkhagId === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.massDogForm.value.gewogId === '') {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    }
    if (this.massDogForm.value.ownershipStatus === 'Owned') {
      if (this.massDogForm.value.petRegistrationNoOrMicrochip === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.cid === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.ownerName === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.mobileNumber === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.mobileNumber === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.mobileNumber === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      }
    }
    if (this.massDogForm.value.ownershipStatus === 'Unowned') {
      if (this.massDogForm.value.catchMethodId === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.latitude === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.sex === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.petBreedId === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      } else if (this.massDogForm.value.bodyColour === '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      }
    }
    const massDogVaccination = new MassDogVaccination();
    massDogVaccination.device = 'SYSTEM';
    massDogVaccination.userName = this.userDetails.userName;
    massDogVaccination.centreId = this.userDetails.centre.id;
    massDogVaccination.levelUserId = this.userDetails.levelUser.id;
    massDogVaccination.jurisdiction = this.userDetails.jurisdiction;
    massDogVaccination.fullName = this.userDetails.fullName;
    Object.assign(massDogVaccination, this.massDogForm.value);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Do you want to submit?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.visMasterService.saveMassDog(massDogVaccination).subscribe(
          () => {
            this.notification.openSuccessSnackBar('Submitted Successfully');
            this.resetButton();
          },
          () => {
            this.notification.openErrorSnackBar('Could not be submitted, please try again');
          }
        );
      } else {
        dialogRef.close();
      }
    });
  }
  validateNeatus() {
    if (this.massDogForm.value.neuterStatus === 'Yes') {
      this.neuterStatusFlag = false;
    }
  }
  resetButton() {
    console.log('reset');
    setTimeout(() => {
      location.reload();
    }, 1200);
  }
  validateYear(type: any) {
    if (type == 'month') {
      if (this.massDogForm.value.month > 11 || this.massDogForm.value.month == 0) {
        this.massDogForm.get('month').reset();
      }
    }

    if (type == 'day') {
      if (this.massDogForm.value.day > 29 || this.massDogForm.value.day == 0) {
        this.massDogForm.get('day').reset();
      }
    }
  }
}
