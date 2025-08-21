import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  OwnershipTypes,
  Dzongkhags,
  Country,
  Medicines,
  Class,
  Gewogs,
  Species,
  AnimalTypes,
  Breeds,
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
import { ReportRequest } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-mass-deworming-report',
  templateUrl: './mass-deworming-report.component.html',
  styleUrls: ['./mass-deworming-report.component.scss'],
})
export class MassDewormingReportComponent implements OnInit {
  massDewormingReport: FormGroup;
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
  userDetails: any;
  displayedColumns: string[] = [
    'slno',
    'nationality',
    'mass_registration_id',
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
    'date',
    'species_name',
    'animal_type',
    'breed',
    'age',
    'male',
    'female',
    'mixed',
    'total',
    'class_name',
    'medicine_name',
    'route_name',
    'frequency_name',
    'dosage',
    'unit_type',
    'duration',
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
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initializeForm() {
    this.massDewormingReport = this.fb.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      nationality: new FormControl('All'),
      ownerTypeId: new FormControl('All'),
      dzongkhagId: new FormControl('All'),
      gewogId: new FormControl('All'),
      speciesId: new FormControl('All'),
      animalTypeId: new FormControl('All'),
      breedId: new FormControl('All'),
      classId: new FormControl('All'),
      medicineId: new FormControl('All'),
    });
  }
  showDetails: boolean;
  getReport() {
    this.showReport = true;
    const reportRequest = new ReportRequest();
    reportRequest.treatment = 'Deworming';
    reportRequest.centre = this.userDetails.centre.centre;
    reportRequest.levelUser = this.userDetails.levelUser.levelName;
    reportRequest.centreId = this.userDetails.centre.id;
    reportRequest.levelUserId = this.userDetails.levelUser.id;
    //reportRequest.jurisdiction = this.userDetails.jurisdiction;
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
    Object.assign(reportRequest, this.massDewormingReport.value);
    this.visMasterService.getMassClinicalReport(reportRequest).subscribe((res) => {
      this.report = res;
      this.dataSource.data = res;
      this.response = res;
      this.loading = false;
      //console.log(res, 'sdddssddssdsdd');
    });
  }
}

// export class AppComponent  {
//   data = [
//     { state: 'MN', county: '1', item: 0.297 },
//     { state: 'MN', county: '1', item: 0.04 },
//     { state: 'MN', county: '3', item: 0.14 },
//     { state: 'CA', county: '2', item: 0.019 },
//     { state: 'MN', county: '1', item: 0.0374 }, 
//     { state: 'CA', county: '2', item: 0.037 },
//     { state: 'CA', county: '3', item: 0.14 }
//   ];

//   dataExt: any[] = [];

//   constructor() {
//     this.processData();
//   }

//   private processData() {
//     const statesSeen = {};
//     const countiesSeen = {};

//     this.dataExt = this.data.sort((a, b) => {
//       const stateComp = a.state.localeCompare(b.state);
//       return stateComp ? stateComp : a.county.localeCompare(b.county);
//     }).map(x => {
//       const stateSpan = statesSeen[x.state] ? 0 :
//         this.data.filter(y => y.state === x.state).length;
      
//       statesSeen[x.state] = true;
//       const countySpan = countiesSeen[x.state] && countiesSeen[x.state][x.county] ? 0 :
//       this.data.filter(y => y.state === x.state && y.county === x.county).length;
//       countiesSeen[x.state] = countiesSeen[x.state] || {};
//       countiesSeen[x.state][x.county] = true;

//       return { ...x, stateSpan, countySpan };
//     });
//   }
// }

