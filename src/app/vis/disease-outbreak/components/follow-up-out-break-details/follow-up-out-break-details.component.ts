import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { POUTRY_AGE, FlashReport } from '@app/vis/shared/model/model';
import {
  Dzongkhags,
  Gewogs,
  BasisOfDiagnosis,
  Cases,
  FarmingSystem,
  DiseaseSampleType,
  TypeOfTest,
  Laboratory,
  Tests,
} from '@app/master-management/models/master';
import { Credentials, CredentialsService } from '@app/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { AddFollowUpCaseComponentComponent } from '../add-follow-up-case-component/add-follow-up-case-component.component';
import { AddFollowUpComponent } from '../add-follow-up/add-follow-up.component';
import { MatRadioChange } from '@angular/material/radio';
import { FollowUpSusceptibleComponent } from '../follow-up-susceptible/follow-up-susceptible.component';

@Component({
  selector: 'app-follow-up-out-break-details',
  templateUrl: './follow-up-out-break-details.component.html',
  styleUrls: ['./follow-up-out-break-details.component.scss'],
})
export class FollowUpOutBreakDetailsComponent implements OnInit {
  [x: string]: any;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  outBreakForm: FormGroup;
  followUpForm: FormGroup;
  followUpSusceptibleForm: FormGroup;
  flashId: number;
  type: string;
  outbreakDetails: any;
  followUpDetails: any;
  flashCase: any;
  susceptible: any;
  maxDate = new Date();
  ownerFollowUp: any;
  followUpCase: any;
  followUpFate: any;
  followUpSusceptible: any;
  animalType: any = [];
  breeds: any = [];
  species: any = [];
  poultryAges = POUTRY_AGE;
  diseases: any;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  userName: boolean = true;
  basis: BasisOfDiagnosis[];

  sampleCollected: boolean;
  laboratorys: Laboratory[];
  typeOfTest: TypeOfTest[];
  sampleType: DiseaseSampleType[];
  testResult: Tests[];
  farmingSystem: FarmingSystem[];
  followUp: any;
  public currentUser: Credentials;

  public registered = false;
  public basicPanelOpenState: any;
  reportStatus: number;
  cid: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  userDetails: any;
  view: boolean;

  displayedColumns: string[] = [
    'slno',
    'speciesName',
    'animalType',
    'breedName',
    'age',
    'male',
    'female',
    'mixed',
    'total',
    'status',
    // 'edit',
    //'delete',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = [
    'slno',
    'speciesName',
    'animalType',
    'susceptibleAnimals',
    //'edit',
    //'delete'
  ];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = [
    'slno',
    'cidNumber',
    'ownerName',
    'dzongkhagName',
    'gewogName',
    'villageName',
    'latitude',
    'longitude',
    'primaryDate',
    'farmingName',
    'lastVaccinationDate',
    'delete',
    'view',
  ];
  dataSource2 = new MatTableDataSource();

  displayedColumns3: string[] = [
    'slno',
    'cidNumber',
    'speciesName',
    'animalType',
    'breedName',
    'age',
    'male',
    'female',
    'mixed',
    'total',
    'status',
    'delete',
  ];
  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = [
    'slno',
    'cidNumber',
    'fate',
    'speciesName',
    'animalType',
    'breedName',
    'numbers',
    'delete',
  ];
  dataSource4 = new MatTableDataSource();

  displayedColumns5: string[] = ['slno', 'speciesName', 'animalType', 'susceptibleAnimals', 'edit', 'delete'];
  dataSource5 = new MatTableDataSource();

  displayedColumns6: string[] = [
    'slno',
    'cidNumber',
    'speciesName',
    'animalType',
    'breedName',
    'age',
    'male',
    'female',
    'mixed',
    'total',
    'status',
    'edit',
    'delete',
  ];
  dataSource6 = new MatTableDataSource();

