import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '@app/@core';
import { CredentialsService } from '@app/auth';
import {
  AnimalTypes,
  CatchingMethod,
  Dzongkhags,
  Gewogs,
  OwnershipTypes,
  PetBreeds,
  Program,
  SkinCondition,
  Country,
  Species,
} from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { ReportRequest } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-pet-report',
  templateUrl: './pet-report.component.html',
  styleUrls: ['./pet-report.component.scss'],
})
export class PetReportComponent implements OnInit {
  petReport: FormGroup;
  report: any;
  fromDate: string;
  toDate: string;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  species: Species[];
  petBreeds: PetBreeds[];
  showReport: boolean = false;
  response: Response[];
  loading = true;
  countrys: Country[];
  maxDate = new Date();
  userDetails: any;
  displayedColumns: string[] = [
    'slno',
    'owner_type',
    'registration_date',
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
    'pet_name',
    'microchip_number',
    'pet_registration_number',
    'species_name',
    'breed',
    'colour',
    'distinguishing_mark',
    'years',
    'months',
    'days',
    'sex',
    'neuter_status',
    'breeder_status',
    'statuss',
    'date_renewal',
    'receipt_number',
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
    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterService.loadDogSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadCountry().subscribe((response) => {
      this.countrys = response;
    });
  }
  getPetBreeds(speciesId: number) {
    this.visMasterService.getPetBreeds(speciesId).subscribe((response) => {
      this.petBreeds = response;
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
    this.petReport = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      nationality: new FormControl('All'),
      countryId: new FormControl('All'),
      dzongkhagId: new FormControl('All'),
      gewogId: new FormControl('All'),
      neuterStatus: new FormControl('All'),
      speciesId: new FormControl('All'),
      petBreedId: new FormControl('All'),
      sex: new FormControl('All'),
      status: new FormControl('All'),
    });
  }
  showDetails: boolean;
  getReport() {
    this.showReport = true;
    const reportRequest = new ReportRequest();
    reportRequest.centre = this.userDetails.centre.centre;
    reportRequest.levelUser = this.userDetails.levelUser.levelName;
    reportRequest.centreId = this.userDetails.centre.id;
    reportRequest.levelUserId = this.userDetails.levelUser.id;
   // reportRequest.jurisdiction = this.userDetails.jurisdiction;
   if(this.userDetails.jurisdiction==='TVH&SL Phuentshogling'){
    reportRequest.jurisdiction = 'RLDC Tsimasham ';
    }else if(this.userDetails.jurisdiction==='TVH&SL Gelegphu'){
      reportRequest.jurisdiction = 'RLDC Zhemgang';
    }else if(this.userDetails.jurisdiction==='TVH&SL Nganglam'){
      reportRequest.jurisdiction = 'RLDC Kanglung';
    }else if(this.userDetails.jurisdiction==='TVH&SL Dewathang'){
      reportRequest.jurisdiction = 'RLDC Kanglung';
    }else{
      reportRequest.jurisdiction = this.userDetails.jurisdiction;
    }
    reportRequest.userName = this.userDetails.userName;
    Object.assign(reportRequest, this.petReport.value);
    this.visMasterService.getPetReport(reportRequest).subscribe((res) => {
      this.report = res;
      this.dataSource.data = res;
      this.response = res;
      this.loading = false;
      console.log(res, 'sdddssddssdsdd');
    });
  }
}
