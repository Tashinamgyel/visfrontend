import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OwnershipTypes, Gewogs, Species, AnimalTypes, Breeds, Medicines, Country } from '@app/master-management/models/master';
import { Dzongkhags, ReportRequest } from '@app/vis/shared/model/model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-disease-outbreak-report-summary',
  templateUrl: './disease-outbreak-report-summary.component.html',
  styleUrls: ['./disease-outbreak-report-summary.component.scss']
})
export class DiseaseOutbreakReportSummaryComponent implements OnInit {
  outBreakReportSummary: FormGroup;
  outReport: any;
  dataOut: any
  fromDate: string;
  toDate: string;
  ownershipTypes: OwnershipTypes[];
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  species: Species[];
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  showReport: boolean = false;
  response: Response[];
  loading = true;
  countrys: Country[];
  maxDate = new Date();
  userDetails: any;
  
  displayedColumns = [
    'slno',
    'outbreak_id',
    'final_name',
    //'tentative_disease_name',
    //'finaldisease_name',
    'dzongkhag_name',
    'gewog_name',
    'caseDate',
   // 'ddcid_number',
    'householdAffected',
    'liveTotal',
    'deadTotal',
    'susceptible_animals',
    'examined',
    'treated',
    'culled',
    'vaccinated',
    'report',
   
];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private credentialsService: CredentialsService,
  ) {}
  
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
    this.outBreakReportSummary = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('All'),
      gewogId: new FormControl('All'),
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
    Object.assign(reportRequest, this.outBreakReportSummary.value);
    this.visMasterService.getOutBreakReportSummary(reportRequest).subscribe((res) => {
      this.outReport = res;
      this.dataSource.data = res;
      this.response = res;
      this.loading = false;
      console.log(this.outReport, 'sdddssddssdsdd');
    });
}
}