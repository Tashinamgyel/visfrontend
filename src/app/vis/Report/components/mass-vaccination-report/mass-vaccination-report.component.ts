import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportRequest } from '@app/vis/shared/model/model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  OwnershipTypes,
  Species,
  Dzongkhags,
  Gewogs,
  AnimalTypes,
  Breeds,
  Country,
  Medicines,
  Class,
  VaccineType,
} from '@app/master-management/models/master';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';
import { NotificationService } from '@app/@core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mass-vaccination-report',
  templateUrl: './mass-vaccination-report.component.html',
  styleUrls: ['./mass-vaccination-report.component.scss'],
})
export class MassVaccinationReportComponent implements OnInit {
  massVaccinationReport: FormGroup;
  report: any;
  fromDate: string;
  toDate: string;
  ownershipTypes: OwnershipTypes[];
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  classes: Class[];
  medicines: Medicines[];
  showReport: boolean = false;
  response: Response[];
  loading = true;
  countrys: Country[];
  maxDate = new Date();
  vaccineType: VaccineType[];
  userDetails: any;
  displayedColumns: string[] = [
    'slno',
    'mass_registration_id',
    'nationality',
    'cid',
    'passport_number',
    'country_name',
    'owner_name',
    'dzongkhagName',
    'gewogName',
    'villageName',
    'locality',
    'mobile_number',
    'email_id',
    'owner_type',
    'treatment_date',
    'species_name',
    'animal_type',
    'breed',
    'age',
    'male',
    'female',
    'mixed',
    'total',
    'vaccination_state',
    'vaccine_name',
    'not_vaccinated',
    'reasons',
    'centre',
    'jurisdiction',
    'user_name'
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private credentialsService: CredentialsService,
    private router: Router,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}
  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
    });
    this.service.loadVaccineType().subscribe((res) => (this.vaccineType = res));

    this.visMasterService.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });

    this.visMasterService.loadCountry().subscribe((response) => {
      this.countrys = response;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getGewogs(dzongkhagId: number) {
    this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  getAnimalTypes(speciesId: number) {
    this.visMasterService.getAnimalTypes(speciesId).subscribe((response) => {
      this.animalTypes = response;
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initializeForm() {
    this.massVaccinationReport = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      nationality: new FormControl('All'),
      ownerTypeId: new FormControl('All'),
      dzongkhagId: new FormControl('All'),
      gewogId: new FormControl('All'),
      speciesId: new FormControl('All'),
      animalTypeId: new FormControl('All'),
      breedId: new FormControl('All'),
      status: new FormControl('All'),
      vaccineTypeId: new FormControl('All'),
    });
  }
  showDetails: boolean;
  getReport() {
    this.showReport = true;
    const reportRequest = new ReportRequest();
    reportRequest.treatment = 'Vaccination';
    reportRequest.centre = this.userDetails.centre.centre;
    reportRequest.levelUser = this.userDetails.levelUser.levelName;
    reportRequest.centreId = this.userDetails.centre.id;
    reportRequest.levelUserId = this.userDetails.levelUser.id;
   reportRequest.jurisdiction = this.userDetails.jurisdiction;
  //  if(this.userDetails.jurisdiction==='TVH&SL Phuentshogling'){
  //   reportRequest.jurisdiction = 'RLDC Tsimasham ';
  //   }else if(this.userDetails.jurisdiction==='TVH&SL Gelegphu'){
  //     reportRequest.jurisdiction = 'RLDC Zhemgang';
  //   }else if(this.userDetails.jurisdiction==='TVH&SL Nganglam'){
  //     reportRequest.jurisdiction = 'RLDC Kanglung';
  //   }else if(this.userDetails.jurisdiction==='TVH&SL Dewathang'){
  //     reportRequest.jurisdiction = 'RLDC Kanglung';
  //   }else{
  //     reportRequest.jurisdiction = this.userDetails.jurisdiction;
  //   }
    reportRequest.userName = this.userDetails.userName;
    Object.assign(reportRequest, this.massVaccinationReport.value);
    this.visMasterService.getMassVaccReport(reportRequest).subscribe((res) => {
      this.report = res;
      this.dataSource.data = res;
      this.response = res;
      this.loading = false;
      console.log(res, 'sdddssddssdsdd');
    });
  }
}