  displayedColumns7: string[] = [
    'slno',
    'cidNumber',
    'fate',
    'speciesName',
    'animalType',
    'breedName',
    'numbers',
    'edit',
    'delete',
  ];
  dataSource7 = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private service: MasterService,
    private credentialsService: CredentialsService,
    private router: Router,
    private notificationService: NotificationService // private _formBuilder: FormBuilder
  ) {}

  tableData: any;
  ngOnInit(): void {
    this.initializeForm();
    this.initializeFollowUpForm();
    this.initializeFirstFormGroup();
    this.initializeSecondFormGroup();
    this.populateForm();
    this.currentUser = this.credentialsService.credentials;
    this.route.queryParams.subscribe((params) => {
      this.flashId = params.flashId;
    });
    if (this.credentialsService.credentials.roleName === 'Ncah') {
      this.userName = true;
    } else {
      this.userName = false;
    }
    //this.first=true;
    this.getTableData();
  }

  initializeFirstFormGroup() {
    this.firstFormGroup = this.fb.group({
      cidNumber: new FormControl(''),

      ownerName: new FormControl(''),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      // villageName: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      primaryDate: new FormControl(''),
      farmingId: new FormControl(''),
      //lastVaccinationDate: new FormControl('', Validators.required),
      lastVaccinationDate: new FormControl(''),
      villageId: new FormControl(''),
      locality: new FormControl(''),
      ownershipStatus: new FormControl('', Validators.required),
    });
  }
  initializeSecondFormGroup() {
    this.secondFormGroup = this.fb.group({});
  }
  getCitizen(cidNumber: number) {
    localStorage.setItem('cid', JSON.stringify(cidNumber));
    this.cid = JSON.parse(localStorage.getItem('cid'));
    this.service.getCitizen(cidNumber).subscribe(
      (response) => {
        this.firstFormGroup.patchValue({
          ownerName: response.fullName,
        });
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not load details, please try again later');
      }
    );
  }

  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
      console.log('sds', res);
    });
    this.sharedService.loadDiseases().subscribe((response) => {
      this.diseases = response;
    });
    this.service.loadTypeOfTest().subscribe((response) => {
      this.typeOfTest = response;
    });

    this.service.loadDiseaseSampleType().subscribe((response) => {
      this.sampleType = response;
    });

    this.service.loadLaboratory().subscribe((response) => {
      this.laboratorys = response;
    });

    this.service.loadFarmingSystem().subscribe((response) => {
      this.farmingSystem = response;
    });

    this.service.loadTest().subscribe((response) => {
      this.testResult = response;
    });

    this.service.loadClinicalTest().subscribe((response) => {
      this.basis = response;
    });

    this.sharedService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeSampleCollected(event: MatRadioChange) {
    this.sampleCollected = Number(event.value) === 1;
  }

  getTableData() {
    this.sharedService.getOutbreakDetails(this.flashId).subscribe((res) => {
      this.outbreakDetails = res;
      console.log('sdsdsd', res);
      this.followUp = res.followUp;
      this.outBreakForm.patchValue({
        outbreakId: this.outbreakDetails.outbreakId,
        flashId: this.outbreakDetails.id,
        fullName: this.outbreakDetails.fullName,
        diseaseId: this.outbreakDetails.disease.id,
        notifiability: this.outbreakDetails.notifiability,
        ownerName: this.outbreakDetails.ownerName,
        dzongkhagId: this.outbreakDetails.dzongkhag.id,
        gewogName: this.outbreakDetails.gewog.gewogName,
        gewogId: this.outbreakDetails.gewog.id,
        villageName: this.outbreakDetails.village.villageName,
        latitude: this.outbreakDetails.latitude,
        longitude: this.outbreakDetails.longitude,
        caseDate: this.outbreakDetails.caseDate,
        reportDate: this.outbreakDetails.reportDate,
        forwardDate: this.outbreakDetails.forwardDate,
        briefHistory: this.outbreakDetails.briefHistory,
        householdAffected: this.outbreakDetails.householdAffected,
        vaccinationDate: this.outbreakDetails.vaccinationDate,
        outbreakSource: this.outbreakDetails.outbreakSource,
        controlMeasures: this.outbreakDetails.controlMeasures,
        contactName: this.outbreakDetails.contactName,
        mobileNumber: this.outbreakDetails.mobileNumber,
        createdBy: this.outbreakDetails.fullName,
        reportStatus: this.outbreakDetails.reportStatus,
        locality: this.outbreakDetails.locality,
        dzongkhagName: this.outbreakDetails.dzongkhag.dzongkhagName,
      });
      this.followUpForm.patchValue({
        outbreakId: this.outbreakDetails.outbreakId,
        caseDate: this.outbreakDetails.caseDate,
      });
      this.getCaseData();
      this.getSusceptibleData();
      this.getOwnerData();
      this.getSusceptibleDataFollow();
    });
  }
  getCaseData() {
    this.sharedService.getCaseDetails(this.flashId).subscribe((res) => {
      this.flashCase = res;
      this.dataSource = res;
    });
  }
  getSusceptibleData() {
    this.sharedService.getSusceptibleData(this.flashId).subscribe((res) => {
      this.susceptible = res;
      this.dataSource1 = res;
    });
  }

  getOwnerData() {
    this.type = 'OwnerFollowUp';
    this.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, 0).subscribe((res) => {
      this.ownerFollowUp = res;
      this.dataSource2 = res;

      localStorage.removeItem('dataToPopulate');
      localStorage.removeItem('cid');
    });
  }

  getFollowUpCase() {
    this.type = 'FollowUpCase';
    this.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, this.cid).subscribe((res) => {
      this.followUpCase = res;
      this.dataSource3 = res;
    });
  }

  getFollowUpFate() {
    this.type = 'FollowUpFate';
    this.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, this.cid).subscribe((res) => {
      this.followUpFate = res;
      this.dataSource4 = res;
    });
  }

  getSusceptibleDataFollow() {
    this.type = 'FollowUpSusceptible';
    this.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, 0).subscribe((res) => {
      this.followUpSusceptible = res;
      this.dataSource5 = res;
      console.log(res, 'FollowUpSusceptible');
    });
  }

  getGewogs(dzongkhagId: number) {
    this.sharedService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  villages: any;
  getVillages(gewogId: number) {
    this.sharedService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }
  initializeFollowUpForm() {
    this.followUpForm = this.fb.group({
      outbreakId: new FormControl('', Validators.required),
      caseDate: new FormControl('', Validators.required),
      followUpDate: new FormControl('', Validators.required),
      //followUpCases :new FormControl('', Validators.required),
      clinicalSigns: new FormControl('', Validators.required),
      lesions: new FormControl(''),
      tentativeDiseaseId: new FormControl('', Validators.required),
      differentialDiagnosis: new FormControl(''),
      sampleCollected: new FormControl('', Validators.required),
      sampleId: new FormControl('', Validators.required),
      testId: new FormControl('', Validators.required),
      sampleIds: new FormControl('', Validators.required),
      dateSampleSent: new FormControl('', Validators.required),
      laboratoryId: new FormControl('', Validators.required),
      dateResultReceived: new FormControl('', Validators.required),
      resultId: new FormControl('', Validators.required),
      finalDiseaseId: new FormControl('', Validators.required),
      basisDiagnosisId: new FormControl(''),
      finalBasisDiagnosisId: new FormControl(''),
      diagnosingOfficer: new FormControl('', Validators.required),
      farmingId: new FormControl('', Validators.required),
      lastVaccinationDate: new FormControl('', Validators.required),
      probableSource: new FormControl('', Validators.required),
      controlMeasures: new FormControl(''),
    });
  }
  initializeForm() {
    this.outBreakForm = this.fb.group({
      diseaseId: new FormControl('', Validators.required),
      notifiability: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
      gewogName: new FormControl('', Validators.required),
      villageName: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      caseDate: new FormControl('', Validators.required),
      reportDate: new FormControl(''),
      forwardDate: new FormControl('', Validators.required),
      briefHistory: new FormControl('', Validators.required),
      householdAffected: new FormControl('', Validators.required),
      vaccinationDate: new FormControl('', Validators.required),
      outbreakSource: new FormControl('', Validators.required),
      controlMeasures: new FormControl('', Validators.required),
      contactName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      createdBy: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      dzongkhagName: new FormControl(''),
    });
  }
  openAddModalFollowUpCase() {
    const dialogRef = this.dialog.open(AddFollowUpCaseComponentComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveFlashCase(result);
      }
    });
  }

  editCase(id: number) {
    const dialogRef = this.dialog.open(AddFollowUpCaseComponentComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveFlashCase(result);
      }
    });
  }

  openAddModalFate() {
    const dialogRef = this.dialog.open(AddFollowUpComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
        flash: this.flashId,
        reportStatus: this.outbreakDetails.reportStatus,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveFlashCase(result);
      }
    });
  }
  editFate(id: number) {
    const dialogRef = this.dialog.open(AddFollowUpComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveFlashCase(result);
      }
    });
  }
  openAddModalSusceptibleFollowUp() {
    const dialogRef = this.dialog.open(FollowUpSusceptibleComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
        // flash: this.flashId,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveFlashCase(result);
      }
    });
  }

  editSusceptibleFollowUp(id: number) {
    const dialogRef = this.dialog.open(FollowUpSusceptibleComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveFlashCase(result);
      }
    });
  }

  saveCaseOwner() {
    const cases = new Cases();
    Object.assign(cases, this.firstFormGroup.value);
    console.log('ssssssssssss', this.cases);

    cases.createdBy = this.credentialsService.credentials.userName;
    cases.type = 'OwnerDetails';
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    cases.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService.saveFlashCaseOwner(cases).subscribe();
    localStorage.setItem('fetchedCID', JSON.stringify(this.cid));
  }

  saveFlashCase(cases: Cases) {
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    cases.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService.saveFlashCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        //this.getCaseData();
        this.getFollowUpCase();
        this.getFollowUpFate();
        this.getSusceptibleDataFollow();
        this.viewReport(cases.cidNumber);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  viewReport(cidNumber: number) {
    localStorage.setItem('fetchedCID', JSON.stringify(cidNumber));
    this.view = true;
    this.type = 'FollowUpCase';
    this.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService
      .getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, cidNumber)
      .subscribe((res) => {
        this.followUpCase = res;
        this.dataSource6 = res;
      });
    this.viewFateData(cidNumber);
  }

  viewFateData(cidNumber: number) {
    this.type = 'FollowUpFate';
    this.reportStatus = this.outbreakDetails.reportStatus;
    this.sharedService
      .getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, cidNumber)
      .subscribe((res) => {
        this.followUpFate = res;
        this.dataSource7 = res;
      });
  }

  deleteReport(id: number, type: string, cidNumber: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.sharedService.deleteCase(id, type).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted successfully');
            this.getOwnerData();
            this.getFollowUpCase();
            this.getFollowUpFate();
            this.getSusceptibleDataFollow();
            this.viewReport(cidNumber);
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be deleted, try again');
          }
        );
      }
    });
  }

  saveFollowUp() {
    const flashReport = new FlashReport();
    Object.assign(flashReport, this.followUpForm.value);

    if (this.followUpForm.value.followUpDate === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.outBreakForm.value.sampleCollected === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.followUpForm.value.tentativeDiseaseId === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.followUpForm.value.probableSource === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.followUpForm.value.controlMeasures === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.followUpForm.value.cidNumber === '') {
      this.notificationService.openErrorSnackBar('Enter Owner Details');
      return;
    } else if (this.followUpForm.value.ownershipStatus === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');
      return;
    } else if (this.followUpForm.value.speciesName === '') {
      this.notificationService.openErrorSnackBar('Select Dzongkhag ');
      return;
    }

    flashReport.createdBy = this.credentialsService.credentials.userName;
    flashReport.outbreakId = this.outbreakDetails.outbreakId;
    flashReport.flashId = this.outbreakDetails.id;
    flashReport.reportStatus = this.outbreakDetails.reportStatus;
    flashReport.flag = 'Y';
    flashReport.followUp = this.followUpForm.value;
    flashReport.userName = this.userDetails.userName;
    flashReport.centreId = this.userDetails.centre.id;
    flashReport.levelUserId = this.userDetails.levelUser.id;
    flashReport.jurisdiction = this.userDetails.jurisdiction;
    flashReport.fullName = this.userDetails.fullName;

    this.sharedService.saveFollowUp(flashReport).subscribe(
      (res) => {
        //console.log(res);
        this.notificationService.openSuccessSnackBar('Submitted Successfully ');
        this.registered = true;
        this.outbreakDetails = res;
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added, please try again');
      }
    );
  }
  sendMail() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to Send Mail?',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // if (result) {
      //   const flashReport = new FlashReport();
      //   Object.assign(flashReport, this.outBreakForm.value);
      //   flashReport.createdBy = this.credentialsService.credentials.userName;
      //   flashReport.outbreakId = this.outbreakDetails.outbreakId;
      //   flashReport.flashId = this.outbreakDetails.id;
      //   flashReport.reportStatus = this.outbreakDetails.reportStatus;
      //   flashReport.flag = 'Y';
      //   flashReport.followUp = this.followUpForm.value;
      //   this.sharedService.sendMail(flashReport).subscribe(
      //     () => {
      //       this.notificationService.openSuccessSnackBar('Send successfully');
      //       this.router.navigate(['/', 'dashboard']);
      //     },
      //     () => {
      //       this.notificationService.openErrorSnackBar('Couldnot be send, try again');
      //     }
      //   );
      // }
    });
  }
}
