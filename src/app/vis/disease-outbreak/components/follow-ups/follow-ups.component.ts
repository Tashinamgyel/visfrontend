import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { POUTRY_AGE, FlashReport, ReportRequest, EmailData } from '@app/vis/shared/model/model';
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
import { AddFlashCaseComponent } from '../add-flash-case/add-flash-case.component';
import { AddFollowUpCaseComponentComponent } from '../add-follow-up-case-component/add-follow-up-case-component.component';
import { AddFollowUpComponent } from '../add-follow-up/add-follow-up.component';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { FollowUpSusceptibleComponent } from '../follow-up-susceptible/follow-up-susceptible.component';
import { EmailComponentComponent } from '../email-component/email-component.component';

@Component({
  selector: 'app-follow-ups',
  templateUrl: './follow-ups.component.html',
  styleUrls: ['./follow-ups.component.scss'],
})
export class FollowUpsComponent implements OnInit {
  public refreshData$ = new BehaviorSubject<boolean>(false);
  followUpForm: FormGroup;
  flashId: number;
  type: string;
  outbreakDetails: any;
  followUpDetails: any;
  flashCase: any;
  susceptible: any;
  ownerFollowUp: any;
  followUpCase: any;
  followUpFate: any;
  animalType: any = [];
  breeds: any = [];
  species: any = [];
  poultryAges = POUTRY_AGE;
  diseases: any;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  userName: boolean = true;
  flag: boolean = true;
  basis: BasisOfDiagnosis[];
  sampleCollected: boolean;
  laboratorys: Laboratory[];
  typeOfTest: TypeOfTest[];
  sampleType: DiseaseSampleType[];
  testResult: Tests[];
  farmingSystem: FarmingSystem[];
  followUp: any;
  public currentUser: Credentials;
  followUpSusceptible: any;
  public registered = false;
  public basicPanelOpenState: any;
  reportStatus: number;
  report: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  cid: number;
  view: boolean;
  maxDate = new Date();

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
    private notificationService: NotificationService
  ) {}

  tableData: any;
  ngOnInit(): void {
    this.initializefollowUpForm();
    this.populateForm();
    this.currentUser = this.credentialsService.credentials;
    this.route.queryParams.subscribe((params) => {
      this.flashId = params.flashId;
      this.reportStatus = params.reportStatus;
      this.report = params.report;
      if (this.report === 'Resolved') {
        this.flag = false;
      } else {
        this.flag = true;
      }
    });
    if (this.credentialsService.credentials.roleName === 'NCAH') {
      this.userName = true;
    } else {
      this.userName = false;
    }
    this.getTableData();
    this.initializeFirstFormGroup();
    this.initializeSecondFormGroup();
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

  initializefollowUpForm() {
    this.followUpForm = this.fb.group({
      outbreakId: new FormControl('', Validators.required),
      caseDate: new FormControl('', Validators.required),
      followUpDate: new FormControl('', Validators.required),
      followUpCases: new FormControl('', Validators.required),
      clinicalSigns: new FormControl(''),
      lesions: new FormControl(''),
      tentativeDiseaseId: new FormControl('', Validators.required),
      differentialDiagnosis: new FormControl(''),
      sampleCollected: new FormControl(''),
      finalBasisDiagnosisId: new FormControl(''),
      sampleId: new FormControl('', Validators.required),
      testId: new FormControl('', Validators.required),
      sampleIds: new FormControl('', Validators.required),
      dateSampleSent: new FormControl('', Validators.required),
      laboratoryId: new FormControl('', Validators.required),
      dateResultReceived: new FormControl('', Validators.required),
      resultId: new FormControl('', Validators.required),
      finalDiseaseId: new FormControl('', Validators.required),
      basisDiagnosisId: new FormControl('', Validators.required),
      diagnosingOfficer: new FormControl('', Validators.required),
      farmingId: new FormControl(''),
      lastVaccinationDate: new FormControl(''),
      probableSource: new FormControl(''),
      controlMeasures: new FormControl(''),
    });
  }

  initializeFirstFormGroup() {
    this.firstFormGroup = this.fb.group({
      cidNumber: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
      ),
      ownerName: new FormControl('',Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      //villageName: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      primaryDate: new FormControl('', Validators.required),
      farmingId: new FormControl(''),
      lastVaccinationDate: new FormControl(''),
      villageId: new FormControl(''),
      locality: new FormControl(''),
      ownershipStatus: new FormControl(''),
    });
  }
  initializeSecondFormGroup() {
    this.secondFormGroup = this.fb.group({});
  }

  changeSampleCollected() {
    var followUpFormEventValue = this.followUpForm.value.sampleCollected;
    this.sampleCollected = Number(followUpFormEventValue) === 1;
  }
  finalBasisDiagnosisIdd: number;
  getTableData() {
    this.sharedService.getfollowUpDetails(this.flashId, this.reportStatus).subscribe((res) => {
      this.outbreakDetails = res;
      this.followUp = res.followUp;
      var i = Number(this.followUp.length) - 1;
      if (this.followUp[i].finalBasisDiagnosis !== null) {
        this.followUpForm.get('finalBasisDiagnosisId').setValue(this.followUp[i].finalBasisDiagnosis.id);
      }
      this.followUpForm.patchValue({
        outbreakId: this.outbreakDetails.outbreakId,
        caseDate: this.outbreakDetails.caseDate,
        followUpDate: this.outbreakDetails.forwardDate,
        clinicalSigns: this.followUp[i].clinicalSigns,
        lesions: this.followUp[i].lesions,
        tentativeDiseaseId: this.followUp[i].tentativeDisease.id,
        sampleCollected: this.followUp[i].sampleCollected,
        probableSource: this.followUp[i].probableSource,
        controlMeasures: this.followUp[i].controlMeasures,
        differentialDiagnosis: this.followUp[i].differentialDiagnosis,
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
          basisDiagnosisId: this.followUp[i].basisDiagnosis.id,
          testId: this.followUp[i].test.id,
          diagnosingOfficer: this.followUp[i].diagnosingOfficer,
        });
      }
      this.changeSampleCollected();
      this.getOwnerData();
      this.getSusceptibleDataFollow();
    });
  }

  getOwnerData() {
    this.type = 'OwnerFollowUp';
    this.reportStatus = this.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, 0).subscribe((res) => {
      this.ownerFollowUp = res;
      this.dataSource2 = res;
      localStorage.removeItem('dataToPopulate');
      localStorage.removeItem('cid');
    });
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

  getSusceptibleDataFollow() {
    this.type = 'FollowUpSusceptible';
    this.reportStatus = this.reportStatus;
    this.sharedService.getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, 0).subscribe((res) => {
      this.followUpSusceptible = res;
      this.dataSource5 = res;
      // console.log(res, 'FollowUpSusceptible');
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

  openAddModal() {
    const dialogRef = this.dialog.open(AddFlashCaseComponent, {
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
    cases.createdBy = this.credentialsService.credentials.userName;
    cases.type = 'OwnerDetails';
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    cases.reportStatus = this.reportStatus;
    this.sharedService.saveFlashCaseOwner(cases).subscribe();
    localStorage.setItem('fetchedCID', JSON.stringify(this.firstFormGroup.get('cidNumber').value));
  }
  saveFlashCase(cases: Cases) {
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    cases.reportStatus = this.reportStatus;
    this.sharedService.saveFlashCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar(' Added successfully ');
        this.getFollowUpCase();
        this.getFollowUpFate();
        this.getSusceptibleDataFollow();
        this.viewReport(cases.cidNumber);
      },
      () => {
        this.notificationService.openErrorSnackBar('couldnot be Added, please try again');
      }
    );
  }

  viewReport(cidNumber: number) {
    localStorage.setItem('fetchedCID', JSON.stringify(cidNumber));
    this.view = true;
    this.type = 'FollowUpCase';
    this.reportStatus = this.reportStatus;
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
    this.reportStatus = this.reportStatus;
    this.sharedService
      .getFollowUpCaseDetails(this.flashId, this.type, this.reportStatus, cidNumber)
      .subscribe((res) => {
        this.followUpFate = res;
        this.dataSource7 = res;
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
            this.notificationService.openSuccessSnackBar('Deleted Successfully ');
            this.getOwnerData();
            this.getFollowUpCase();
            this.getFollowUpFate();
            this.getSusceptibleDataFollow();
            this.viewReport(cidNumber);
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be  deleted, try again');
          }
        );
      }
    });
  }
  saveFollowUp() {
    const flashReport = new FlashReport();
    Object.assign(flashReport, this.followUpForm.value);
    flashReport.createdBy = this.credentialsService.credentials.userName;
    flashReport.outbreakId = this.outbreakDetails.outbreakId;
    flashReport.flashId = this.outbreakDetails.id;
    flashReport.reportStatus = Number(this.reportStatus) + 1;
    flashReport.flag = 'N';
    flashReport.followUp = this.followUpForm.value;
    flashReport.userName = this.userDetails.userName;
    flashReport.centreId = this.userDetails.centre.id;
    flashReport.levelUserId = this.userDetails.levelUser.id;
    flashReport.jurisdiction = this.userDetails.jurisdiction;
    flashReport.fullName = this.userDetails.fullName;
    this.sharedService.saveFollowUp(flashReport).subscribe(
      (res) => {
        this.notificationService.openSuccessSnackBar(' Successfully sent for Follow up ');
        this.registered = true;
        this.outbreakDetails = res;
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be sent, please try again');
      }
    );
  }

  closeReport() {
    const flashReport = new FlashReport();
    Object.assign(flashReport, this.followUpForm.value);
    flashReport.createdBy = this.credentialsService.credentials.userName;
    flashReport.outbreakId = this.outbreakDetails.outbreakId;
    flashReport.flashId = this.outbreakDetails.id;
    flashReport.reportStatus = this.reportStatus;
    flashReport.flag = 'C';
    flashReport.followUp = this.followUpForm.value;
    flashReport.userName = this.userDetails.userName;
    flashReport.centreId = this.userDetails.centre.id;
    flashReport.levelUserId = this.userDetails.levelUser.id;
    flashReport.jurisdiction = this.userDetails.jurisdiction;
    flashReport.fullName = this.userDetails.fullName;
    this.sharedService.saveFollowUp(flashReport).subscribe(
      (res) => {
        this.notificationService.openSuccessSnackBar('Resolved Successfully');
        this.registered = true;
        this.outbreakDetails = res;
        this.router.navigate(['/followUp']);
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Resolved, please try again');
      }
    );
  }

  reportMail: any;
  emailData: any;
  sendMail() {
    const reportRequest = new ReportRequest();
    Object.assign(reportRequest, this.followUpForm.value);
    reportRequest.outbreakId = this.outbreakDetails.outbreakId;
    reportRequest.reportStatus = this.reportStatus;
    this.sharedService.getFollowUpMailData(reportRequest).subscribe((res) => {
      debugger
      this.reportMail = res;
      console.log(this.reportMail, 'zzzzzzzzzzzzzzzzzzz');
    });
    this.send(this.reportMail);
  }
  send(reportMail: any) { 
    const dialogRef = this.dialog.open(EmailComponentComponent, {
      width: '800px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) { 
        this.sendMaill(result);
      }
    });
  }

  sendMaill(emailData: EmailData) {
    emailData.flashEmailList = this.reportMail;
    this.sharedService.sendMail(emailData).subscribe(
      () => {
        console.log(emailData)
        this.notificationService.openSuccessSnackBar('Added successfully');
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }
}
