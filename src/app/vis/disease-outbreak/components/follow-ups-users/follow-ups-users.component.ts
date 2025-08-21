import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { POUTRY_AGE, FlashReport } from '@app/vis/shared/model/model';
import {
  Dzongkhags,
  Gewogs,
  BasisOfDiagnosis,
  Laboratory,
  TypeOfTest,
  DiseaseSampleType,
  Tests,
  FarmingSystem,
  Cases,
} from '@app/master-management/models/master';
import { Credentials, CredentialsService } from '@app/auth';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { AddFollowUpCaseComponentComponent } from '../add-follow-up-case-component/add-follow-up-case-component.component';
import { AddFollowUpComponent } from '../add-follow-up/add-follow-up.component';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { FollowUpSusceptibleComponent } from '../follow-up-susceptible/follow-up-susceptible.component';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-follow-ups-users',
  templateUrl: './follow-ups-users.component.html',
  styleUrls: ['./follow-ups-users.component.scss'],
})
export class FollowUpsUsersComponent implements OnInit {
  public refreshData$ = new BehaviorSubject<boolean>(false);
  followUpForm: FormGroup;
  followUpFormUser: FormGroup;
  flashId: number;
  type: string;
  outbreakDetails: any;
  followUpDetails: any;
  flashCase: any;
  susceptible: any;
  followUpSusceptible: any;
  ownerFollowUp: any;
  followUpCase: any;
  followUpFate: any;
  animalType: any = [];
  breeds: any = [];
  species: any = [];
  poultryAges = POUTRY_AGE;
  maxDate = new Date();
  diseases: any;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  userName: boolean = true;
  basis: BasisOfDiagnosis[];
  sampleCollected: boolean;
  sampleCollecteds: boolean;
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
  reportStatusUser: number;
  cid: number;
  view: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  viewUser: boolean;
  userDetails: any;
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

