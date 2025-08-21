import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@app/@core';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '@app/auth';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  Dzongkhags,
  Gewogs,
  PetBreeds,
  AnimalTypes,
  CatchingMethod,
  SkinCondition,
  Program,
} from '@app/master-management/models/master';
import { ReportRequest } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-dpm-report',
  templateUrl: './dpm-report.component.html',
  styleUrls: ['./dpm-report.component.scss'],
})
export class DpmReportComponent implements OnInit {
  dpmReport: FormGroup;
  report: any;
  fromDate: string;
  toDate: string;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  petBreeds: PetBreeds[];
  animalTypes: AnimalTypes[];
  catchMethods: CatchingMethod[];
  skinconditions: SkinCondition[];
  programs: Program[];
  showReport: boolean = false;
  response: Response[];
  loading = true;
  maxDate = new Date();
  userDetails: any;

  displayedColumns: string[] = [
    'slno',
    'program_name',
    'sterilizationDate',
    'animalType',
    'ownership_status',
    'cid',
    'owner_name',
    'catch_name',
    'tagNo',
    'dzongkhagName',
    'gewogName',
    'villageName',
    'locality',
    'latitude',
    'longitude',
    'mobile_number',
    'microchip_number',
    'pet_registration_number',
    'pet_name',
    'days',
    'months',
    'years',
    'breed',
    'sex',
    'body_colour',
    'clinical_location',
    // 'latitude',
    // 'longitude',
    'weight',
    'health_condition',
    'skin_condition_name',
    'transmissible_tumour',
    'other_conditions',
    'pregnancy_status',
    'pregnancy_stage',
    'foetuses',
    'vaccinationStatus',
    //'vaccination_status',
    'post_operative',
    'fate',
    'surgeon_name',
    'jurisdiction',
    'centre',
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
      //console.log(this.userDetails, 'this.userDetails');
    });

    this.service.loadProgram().subscribe((response) => {
      this.programs = response;
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
    this.service.loadCatchingMethod().subscribe((response) => {
      this.catchMethods = response;
    });
    this.service.loadSkinCondition().subscribe((response) => {
      this.skinconditions = response;
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
    this.dpmReport = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      programId: new FormControl('All'),
      ownershipStatus: new FormControl('All'),
      dzongkhagId: new FormControl('All'),
      gewogId: new FormControl('All'),
      petBreedId: new FormControl('All'),
      sex: new FormControl('All'),
      healthCondition: new FormControl('All'),
      skinConditionId: new FormControl('All'),
      transmissibleTumour: new FormControl('All'),
      pregnancyStatus: new FormControl('All'),
      vaccinationStatus: new FormControl('All'),
      postOperative: new FormControl('All'),
      fate: new FormControl('All'),
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
    Object.assign(reportRequest, this.dpmReport.value);
    this.visMasterService.getReport(reportRequest).subscribe((res) => {
      this.report = res;
      this.dataSource.data = res;
      this.response = res;
      this.loading = false;
      console.log(res, 'sdddssddssdsdd');
    });
  }
}
