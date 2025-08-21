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
  Breeds,
  Class,
  Country,
  Gewogs,
  Medicines,
  OwnershipTypes,
  Species,
} from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { Dzongkhags, ReportRequest } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-outbreak-report',
  templateUrl: './outbreak-report.component.html',
  styleUrls: ['./outbreak-report.component.scss'],
})
export class OutbreakReportComponent implements OnInit {
  outBreakReport: FormGroup;
  outReport: any;
  dataOut: any;
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
  userDetails: any;

  displayedColumns = [
    'slno',
    'bboutbreak_id',
    'caseDate',
    'report',
    'date_resolved',
    'aareport_status',
    'aafollow_up_date',
    'bbprimary_date',
    'bbcid_number',
    'bbowner_name',
    'bbdzongkhag_name',
    'bbgewog_name',
    'bbvillage_name',
    'bblocality',
    'bblatitude',
    'bblongitude',
    'bbfarm_name',
    'bblast_vaccination_date',
    'hhspecies_name',
    'ccanimal_type',
    'ccbreed_name',
    'ccstatus',
    'ccage',
    'ccmale',
    'ccfemale',
    'ccmixed',
    'cctotal',
    // 'ddfate',
    // 'ddspecies_name',
    // 'ddanimal_type',
    // 'ddbreed_name',
    // 'ddnumbers',
    'aaclinical_signs',
    'aalesions',
    'aatentative_disease_name',
    'differential_diagnosis',
    'aasample_name',
    'aatypeoftest',
    'aadate_sample_sent',
    'aalab_name',
    'aadate_result_received',
    'aaresult_name',
    'aafinal_disease_name',
    'aabasis_name',
    'diagnosing_officer',
    // 'eespecies_name',
    // 'eeanimal_type',
    // 'eesusceptible_animals',
    'aoutbreak_source',
    'acontrol_measures',
    'user_name',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private credentialsService: CredentialsService
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
    //this.ngDoCheck();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initializeForm() {
    this.outBreakReport = this.fb.group({
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
    Object.assign(reportRequest, this.outBreakReport.value);
    this.visMasterService.getOutBreakReport(reportRequest).subscribe((res) => {
      this.outReport = res;
      this.dataSource.data = res;
      this.response = res;
      this.loading = false;
      console.log(this.outReport, 'sdddssddssdsdd');

      //  this.remove_duplicates(this.outReport);
    });
  }

  //  remove_duplicates(arr) {debugger;
  //   let obj = {};
  //   for (let i = 0; i < arr.length; i++) {
  //       obj[arr[i]] = true;
  //   }
  //   arr = [];
  //   for (let key in obj) {
  //       arr.push(key);
  //   }
  //   return arr;
  // }
}

//   cacheSpan(key, accessor) {
//       for (let i = 0; i < this.dataSource.filteredData.length;) {
//       let currentValue = accessor(this.outReport[i]);
//       let count = 1;

//       // Iterate through the remaining rows to see how many match
//       // the current value as retrieved through the accessor.
//       for (let j = i + 1; j <  this.dataSource.filteredData.length; j++) {
//         if (currentValue != accessor(this.outReport[j])) {
//           break;
//         }

//         count++;
//       }

//       if (!this.spans[i]) {
//         this.spans[i] = {};
//       }

//       // Store the number of similar values that were found (the span)
//       // and skip i to the next unique row.
//       this.spans[i][key] = count;
//       i += count;
//     }
//   }
//   getRowSpan(col, index) {
//     return this.spans[index] && this.spans[index][col];
//   }
// }
