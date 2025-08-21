import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@core';
import { Dzongkhags, Gewogs, OwnershipTypes, PetBreeds, Species, Villages } from '@app/master-management/models/master';

import { Country, PetRegistration, PetRenwal } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '@app/auth';
import { MasterService } from '@app/master-management/services/master.service';
import { isNull } from 'lodash';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pet-renewal',
  templateUrl: './pet-renewal.component.html',
  styleUrls: ['./pet-renewal.component.scss'],
})
export class PetRenewalComponent implements OnInit {
  showingImage: any;
  showingBarCode: any;
  petRenewalForm: FormGroup;
  petRenewalsForm:FormGroup
  ownershipTypes: OwnershipTypes[];
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  species: Species[];
  petBreeds: PetBreeds[];
  countrys: Country[];
  petRegistration: PetRegistration;
  notificationService: any;
  petRegistrationId: number;
  petRegistrationNo: string;
  petRegistrationNumber: string;
  villages: Villages[];
  renewalDate: string;
  imageShow: boolean = false;
  nationality: boolean;
  neuterStatusFlag: boolean;
  statusFlag: boolean = false;
  imageDontShow: boolean = false;
  @Input() registrationDetails: any;

  editableShow: boolean;
  notEditableShow: boolean;
  documentId: number;
  hasPetPhoto: any;
  hasPetPhotoFlag: boolean = false;
  userDetails: any;
  minDate = new Date();
  maxDate = new Date();
  @Input() editable = false;

