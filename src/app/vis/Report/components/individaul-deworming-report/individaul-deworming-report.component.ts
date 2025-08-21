import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  OwnershipTypes,
  Species,
  AnimalTypes,
  Breeds,
  Class,
  Medicines,
  DewormingDiagnosticTest,
  DewormingCondition,
} from '@app/master-management/models/master';
import { Dzongkhags, Gewogs, Country, ReportRequest } from '@app/vis/shared/model/model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';
import { NotificationService } from '@app/@core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individaul-deworming-report',
  templateUrl: './individaul-deworming-report.component.html',
  styleUrls: ['./individaul-deworming-report.component.scss'],
})
export class IndividaulDewormingReportComponent implements OnInit {
  dewormingReport: FormGroup;
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
  diagnosticTest: DewormingDiagnosticTest[];
  dewormingCond: DewormingCondition[];
  userDetails: any;
  displayedColumns: string[] = [
    'slno',
    'patient_ids',
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
    'species_name',
    'animal_type',
    'pet_registration_number',
    'ear_tag_number',
    'microchip_number',
    'pet_name',
    'neuter_status',
    'breed',
    'years',
    'months',
    'days',
    'sex',
    'bodyweight',
    'treatment_date',

    'diagnostic_system_name',
    'differential_diagnosis',
    'final_conditions',
    'request',
    'type_of_test',
    'class_name',
    'medicine_name',
    'route_name',
    'frequency_name',
    'dosage',
    'unit_type',
    'duration',
    'composition',
    'advice',
    'centre',
    'jurisdiction',
    'user_name',
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
    this.service.loadDeworningDiagnosticTest().subscribe((res) => (this.diagnosticTest = res));
    this.service.loadDewormingCondition().subscribe((response) => {
      this.dewormingCond = response;
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
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });
    this.service.loadClass().subscribe((res) => {
      this.classes = res;
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
  getMedicine(classId: number) {
    this.visMasterService.getMedicine(classId).subscribe((response) => {
      this.medicines = response;
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
    this.dewormingReport = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      nationality: new FormControl('All'),
      petRegistrationTypeId: new FormControl('All'),
      dzongkhagId: new FormControl('All'),
      gewogId: new FormControl('All'),
      speciesId: new FormControl('All'),
      animalTypeId: new FormControl('All'),
      breedId: new FormControl('All'),
      sex: new FormControl('All'),
      status: new FormControl('All'),
      classId: new FormControl('All'),
      medicineId: new FormControl('All'),
      conditionsId: new FormControl('All'),
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
    //reportRequest.jurisdiction = this.userDetails.jurisdiction;
    if (this.userDetails.jurisdiction === 'TVH&SL Phuentshogling') {
      reportRequest.jurisdiction = 'RLDC Tsimasham ';
    } else if (this.userDetails.jurisdiction === 'TVH&SL Gelegphu') {
      reportRequest.jurisdiction = 'RLDC Zhemgang';
    } else if (this.userDetails.jurisdiction === 'TVH&SL Nganglam') {
      reportRequest.jurisdiction = 'RLDC Kanglung';
    } else if (this.userDetails.jurisdiction === 'TVH&SL Dewathang') {
      reportRequest.jurisdiction = 'RLDC Kanglung';
    } else {
      reportRequest.jurisdiction = this.userDetails.jurisdiction;
    }
    reportRequest.userName = this.userDetails.userName;
    Object.assign(reportRequest, this.dewormingReport.value);
    this.visMasterService.getIndivDewormingReport(reportRequest).subscribe((res) => {
      this.report = res;
      this.dataSource.data = res;
      this.response = res;
      this.loading = false;
      console.log(res, 'sdddssddssdsdd');
    });
  }
}
