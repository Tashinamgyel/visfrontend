import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Dzongkhags, Gewogs, Country, MedicationData } from '@app/vis/shared/model/model';
import {
  AnimalTypes,
  OwnershipTypes,
  Species,
  Breeds,
  Villages,
  MassSearch,
  Cases,
} from '@app/master-management/models/master';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddMassVaccComponent } from '@app/vis/mass/components/add-mass-vacc/add-mass-vacc.component';
import { AddMassMedComponent } from '@app/vis/mass/components/add-mass-med/add-mass-med.component';
import { AddMassCaseComponent } from '@app/vis/mass/components/add-mass-case/add-mass-case.component';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-disease-outbreak-report-search',
  templateUrl: './disease-outbreak-report-search.component.html',
  styleUrls: ['./disease-outbreak-report-search.component.scss'],
})
export class DiseaseOutbreakReportSearchComponent implements OnInit {
  outbreakIDSearch: FormGroup;
  public registered = false;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  animalTypes: AnimalTypes[];
  ownershipTypes: OwnershipTypes[];
  species: Species[];
  breeds: Breeds[];
  massRegistrationDetails: any;
  nationality: boolean;
  villages: Villages[];
  countrys: Country[];
  viewDetails: boolean;
  mobileNumberForValidation: any;

  public refreshData$ = new BehaviorSubject<boolean>(false);
  forBhutanese: any = true;
  forNonBhutanese: any = false;
  clickedData: any;
  massRegistrationNoForSearch: any;
  nationalityForShowing: any;
  nationalityChange: any;
  allMassDetails: any;
  treatmentDetails: any;
  medDetails: any;
  vaccDetails: any;
  mass: any;
  massDtls: any;
  ownerDtls: any;
  caseDtls: any;
  fateDtls: any;
  susceptibleDtls: any;
  medId: number;
  messId: number;
  massRegId: string;
  addTreatement: string;
  addtreatementDate: Date;
  addSpecies: number;
  view: boolean;
  viewVacc: boolean;
  viewMed: boolean;
  yesVacc: boolean;
  village: Villages[];
  gewog: Gewogs[];
  dzongkhag: Dzongkhags[];
  public basicPanelOpenState: any;
  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private dialog: MatDialog,
    private notification: NotificationService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    //this.populateForm();
  }
  displayedColumns: string[] = ['slno', 'outbreak_id', 'final_name', 'follow_up_date', 'report_status', 'view'];

  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = [
    'slno',
    'cid_number',
    'owner_name',
    'dzongkhag_name',
    'gewog_name',
    'village_name',
    'latitude',
    'longitude',
    'primary_date',
    'farm_name',
    'last_vaccination_date',
    'view',
  ];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = [
    'slno',
    'species_name',
    'animal_type',
    'breed_name',
    'age',
    'male',
    'female',
    'mixed',
    'total',
    'statuss',
  ];
  dataSource2 = new MatTableDataSource();
  displayedColumns3: string[] = ['slno', 'fate', 'species_name', 'animal_type', 'breed_name', 'numbers'];
  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = ['slno', 'species_name', 'animal_type', 'susceptible_animals'];
  dataSource4 = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator1;
    this.dataSource.sort = this.sort1;
  }

  initializeForm() {
    this.outbreakIDSearch = this.fb.group({
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
      outbreakId: new FormControl(''),
    });
  }

  getOutbreakID() {
    var outbreakID = this.outbreakIDSearch.value.outbreakId;
    this.visMasterService.getByOutbreakID(outbreakID).subscribe((response) => {
      this.massDtls = response;
      this.dataSource.data = this.massDtls;
    });
  }

  viewOwnerDetails(outbreak_id: string, report_status: string) {
    this.visMasterService.getOwnerDetails(outbreak_id, report_status).subscribe((response) => {
      this.ownerDtls = response;
      this.dataSource1.data = this.ownerDtls;
    });
  }
  viewAllDetails(outbreak_id: string, report_status: string, cid_number: string) {
    this.visMasterService.getOutBreakCaseDetails(outbreak_id, report_status, cid_number).subscribe((response) => {
      this.caseDtls = response;
      this.dataSource2.data = this.caseDtls;
    });

    this.viewFateDetails(outbreak_id, report_status, cid_number);
  }
  viewFateDetails(outbreak_id: string, report_status: string, cid_number: string) {
    this.visMasterService.getFateDetails(outbreak_id, report_status, cid_number).subscribe((response) => {
      this.fateDtls = response;
      this.dataSource3.data = this.fateDtls;
    });
    this.viewSusceptibleDetails(outbreak_id, report_status);
  }

  viewSusceptibleDetails(outbreak_id: string, report_status: string) {
    this.visMasterService.getSusceptibleDetails(outbreak_id, report_status).subscribe((response) => {
      this.susceptibleDtls = response;
      this.dataSource4.data = this.susceptibleDtls;
    });
  }
}