  formattedDate: any;
  reRegistrationDate:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private visMasterservice: SharedService,
    private service: MasterService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private credentialsService: CredentialsService,
    private datePipe: DatePipe
    
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
    this.populateforRenewForm();
  }
  initializeForm() {
    this.petRenewalForm = this.fb.group({
      petRegistrationNo: new FormControl(''),
      petRegistrationNoOrMicrochip: new FormControl(''),
      petRegistrationTypeId: new FormControl(''),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl(''),
      gewogId: new FormControl(''),
      villageId: new FormControl(''),
      locality: new FormControl(''),
      countryId: new FormControl(''),
      mobileNumber: new FormControl(''),
      emailId: new FormControl(''),
      petName: new FormControl(''),
      microchipNumber: new FormControl(''),
      registrationDate: new FormControl(''),
      speciesName: new FormControl(''),
      colour: new FormControl(''),
      distinguishingMark: new FormControl(''),
      sex: new FormControl(''),
      dateRenewal: new FormControl(''),
      receiptNumber: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      breed: new FormControl(''),
      nationality: new FormControl(''),
      villageName: new FormControl(''),
      cid: new FormControl(),
      showingImage: new FormControl(''),
      status: new FormControl('alive'),
      breederStatus: new FormControl(''),
      neuterStatus: new FormControl(),
      // renewalDueDate: new FormControl(),
      passportNumber: new FormControl(),
      abandonedDate:new FormControl(),
      registerDate:new FormControl(),
    });
  }
  populateforRenewForm()
  {
    this.petRenewalsForm = this.fb.group({
      petRegistrationNo: new FormControl(''),
      petRegistrationNoOrMicrochip: new FormControl(''),
      petRegistrationTypeId: new FormControl(''),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl(''),
      gewogId: new FormControl(''),
      villageId: new FormControl(''),
      locality: new FormControl(''),
      countryId: new FormControl(''),
      mobileNumber: new FormControl(''),
      emailId: new FormControl(''),
      petName: new FormControl(''),
      microchipNumber: new FormControl(''),
      registrationDate: new FormControl(''),
      speciesName: new FormControl(''),
      colour: new FormControl(''),
      distinguishingMark: new FormControl(''),
      sex: new FormControl(''),
      dateRenewal: new FormControl(''),
      receiptNumber: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      breed: new FormControl(''),
      nationality: new FormControl(''),
      villageName: new FormControl(''),
      cid: new FormControl(),
      showingImage: new FormControl(''),
      status: new FormControl('alive'),
      breederStatus: new FormControl(''),
      neuterStatus: new FormControl(),
      // renewalDueDate: new FormControl(),
      passportNumber: new FormControl(),
      abandonedDate:new FormControl(),
      registerDate:new FormControl(),
    });
  }




  validateAbundata(){
      this.formattedDate = new Date();
      this.reRegistrationDate = new Date()
      if(this.petRenewalForm.value.status =='abandoned')
      {
      this.readOnlyAbondate = true
      this.statusShow =false
      this.readOnlyRegister = false
    
      } else if(this.petRenewalForm.value.status =='Reregister'){
        this.readOnlyRegister = true
        this.statusShow =false

      }
      else{
        this.readOnlyAbondate = false
        this.statusShow =true
        this.readOnlyRegister = false
      }

  }  

  // pipe = new DatePipe('en-US');
  // changeFormat(today){
  //   let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
  //   this.abundateDate = ChangedFormat;
  //   console.log(this.abundateDate);
  // }

  // status(status: string) {
  //   if (status === null || status === '') {
  //     this.petRenewalForm.patchValue({
  //       status: 'alive',
  //     });
  //   }
  // }
  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
      // console.log(this.userDetails,"this.userDetails");
    });

    this.visMasterservice.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterservice.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterservice.loadSpecies().subscribe((response) => {
      this.species = response;
    });

    this.visMasterservice.loadCountry().subscribe((response) => {
      this.countrys = response;
    });
  }
  getGewogs(dzongkhagId: number) {
    this.visMasterservice.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  getVillage(gewogId: number) {
    this.visMasterservice.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }

  getPetBreeds(speciesId: number) {
    this.visMasterservice.getPetBreeds(speciesId).subscribe((response) => {
      this.petBreeds = response;
    });
  }
  dontshowIT: boolean = false;
  showCidForm: boolean;
  readOnlyAbondate:boolean=false
  readOnlyRegister:boolean = false
  statusShow: boolean = true
  isDisabled:boolean= true


  getPetRegistrationNumber() {
    this.petRegistrationNo = this.petRenewalForm.get('petRegistrationNoOrMicrochip').value;
    this.visMasterservice.getPetRegistrationNumber(this.petRegistrationNo).subscribe((response) => {
      // this.petRegistrationId = response.id;
      this.petRegistration = response;
      console.log(response,"eeeeeee");
      
      if (this.petRegistration.neuterStatus === 'Yes') {
        this.editableShow = false;
        this.notEditableShow = true;
        this.neuterStatusFlag = true;
      } else {
        this.editableShow = true;
        this.notEditableShow = false;
      }
      debugger
      if (this.petRegistration.status ==='abandoned') {
        this.readOnlyRegister = true;
        this.statusShow =false
      
      
      } else {
        this.readOnlyRegister = false;
        this.statusShow =true
      }

      

      if (this.petRegistration.neuterStatus === 'No') {
        this.neuterStatusFlag = false;
      }
      if (this.petRegistration.neuterStatus === 'No') {
        this.neuterStatusFlag = true;
      } else {
        this.neuterStatusFlag = false;
      }

      var actualnationality;
      if (this.petRegistration.nationality == 1) {
        actualnationality = 'Bhutanese';
        this.nationality = true;
        this.showCidForm = true;
      } else {
        actualnationality = 'Non-Bhutanese';
        this.nationality = false;
        this.showCidForm = false;
      }
      var actualsex;
      if (this.petRegistration.sex === 'M') {
        actualsex = 'Male';
      } else {
        actualsex = 'Female';
      }

      if (this.petRegistration.neuterStatus === 'No') {
        this.neuterStatusFlag = true;
      } else {
        this.neuterStatusFlag = false;
      }

      if (this.petRegistration.microchipNumber !== '') {
        this.dontshowIT = true;
      } else {
        this.dontshowIT = false;
      }
      this.petRenewalForm.patchValue({
        ownerName: this.petRegistration.ownerName,
        petRegistrationTypeId: this.petRegistration.ownerType,
        //ownerType: this.petRegistration.ownerType,
        registrationDate: this.petRegistration.registrationDate,
        dzongkhagName: this.petRegistration.dzongkhagName,
        dzongkhagId: this.petRegistration.dzongkhagId,
        gewogName: this.petRegistration.gewogName,
        emailId: this.petRegistration.emailId,
        microchipNumber: this.petRegistration.microchipNumber,
        speciesName: this.petRegistration.speciesName,
        petName: this.petRegistration.petName,
        breed: this.petRegistration.breed,
        colour: this.petRegistration.colour,
        distinguishingMark: this.petRegistration.distinguishingMark,
        year: this.petRegistration.year,
        day: this.petRegistration.day,
        month: this.petRegistration.month,
        nationality: actualnationality,
        sex: actualsex,
        receiptNumber: this.petRegistration.receiptNumber,
        locality: this.petRegistration.locality,
        mobileNumber: this.petRegistration.mobileNumber,
        villageName: this.petRegistration.villageName,
        cid: this.petRegistration.cid,
        passportNumber: this.petRegistration.passportNumber,
        petRegistrationNo: this.petRegistration.petRegistrationNumber,
        petRegistrationId: this.petRegistration.id,
        countryId: this.petRegistration.countryId,
        neuterStatus: this.petRegistration.neuterStatus,
        breederStatus: this.petRegistration.breederStatus,
        gewogId: this.petRegistration.gewogId,
        // villageId: this.petRegistration.villageId,
        villageId: this.petRegistration.villageId,
        dateRenewal: this.petRegistration.dateRenewal,
        status: this.petRegistration.status,
        abandonedDate: this.petRegistration.abandonedate,
        reRegistrationDate : this.petRegistration.registerDate
      });
      this.getDoc(this.petRegistration.petRegistrationNumber);
      this.getGewogs(this.petRegistration.dzongkhagId);
      this.getVillage(this.petRegistration.gewogId);
      this.getStatus(this.petRegistration.status);
      // this.petRenewalForm.get('dateRenewal').patchValue(this.dateFormate(this.petRegistration.dateRenewal));
    });
  }

  status: boolean = true;
  getStatus(status: string) {
    //console.log(status, 'statusstatus');

    if (status === 'dead') {
      this.status = false;
    } else {
      this.status = true;
    }
  }
  abandonedDate = new Date();

  
  dateFormate(renewalDate: any) {
    const d = new Date(renewalDate);
    let month = d.getMonth();
    let day = d.getDate();
    const year = d.getFullYear();
    return new Date(year + 1, month, day);
  }

  fileToUpload: File = null;
  fileId: number;
  selectFile(files: FileList, docName: string) {
    // console.log(this.documentId, 'this.documentId');

    if (this.documentId === undefined) {
      this.documentId = 0;
    }
    this.fileToUpload = files.item(0);
    this.visMasterservice
      .updateUploadAttachment(this.fileToUpload, this.petRegistration.petRegistrationNumber, docName, this.documentId)
      .subscribe(
        (response) => {
          this.fileId = response['id'];
        },
        () => {
          this.notification.openErrorSnackBar('File could not be saved, please try again');
        }
      );
  }

  updatePetRegistration() {
    const petregistration = new PetRenwal();
    petregistration.petRegistrationNumber = this.petRegistration.petRegistrationNumber;
    petregistration.petRegistrationId = this.petRegistration.id;
    Object.assign(petregistration, this.petRenewalForm.value);
    Object.assign(petregistration, this.petRenewalsForm.value);

    petregistration.petBreedId = this.petRegistration.petBreedId;
    petregistration.speciesId = this.petRegistration.speciesId;
    petregistration.petRegistrationTypeId = this.petRegistration.petRegistrationTypeId;
    petregistration.nationality = this.petRegistration.nationality;
    petregistration.colour = this.petRenewalForm.value.colour;
    petregistration.userName = this.userDetails.userName;
    petregistration.centreId = this.userDetails.centre.id;
    petregistration.levelUserId = this.userDetails.levelUser.id;
    petregistration.jurisdiction = this.userDetails.jurisdiction;
    petregistration.fullName = this.userDetails.fullName;    
    petregistration.abandonedDate = this.formattedDate;

    console.log('asd', petregistration);
    

    if (this.petRegistration.sex == 'Male') {
      petregistration.sex = 'M';
    } else {
      petregistration.sex = 'F';
    }
    if (this.petRenewalForm.value.status == null) {
      this.statusFlag = true;
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    }
    if (this.petRenewalForm.value.mobileNumber.length < 8) {
      this.notification.openErrorSnackBar('Enter Valid Mobile Number');
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          title: 'Confirmation',
          message: 'Do you want to update pet information?',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.visMasterservice.updatePetRegistration(petregistration).subscribe(
            () => {
              this.notification.openSuccessSnackBar('Updated Successfully ');
              this.router.navigate(['/', 'dashboard']);
            },
            () => {
              this.notification.openErrorSnackBar('Couldnot be Updated');
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

  getDoc(petRegistrationNo: string) {
    var docName = 'Photo';
    this.visMasterservice.getDoc(petRegistrationNo, docName).subscribe((res) => {
      this.showingImage = res.imageByte;
      console.log(res, 'res');
      this.documentId = res.id;
      if ((docName = 'BarCode' && (docName = 'Photo'))) {
        this.imageShow = true;
      }

      if (this.showingImage) {
        this.imageShow = true;
      }
    });
    this.getBarCode(petRegistrationNo);
  }
  dontshow: boolean = false;
  barcodeshow: boolean = false;
  getBarCode(petRegistrationNo: string) {
    var docName = 'BarCode';
    this.visMasterservice.getDoc(petRegistrationNo, docName).subscribe((res) => {
      this.showingBarCode = res.imageByte;

      if (this.showingBarCode === null || this.showingBarCode === '') {
        this.barcodeshow = false;
      }

      console.log(res, 'res');
      if (this.showingBarCode) {
        this.barcodeshow = true;
      }
    });
  }

  printPage() {
    window.print();
  }
  validateYear(type: any) {
    if (type == 'year') {
      if (this.petRenewalForm.value.year > 100 || this.petRenewalForm.value.year == 0) {
        this.petRenewalForm.get('year').reset();
      }
    }

    if (type == 'month') {
      if (this.petRenewalForm.value.month > 11 || this.petRenewalForm.value.month == 0) {
        this.petRenewalForm.get('month').reset();
      }
    }

    if (type == 'day') {
      if (this.petRenewalForm.value.day > 29 || this.petRenewalForm.value.day == 0) {
        this.petRenewalForm.get('day').reset();
      }
    }
  }
  validateNeatus() {
    if (this.petRenewalForm.value.neuterStatus === 'Yes') {
      this.neuterStatusFlag = false;
    }
  }


  getCitizen(cid: number) {
    this.service.getCitizen(cid).subscribe(
      (response) => {
        this.petRenewalForm.patchValue({
          ownerName: response.fullName,
        });
      },
      () => {
        this.notification.openErrorSnackBar('');
      }
    );
  }
}