// SELECT 
// IFNULL(a.cid_number,'') cid_number, 
// IFNULL(a.jurisdiction,'') jurisdiction,
// IFNULL(a.email_id,'') email_id, 
// IFNULL(a.locality,'') locality, 
// IFNULL(a.mass_registration_id,'') mass_registration_id, 
// IFNULL(a.mobile_number,'') mobile_number, 
// IFNULL(a.owner_name,'') owner_name, 
// IFNULL(a.passport_number,'') passport_number, 
// IFNULL(a.type,'') mass_Type, 
// IFNULL(bb.dzongkhag_name,'') dzongkhag_name, 
// IFNULL(c.gewog_name,'') gewog_name, 
// IFNULL(hh.owner_type,'') owner_type, 
// IFNULL(e.village_name,'') village_name, 
// IFNULL(kk.country_name,'') country_name, 
// IF(a.nationality = 1,'Bhutanese','Non-Bhutanese') nationality, 
// IFNULL(b.age,'') age, 
// IFNULL(b.female,'') female, 
// IFNULL(b.male,'') male, 
// IFNULL(b.mass_id,'') mass_ids, 
// IFNULL(b.mass_registration_id,'') mass_registration_ids, 
// IFNULL(b.mixed,'') mixed, 
// IFNULL(DATE_FORMAT(b.treatement_date,'%d-%m-%Y'),'') treatment_date, 
// IFNULL(dd.animal_type,'') animal_type, 
// IFNULL(ee.breed_name,'') breed_name, 
// IFNULL(ss.species_name,'') species_name, 
// IFNULL(b.total,'') total , 
// IFNULL(b.treatement,'') treatement , 
// IFNULL(b.vaccination_state,'') vaccination_state, 
// IFNULL(b.not_vaccinated,'') not_vaccinated, 
// IFNULL(b.reasons,'') reasons, 
// IFNULL(jj.centre,'') centre, 
// IFNULL(m.dosage,'') dosage, 
// IFNULL(m.duration,'')duration, 
// IFNULL(m.mass_id,'') mass_idsss, 
// IFNULL(m.mass_registration_id,'') mass_registration_idsss, 
// IFNULL(cc.class_name,'') class_name, 
// IFNULL(ce.frequency_name,'') frequency_name, 
// IFNULL(cd.medicine_name,'') medicine_name, 
// IFNULL(cf.route_name,'') route_name, 
// IFNULL(m.treatment_id,'') treatment_id, 
// IFNULL(cg.unit_type,'') unit_type 
// FROM t_mass_registration a 
// LEFT JOIN t_mass_details b ON a.mass_registration_id = b.mass_registration_id
// LEFT JOIN t_mass_medicine_details m ON b.mass_id =m.mass_id 
// LEFT JOIN t_dzongkhag_master bb ON a.dzongkhag_id = bb.id 
// LEFT JOIN t_gewog_master c ON a.gewog_id=c.id 
// LEFT JOIN t_village_master e ON a.village_id=e.id 
// LEFT JOIN t_ownership_master hh ON a.owner_type_id = hh.id 
// LEFT JOIN t_country_master kk ON a.country_id = kk.id 
// LEFT JOIN t_user_centre_master jj ON a.centre_id = jj.id 
// LEFT JOIN t_species_master ss ON b.species_id = ss.id 
// LEFT JOIN t_animal_type_master dd ON b.animal_type_id = dd.id 
// LEFT JOIN t_breed_master ee ON b.breed_id = ee.id 
// LEFT JOIN t_class_master cc ON m.class_entity_id = cc.id 
// LEFT JOIN t_medicine_master cd ON m.medicine_entity_id = cd.id 
// LEFT JOIN t_frequency_master ce ON m.frequency_id = ce.id 
// LEFT JOIN t_route_master cf ON m.route_id = cf.id 
// LEFT JOIN t_dose_unit cg ON m.unit_id = cg.id 
// -- LEFT JOIN t_vaccine_type_master ll ON m.vaccine_type_id = ll.id 
// WHERE b.treatement_date BETWEEN  '2022-02-22'  AND '2022-02-22'
// AND b.treatement ='Deworming' ORDER BY b.age ,a.mass_registration_id;
