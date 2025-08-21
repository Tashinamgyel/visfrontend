import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  OwnershipTypes,
  Dzongkhags,
  Gewogs,
  Country,
  PetRegistration,
  Villages,
} from '@app/master-management/models/master';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { NotificationService } from '@app/@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.scss'],
})
export class RegisterOwnerComponent implements OnInit {
  [x: string]: any;
  showingImage: any;
  showingBarCode: any;

  public refreshData$ = new BehaviorSubject<boolean>(false);
  step = 0;
  public basicPanelOpenState: any;
  petInforForm: FormGroup;
  ownershipTypes: OwnershipTypes[];
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];

  countrys: Country[];
  petRegistration: PetRegistration;
  DontShowBarCodeImage: boolean = false;
  neuterStatusFlag: boolean;
  villages: Villages[];
  imageShow: boolean = false;
  nationality: boolean;
  vaccDetails: any;
  countryName: any;
  // @ViewChild('pdfViewer') pdfViewer: ElementRef;

  dontshowIT: boolean = false;

  dewormingDataForSending: any;
  vaccinationDataForSending: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private visMasterService: SharedService,
    private service: SharedService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.clinicalDetails = this.refreshData$.pipe(switchMapap((_) => this.visMasterService.populateClincalDetail()));
    this.initializeForm();
    this.populateForm();
  }
  initializeForm() {
    this.petInforForm = this.fb.group({
      petRegistrationNo: new FormControl(''),
      petRegistrationTypeId: new FormControl(''),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl(''),
      gewogId: new FormControl(''),
      locality: new FormControl(''),
      mobileNumber: new FormControl(''),
      emailId: new FormControl(''),
      petName: new FormControl(''),
      microchipNumber: new FormControl(''),
      registrationDate: new FormControl(''),
      speciesId: new FormControl(''),
      speciesName: new FormControl(''),
      colour: new FormControl(''),
      distinguishingMark: new FormControl(''),
      sex: new FormControl(''),
      dateRenewal: new FormControl(''),
      receiptNumber: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      petBreedId: new FormControl(''),
      treatmentDate: new FormControl(''),
      advice: new FormControl(''),
      vaccinationStatus: new FormControl(''),
      countryId: new FormControl(''),
      status: new FormControl(''),
      breederStatus: new FormControl(''),
      villageId: new FormControl(''),
      cid: new FormControl(''),
      nationality: new FormControl(''),
      breed: new FormControl(''),
      petRegistrationNoOrMicrochip: new FormControl(''),
      neuterStatus: new FormControl(''),
      passportNumber: new FormControl(''),
      countryName: new FormControl(''),
      abandonedDate: new FormControl(''),
    });
  }
  populateForm() {
    this.visMasterService.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });

    this.visMasterService.loadCountry().subscribe((response) => {
      this.countrys = response;
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
  petRegistrationId: number;
  petRegistrationNo: string;
  showCidForm: boolean;

  showDzongkhagAddress: boolean = true;
  dewormngDetailsForPrinting: any;

  viewDetails() {}
}