  displayedColumns5: string[] = ['slno', 'speciesName', 'animalType', 'susceptibleAnimals'];
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
  ];
  dataSource6 = new MatTableDataSource();

  displayedColumns7: string[] = ['slno', 'cidNumber', 'fate', 'speciesName', 'animalType', 'breedName', 'numbers'];
  dataSource7 = new MatTableDataSource();

  //user

  displayedColumns10: string[] = [
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
  dataSource10 = new MatTableDataSource();

  displayedColumns11: string[] = [
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
  dataSource11 = new MatTableDataSource();

  displayedColumns12: string[] = [
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
  dataSource12 = new MatTableDataSource();

  displayedColumns13: string[] = ['slno', 'speciesName', 'animalType', 'susceptibleAnimals', 'edit', 'delete'];
  dataSource13 = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private service: MasterService,
    private credentialsService: CredentialsService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  tableData: any;
  ngOnInit(): void {
    this.initializefollowUpForm();
    this.initializeFormUser();
    this.populateForm();
    this.initializeFirstFormGroup();
    this.initializeSecondFormGroup();
    this.currentUser = this.credentialsService.credentials;
    this.route.queryParams.subscribe((params) => {
      this.flashId = params.flashId;
      this.reportStatus = params.reportStatus;
    });
    if (this.credentialsService.credentials.roleName === 'NCAH') {
      this.userName = true;
    } else {
      this.userName = false;
    }
    this.getTableData();
    // this.viewReport();
  }
  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
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

  changeSampleCollected() {
    var followUpFormEventValue = this.followUpForm.value.sampleCollected;
    this.sampleCollected = Number(followUpFormEventValue) === 1;
  }
  // changeSampleCollected(event: MatRadioChange) {
  //   this.sampleCollected = Number(event.value) === 1;
  // }

  getTableData() {
    this.sharedService.getfollowUpDetails(this.flashId, this.reportStatus).subscribe((res) => {
      this.outbreakDetails = res;
      this.changeSampleCollected;
      this.followUp = res.followUp;
      //console.log(this.outbreakDetails, 'this.outbreakDetails');
      // console.log(this.followUp, 'this.followUp');

      var i = Number(this.followUp.length) - 1;
      if (this.followUp[i].finalBasisDiagnosis !== null) {
        this.followUpForm.get('basisId').setValue(this.followUp[i].finalBasisDiagnosis.id);
      }
      this.followUpForm.patchValue({
        outbreakId: this.outbreakDetails.outbreakId,
        caseDate: this.outbreakDetails.caseDate,
        followUpDate: this.outbreakDetails.forwardDate,
        clinicalSigns: this.followUp[i].clinicalSigns,
        lesions: this.followUp[i].lesions,
        tentativeDiseaseId: this.followUp[i].tentativeDisease.id,
        probableSource: this.followUp[i].probableSource,
        controlMeasures: this.followUp[i].controlMeasures,
        differentialDiagnosis: this.followUp[i].differentialDiagnosis,
        sampleCollected: this.followUp[i].sampleCollected,
      });

      if (this.followUp[i].sampleCollected === 1) {
        this.followUpForm.patchValue({
          sampleId: this.followUp[i].sample.id,
          dateSampleSent: this.followUp[i].dateSampleSent,
          sampleIds: this.followUp[i].sampleIds,
          laboratoryId: this.followUp[i].laboratory.id,
          dateResultReceived: this.followUp[i].dateResultReceived,
          resultId: this.followUp[i].result.id,
          finalDiseaseId: this.followUp[i].finalDisease.id,
          basisDiagnosisIdUser: this.followUp[i].basisDiagnosis.id,
          testId: this.followUp[i].test.id,
          diagnosingOfficer: this.followUp[i].diagnosingOfficer,
        });
      }
      this.followUpFormUser.patchValue({
        outbreakId: this.outbreakDetails.outbreakId,
        caseDate: this.outbreakDetails.caseDate,
        reportStatus: this.outbreakDetails.reportStatus,
      });
      this.changeSampleCollected();

      this.getOwnerData();
      this.getSusceptibleDataFollow();
      this.getSusceptibleDataFollowUser();
      this.getOwnerDataUser();
    });
  }

  getOwnerData() {
    this.type = 'OwnerFollowUp';
    this.reportStatusUser = this.outbreakDetails.reportStatus - 1;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatusUser, 0).subscribe((res) => {
      this.ownerFollowUp = res;
      this.dataSource2 = res;
    });
  }

  getSusceptibleDataFollow() {
    this.type = 'FollowUpSusceptible';
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatusUser, 0).subscribe((res) => {
      this.followUpSusceptible = res;
      this.dataSource5 = res;
    });
  }

  viewReport(cidNumber: number) {
    localStorage.setItem('fetchedCID', JSON.stringify(cidNumber));
    this.view = true;
    this.type = 'FollowUpCase';
    this.sharedService
      .getFollowUpCaseDetails(this.flashId, this.type, this.reportStatusUser, cidNumber)
      .subscribe((res) => {
        this.followUpCase = res;
        this.dataSource6 = res;
      });
    this.viewFateData(cidNumber);
  }

  viewFateData(cidNumber: number) {
    this.type = 'FollowUpFate';
    this.reportStatus = this.reportStatus;
    this.sharedService
      .getFollowUpCaseDetails(this.flashId, this.type, this.reportStatusUser, cidNumber)
      .subscribe((res) => {
        this.followUpFate = res;
        this.dataSource7 = res;
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

  initializefollowUpForm() {
    this.followUpForm = this.fb.group({
      outbreakId: new FormControl('', Validators.required),
      caseDate: new FormControl('', Validators.required),
      followUpDate: new FormControl('', Validators.required),
      followUpCases: new FormControl('', Validators.required),
      clinicalSigns: new FormControl('', Validators.required),
      lesions: new FormControl('', Validators.required),
      tentativeDiseaseId: new FormControl('', Validators.required),
      basisId: new FormControl('', Validators.required),
      differentialDiagnosis: new FormControl('', Validators.required),
      sampleCollected: new FormControl(''),
      sampleCollecteds: new FormControl(''),
      //sampleCollected2: new FormControl(''),
      sampleId: new FormControl('', Validators.required),
      testId: new FormControl('', Validators.required),
      sampleIds: new FormControl('', Validators.required),
      dateSampleSent: new FormControl('', Validators.required),
      laboratoryId: new FormControl('', Validators.required),
      dateResultReceived: new FormControl('', Validators.required),
      resultId: new FormControl('', Validators.required),
      finalDiseaseId: new FormControl(''),
      basisDiagnosisIdUser: new FormControl(''),
      diagnosingOfficer: new FormControl(''),
      farmingId: new FormControl(''),
      lastVaccinationDate: new FormControl(''),
      probableSource: new FormControl('', Validators.required),
      controlMeasures: new FormControl('', Validators.required),
    });
  }

  //User
  initializeFormUser() {
    this.followUpFormUser = this.fb.group({
      outbreakId: new FormControl('', Validators.required),
      caseDate: new FormControl('', Validators.required),
      followUpDate: new FormControl('', Validators.required),
      clinicalSigns: new FormControl(''),
      lesions: new FormControl(''),
      tentativeDiseaseId: new FormControl('', Validators.required),
      finalBasisDiagnosisId: new FormControl(''),
      differentialDiagnosis: new FormControl(''),
      sampleCollected: new FormControl(''),
      sampleCollecteds: new FormControl(''),
      sampleId: new FormControl('', Validators.required),
      testId: new FormControl(''),
      sampleIds: new FormControl(''),
      dateSampleSent: new FormControl(''),
      laboratoryId: new FormControl(''),
      dateResultReceived: new FormControl(''),
      resultId: new FormControl('', Validators.required),
      finalDiseaseId: new FormControl(''),
      basisDiagnosisId: new FormControl(''),
      diagnosingOfficer: new FormControl(''),
      farmingId: new FormControl(''),
      lastVaccinationDate: new FormControl(''),
      probableSource: new FormControl(''),
      controlMeasures: new FormControl(''),
    });
  }
  changeSampleCollectedUser(event: MatRadioChange) {
    this.sampleCollecteds = Number(event.value) === 1;
  }

  initializeFirstFormGroup() {
    this.firstFormGroup = this.fb.group({
      cidNumber: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
      ),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      // villageName: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      primaryDate: new FormControl(''),
      farmingId: new FormControl(''),
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
  saveCaseOwner() {
    const cases = new Cases();
    Object.assign(cases, this.firstFormGroup.value);
    cases.createdBy = this.credentialsService.credentials.userName;
    cases.type = 'OwnerDetails';
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    cases.reportStatus = this.reportStatus;
    this.sharedService.saveFlashCaseOwner(cases).subscribe();
    localStorage.setItem('fetchedCID', JSON.stringify(this.firstFormGroup.get('cidNumber').value));
  }

  getOwnerDataUser() {
    this.type = 'OwnerFollowUp';
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, 0).subscribe((res) => {
      this.ownerFollowUp = res;
      this.dataSource10 = res;
      localStorage.removeItem('dataToPopulate');
      localStorage.removeItem('cid');
    });
  }

  viewReportUser(cidNumber: number) {
    localStorage.setItem('fetchedCID', JSON.stringify(cidNumber));
    this.viewUser = true;
    this.type = 'FollowUpCase';
    this.sharedService
      .getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, cidNumber)
      .subscribe((res) => {
        this.followUpCase = res;
        this.dataSource11 = res;
      });
    this.viewFateDataUser(cidNumber);
  }

  viewFateDataUser(cidNumber: number) {
    this.type = 'FollowUpFate';
    this.reportStatus = this.reportStatus;
    this.sharedService
      .getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, cidNumber)
      .subscribe((res) => {
        this.followUpFate = res;
        this.dataSource12 = res;
      });
  }

  getSusceptibleDataFollowUser() {
    this.type = 'FollowUpSusceptible';
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, 0).subscribe((res) => {
      this.followUpSusceptible = res;
      this.dataSource13 = res;
    });
  }

  openAddModalSusceptibleFollowUp() {
    const dialogRef = this.dialog.open(FollowUpSusceptibleComponent, {
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

  saveFlashCase(cases: Cases) {
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    cases.reportStatus = this.reportStatus;
    this.sharedService.saveFlashCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.getFollowUpCase();
        this.getFollowUpFate();
        this.getSusceptibleDataFollowUser();
        this.viewReportUser(cases.cidNumber);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  getFollowUpCase() {
    this.type = 'FollowUpCase';
    this.reportStatus = this.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, this.cid).subscribe((res) => {
      this.followUpCase = res;
      this.dataSource3 = res;
    });
  }

  getFollowUpFate() {
    this.type = 'FollowUpFate';
    this.reportStatus = this.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, this.cid).subscribe((res) => {
      this.followUpFate = res;
      this.dataSource4 = res;
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
            this.notificationService.openSuccessSnackBar(' Deleted Successfully ');
            this.getOwnerDataUser();
            this.getFollowUpCase();
            this.getFollowUpFate();
            this.getSusceptibleDataFollowUser();
            //this.getSusceptibleDataFollow();
            this.viewReport(cidNumber);
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be  deleted, try again');
          }
        );
      }
    });
  }

  saveFollowUp() {
    const flashReport = new FlashReport();
    Object.assign(flashReport, this.followUpFormUser.value);
    if (this.followUpFormUser.value.followUpDate === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');

      return;
    } else if (this.followUpFormUser.value.sampleCollected === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');

      return;
    } else if (this.followUpFormUser.value.tentativeDiseaseId === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');

      return;
    } else if (this.followUpFormUser.value.probableSource === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');

      return;
    } else if (this.followUpFormUser.value.controlMeasures === '') {
      this.notificationService.openErrorSnackBar('Enter required fields');
      return;
    }
    flashReport.createdBy = this.credentialsService.credentials.userName;
    flashReport.outbreakId = this.outbreakDetails.outbreakId;
    flashReport.flashId = this.outbreakDetails.id;
    flashReport.reportStatus = this.reportStatus;
    flashReport.flag = 'Y';
    flashReport.followUp = this.followUpForm.value;
    flashReport.followUp = this.followUpFormUser.value;

    flashReport.userName = this.userDetails.userName;
    flashReport.centreId = this.userDetails.centre.id;
    flashReport.levelUserId = this.userDetails.levelUser.id;
    flashReport.jurisdiction = this.userDetails.jurisdiction;
    flashReport.fullName = this.userDetails.fullName;
    this.sharedService.saveFollowUp(flashReport).subscribe(
      (res) => {
        this.notificationService.openSuccessSnackBar('  Submitted Successfully ');
        this.registered = true;
        this.outbreakDetails = res;
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Submitted, please try again');
      }
    );
  }
}
