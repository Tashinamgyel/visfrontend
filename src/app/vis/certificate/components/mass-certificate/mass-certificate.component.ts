import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
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
import { SharedService } from '@app/vis/shared/services/shared.service';
import { ReportRequest } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-mass-certificate',
  templateUrl: './mass-certificate.component.html',
  styleUrls: ['./mass-certificate.component.scss'],
})
export class MassCertificateComponent implements OnInit {
  massCertificate: FormGroup;
  massForm: FormGroup;
  massDtls: any;
  medDetails: NgStyle;
  vaccDetails: any;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  animalTypes: AnimalTypes[];
  ownershipTypes: OwnershipTypes[];
  species: Species[];
  breeds: Breeds[];
  massRegistrationDetails: any;
  villages: Villages[];
  countrys: Country[];
  viewDetails: boolean;
  mobileNumberForValidation: any;
  treatementDate: any;

  breedName: any;
  animalType: any;
  maxDate = new Date();
  nationality: any;
  country_name: any;
  cid_number: any;
  passport_number: any;
  owner_name: any;
  dzongkhag_name: any;
  gewog_name: any;
  village_name: any;
  locality: any;
  mass_registration_id: any;
  onlyVaccinated: any = [];

  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,

    private service: MasterService,
    private dialog: MatDialog,
    private notification: NotificationService,
    private notificationService: NotificationService
  ) {}
  petRegistrationNo: any;
  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.massForm = this.fb.group({
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
      telecomeService: new FormControl(''),
      massRegistrationNo: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      speciesId: new FormControl(''),
    });
  }
  populateForm() {
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
  }
  passportNumbers: any;
  cidNumber: any;
  ownerName: any;
  dzongkhagName: any;
  villageName: any;
  masses: any;
  dzongkhagNames: any;
  villlocality: any;
  countryNames: any;
  gewogNames: any;
  nationalityType: any;
  villagesName: any;
  animalAge: any;
  AnimalMale: any;
  AnimalFeMale: any;
  AnimalMixed: any;
  animalTotal: any;
  massDetails: any[] = [];
  speciesNames: any;
  massRegistration: any;
  treatmentId: number;
  massRegId: string;

  getMassRegistrationNumberCid() {
    const reportRequest = new ReportRequest();
    Object.assign(reportRequest, this.massForm.value);
    this.visMasterService.getMassCar(reportRequest).subscribe((response) => {
      this.masses = response;
      debugger;
      console.log(this.masses, 'vaccDetailsvaccDetailsvaccDetails');
      for (let i = 0; i < response.length; i++) {
        if (response[i].vaccination_state === 'Vaccinated') {
          this.onlyVaccinated.push(response[i]);
        } else {
          this.vaccDetails = response;
        }
      }

      for (let i = 0; i <= response.length; i++) {
        if (i === 0) {
          this.nationality = response[i].nationality;
          this.country_name = response[i].country_name;
          this.cid_number = response[i].cid_number;
          this.passport_number = response[i].passport_number;
          this.owner_name = response[i].owner_name;
          this.dzongkhag_name = response[i].dzongkhag_name;
          this.gewog_name = response[i].gewog_name;
          this.village_name = response[i].village_name;
          this.locality = response[i].locality;
          this.mass_registration_id = response[i].mass_registration_id;
        } else {
        }
      }
      if (this.masses.length != 0) {
        let last: any = this.masses[this.masses.length - 1];
        this.treatmentId = last.treatement_id;
        this.massRegId = last.mass_registration_id;
      }
      this.getMassVaccCar(this.treatmentId, this.massRegId);
    });
  }

  getMassVaccCar(treatmentId: number, massRegId: string) {
    this.visMasterService.getMassVaccDetails(treatmentId, massRegId).subscribe((res) => {
      console.log('sadsad', res.length);

      console.log(this.vaccDetails, 'zzzzzzzzzzzzzzzzzzzzzzz');
    });
  }
}
