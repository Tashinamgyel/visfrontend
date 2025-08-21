import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '@app/master-management/services/master.service';
import { DashboardStateService } from '@app/dashboard/services/dashboard-state.service';
import { BehaviorSubject } from 'rxjs';
import { SearchDetails, Country } from '@app/master-management/models/master';
import { NotificationService } from '@app/@core';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { TreatmentDetailsPopComponent } from './treatment-details-pop/treatment-details-pop.component';
import { SterilizationDataViewComponent } from './sterilization-data-view/sterilization-data-view.component';
import { DewormingDataViewComponent } from './deworming-data-view/deworming-data-view.component';
import { VaccinationDataViewComponent } from './vaccination-data-view/vaccination-data-view.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public refreshData$ = new BehaviorSubject<boolean>(false);
  viewCase: boolean;
  viewTreatment: boolean;
  registrationDetails: FormGroup;
  treatmentDetails: FormGroup;
  public basicPanelOpenState: any;
  displayedColumns: string[] = ['slno', 'treatmentDate', 'status', 'registrationId'];
  dataSource = new MatTableDataSource();

  OngoingTable: boolean = false;

  showDetails = false;
  hideOthers = false;

  dataSourceForOngoing = new MatTableDataSource();

  displayedColumns2: string[] = ['slno', 'date', 'view'];

  displayedColumns1: string[] = [
    'slno',
    'className',
    'medicineName',
    'composition',
    'presentation',
    'unitType',
    'routeName',
    'frequencyName',
    'dosage',
    'duration',
  ];
  dataSource1 = new MatTableDataSource();

  // for Sterilization
  displayedColumnsForSterilization: string[] = ['slno', 'treatmentDate', 'status', 'registrationId'];
  dataSourceForSterilization = new MatTableDataSource();

  // for Deworming
  displayedColumnsForDeworming: string[] = ['slno', 'treatmentDate', 'status', 'registrationId'];
  dataSourceForDeworming = new MatTableDataSource();

  // for vaccination
  displayedColumnsForVaccination: string[] = ['slno', 'treatmentDate', 'status', 'registrationId'];
  dataSourceForVaccination = new MatTableDataSource();

  caseIdForOngoing: any;
  sendingDataToOngoing: any;

  ngOnInit(): void {
    this.initializeForm();
    this.initializeFormTreatement();
  }

  initializeFormTreatement() {
    this.treatmentDetails = this.fb.group({
      treatmentDate: new FormControl(''),
      anamnesisHistory: new FormControl(''),
      observation: new FormControl(''),
      systemName: new FormControl(''),
      conditions: new FormControl(''),
      differentialDiagnosis: new FormControl(''),
      clinicalTest: new FormControl(''),
      procedures: new FormControl(''),
      remarks: new FormControl(''),
      advice: new FormControl(''),
    });
  }

  initializeForm() {
    this.registrationDetails = this.fb.group({
      cidNumber: new FormControl(''),
      passportNumber: new FormControl(''),
      countryName: new FormControl(''),
      ownerName: new FormControl(''),
      dzongkhag: new FormControl(''),
      gewog: new FormControl(''),
      village: new FormControl(''),
      locality: new FormControl(''),
      mobileNumber: new FormControl(''),
      emailId: new FormControl(''),
      ownershipType: new FormControl(''),
      earTagNumber: new FormControl(''),
      microchipNumber: new FormControl(''),
      petRegistrationNumber: new FormControl(''),
      animalName: new FormControl(''),
      neuterStatus: new FormControl(''),
      species: new FormControl(''),
      animalType: new FormControl(''),
      breed: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      sex: new FormControl(''),
      bodyweight: new FormControl(''),
      patientId: new FormControl(''),
    });
  }
  /**
   * @description listening to search params change
   */
  searchParamsChange = false;

  /**
   * @description To get registered details
   */
  registeredDetails: any;
  caseDetails: any;
  clinicalCases: any;
  medDetails: any;

  /**
   * @description see search details of
   */
  seeDetails = false;

  /**
   * @description This is for storing search data from search form
   */
  @Input() searchDetails: any;

  patientIDToShow: any;
  ongoingFollowup: boolean = false;
  followUpBottomHide: boolean = false;
  addFollowupButtonHide: boolean = false;
  dataForFollowUp: any;

  constructor(
    private fb: FormBuilder,
    private state: DashboardStateService,
    private service: MasterService,
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  /**
   * @description This will redirect to the detailed page of a registered patient
   * @param registrationId: number
   * @return void
   */
  viewCases(patientId: string, registrationId: number) {
     console.log('searchDetails', this.searchDetails);

    for (let i = 0; i < this.searchDetails.length; i++) {

    console.log("searchDetails")
      this.patientIDToShow = this.searchDetails[i].patientId;
      console.log("searchDetails",this.searchDetails)
    }

    this.service.viewClinicalCases(patientId).subscribe((res) => {
      //  console.log('res', res);
      this.clinicalCases = res;
      // console.log(this.clinicalCases,"this.clinicalCasesthis.clinicalCases");

      this.dataSource.data = res;

      this.viewCase = true;
    });
    this.registrationDtls(registrationId);
  }

  nationality: boolean = false;
  registrationDtls(registrationId: number) {
    this.service.getRegisteredDetails(registrationId).subscribe((res) => {
      this.registeredDetails = res;
      // For Sterilization
      this.dataSourceForSterilization.data = this.registeredDetails.sterilization;
      // console.log('dataSourceForSterilization', this.dataSourceForSterilization.data);

      // For Deworming
      this.dataSourceForDeworming.data = this.registeredDetails.deworming;

     // console.log('dataSourceForDeworming', this.dataSourceForDeworming.data);
      // For Vaccination
      this.dataSourceForVaccination.data = this.registeredDetails.vaccination;
      //  console.log('dataSourceForVaccination', this.dataSourceForVaccination.data);

      if (this.registeredDetails.sex === 'M' || this.registeredDetails.sex === 'm') {
        var sexFull = 'Male';
      } else if (this.registeredDetails.sex === 'F' || this.registeredDetails.sex === 'f') {
        var sexFull = 'Female';
      }
      if (this.registeredDetails.cidNumber === null) {
        this.nationality = true;
        this.registrationDetails.get('countryName').setValue(this.registeredDetails.country.countryName);
      } else {
        this.nationality = false;
      }

      this.registrationDetails.patchValue({
        cidNumber: this.registeredDetails.cidNumber,
        reactionId: this.registeredDetails.reactionId,
        passportNumber: this.registeredDetails.passportNumber,
        ownerName: this.registeredDetails.ownerName,
        dzongkhag: this.registeredDetails.dzongkhag.dzongkhagName,
        gewog: this.registeredDetails.gewog.gewogName,
        village: this.registeredDetails.village.villageName,
        locality: this.registeredDetails.locality,
        mobileNumber: this.registeredDetails.mobileNumber,
        emailId: this.registeredDetails.emailId,
        ownershipType: this.registeredDetails.petRegistrationType.ownerType,
        microchipNumber: this.registeredDetails.microchipNumber,
        earTagNumber: this.registeredDetails.earTagNumber,
        petRegistrationNumber: this.registeredDetails.petRegistrationNumber,
        animalName: this.registeredDetails.animalName,
        neuterStatus: this.registeredDetails.neuterStatus,
        species: this.registeredDetails.species.speciesName,
        animalType: this.registeredDetails.animalType.animalType,
        breed: this.registeredDetails.breed.breedName,
        day: this.registeredDetails.day,
        month: this.registeredDetails.month,
        year: this.registeredDetails.year,
        sex: sexFull,
        bodyweight: this.registeredDetails.bodyweight,
        patientId: this.registeredDetails.patientId,
      });
    });
  }

  updateRegistration() {
    const search = new SearchDetails();
    Object.assign(search, this.registrationDetails.value);
    this.sharedService.updateRegistration(search).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated successfully');
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated');
      }
    );
  }

  viewDetails(dataToSend: any): void {
   // console.log(dataToSend, 'dataToSenddataToSenddataToSend');

    const dialogRef = this.dialog.open(TreatmentDetailsPopComponent, {
      width: '100%',
      height: '100%',
      position: { top: '5%', left: '20%' },
      data: {
        dataToSend: dataToSend,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  forOngoing: any;
  editDetails(caseId: any) {
    this.OngoingTable = true;

    this.dataForFollowUp = caseId;

    if (caseId.status === 'Completed' || caseId.status === 'completed') {
      this.addFollowupButtonHide = false;
      this.ongoingFollowup = false;
    } else if (caseId.status === 'Ongoing' || caseId.status === 'ongoing') {
      this.addFollowupButtonHide = true;
    }

    this.service.getClinicalCaseDetailsByCaseId(caseId.id).subscribe((res) => {
      this.forOngoing = res;
     // console.log(this.forOngoing,"this.forOngoingthis.forOngoingthis.forOngoingthis.forOngoing");

      this.dataSourceForOngoing.data = this.forOngoing;
      this.caseIdForOngoing = caseId;
    });
  }
  showOngoingFollowup() {
    this.ongoingFollowup = true;
    localStorage.setItem('caseIdForOngoing', JSON.stringify(this.caseIdForOngoing));
    localStorage.setItem('sendingDataToOngoing', JSON.stringify(this.dataForFollowUp));
  }

  closeOngoingFollowup() {
    this.ongoingFollowup = false;
  }

  viewCaseMedDetails(caseId: number) {
    this.service.getClinicalCaseMedDetails(caseId).subscribe((res) => {
      this.medDetails = res;
      this.dataSource1.data = this.medDetails;
    });
  }

  viewTreatmentDetails() {
    this.showDetails = true;
    this.hideOthers = true;
  }

  validateYear(type: any) {
    if (type == 'year') {
      if (this.registrationDetails.value.year > 100 || this.registrationDetails.value.year == 0) {
        this.registrationDetails.get('year').reset();
      }
    }

    if (type == 'month') {
      if (this.registrationDetails.value.month > 11 || this.registrationDetails.value.month == 0) {
        this.registrationDetails.get('month').reset();
      }
    }

    if (type == 'day') {
      if (this.registrationDetails.value.day > 29 || this.registrationDetails.value.day == 0) {
        this.registrationDetails.get('day').reset();
      }
    }
  }

  viewDetailsForSterilization(sterilizationData: any) {
    const dialogRef = this.dialog.open(SterilizationDataViewComponent, {
      width: '100%',
      height: '100%',
      position: { top: '5%', left: '20%' },
      data: {
        sterilizationData: sterilizationData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  viewDetailsForDeworming(dewormingData: any) {
    const dialogRef = this.dialog.open(DewormingDataViewComponent, {
      width: '100%',
      height: '100%',
      position: { top: '5%', left: '20%' },
      data: {
        dewormingData: dewormingData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  viewDetailsForVaccination(vaccinationData: any) {
    const dialogRef = this.dialog.open(VaccinationDataViewComponent, {
      width: '100%',
      height: '100%',
      position: { top: '5%', left: '20%' },
      data: {
        vaccinationData: vaccinationData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
