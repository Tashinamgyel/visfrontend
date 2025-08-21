import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Gewogs, POUTRY_AGE, FlashReport } from '@app/vis/shared/model/model';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { BehaviorSubject } from 'rxjs';
import { AddPoultryComponent } from '../add-poultry/add-poultry.component';
import {
  Cases,
  Laboratory,
  TypeOfTest,
  DiseaseSampleType,
  Tests,
  FarmingSystem,
  BasisOfDiagnosis,
} from '@app/master-management/models/master';
import { AddAnimalComponent } from '../add-animal/add-animal.component';
import { AddSusceptibleComponent } from '../add-susceptible/add-susceptible.component';
import { AddFollowUpComponent } from '../add-follow-up/add-follow-up.component';
import { MatRadioChange } from '@angular/material/radio';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService, Credentials } from '@app/auth';
import { AddOwnerComponent } from '../add-owner/add-owner.component';

@Component({
  selector: 'app-outbreak-detail',
  templateUrl: './outbreak-detail.component.html',
  styleUrls: ['./outbreak-detail.component.scss'],
})
export class OutbreakDetailComponent implements OnInit {
  public refreshData$ = new BehaviorSubject<boolean>(false);
  outBreakForm: FormGroup;
  followUpForm: FormGroup;
  flashId: number;
  outbreakDetails: any;
  animalType: any = [];
  breeds: any = [];
  species: any = [];
  gewogs: Gewogs[];
  poultryAges = POUTRY_AGE;
  diseases: any;
  sampleCollected: boolean;
  laboratorys: Laboratory[];
  typeOfTest: TypeOfTest[];
  sampleType: DiseaseSampleType[];
  testResult: Tests[];
  farmingSystem: FarmingSystem[];
  followUp: any;
  basis: BasisOfDiagnosis[];
  public currentUser: Credentials;
  maxDate = new Date();

  public registered = false;

  displayedColumns: string[] = ['slno', 'animalType', 'age', 'breedName', 'male', 'female', 'total', 'edit', 'delete'];
  displayedOtherCaseColumns: string[] = [
    'slno',
    'animalType',
    'breedName',
    'age',
    'male',
    'female',
    'total',
    'status',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource();

  // displayedColumns1: string[] = [
  //   'slno',
  //   'speciesName',
  //   'animalType',
  //   'breedName',
  //   'age',
  //   'male',
  //   'female',
  //   'total',
  //   'status',
  //   'edit',
  //   'delete',
  // ];
  // dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['slno', 'speciesName', 'animalType', 'susceptibleAnimals', 'edit', 'delete'];
  dataSource2 = new MatTableDataSource();

  displayedColumns3: string[] = ['slno', 'fate', 'speciesName', 'animalTypeId', 'numbers', 'edit', 'delete'];
  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = [
    'slno',
    'cidNumber',
    'ownerName',
    'dzongkhagName',
    'gewogName',
    'villageName',
    'latitude',
    'longitude',
    'primaryDate',
    'delete',
  ];
  dataSource4 = new MatTableDataSource();

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
    this.initializeForm();
    this.initializeFormFollowUp();
    this.populateForm();
    this.currentUser = this.credentialsService.credentials;
    this.route.queryParams.subscribe((params) => {
      this.flashId = params.flashId;
    });
    this.getTableData();
  }
  populateForm() {
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
  }

  changeSampleCollected(event: MatRadioChange) {
    this.sampleCollected = Number(event.value) === 1;
  }

  getTableData() {
    this.sharedService.getOutbreakDetails(this.flashId).subscribe((res) => {
      this.followUp = res.followUp;
      this.outbreakDetails = res;
      //  this.followUp = res.followUp;
      this.dataSource.data = res.flashCasePoultry;
      this.dataSource2.data = res.susceptible;
      this.dataSource3.data = res.fate;
      this.dataSource4.data = res.ownerDetails;
      this.outBreakForm.patchValue({
        outbreakId: this.outbreakDetails.outbreakId,
        flashId: this.outbreakDetails.id,
        diseaseName: this.outbreakDetails.disease.diseaseName,
        notifiability: this.outbreakDetails.notifiability,
        ownerName: this.outbreakDetails.ownerName,
        dzongkhagName: this.outbreakDetails.dzongkhag.dzongkhagName,
        gewogName: this.outbreakDetails.gewog.gewogName,
        villageName: this.outbreakDetails.villageName,
        latitude: this.outbreakDetails.latitude,
        longitude: this.outbreakDetails.longitude,
        caseDate: this.outbreakDetails.caseDate,
        reportDate: this.outbreakDetails.reportDate,
        forwardDate: this.outbreakDetails.forwardDate,
        briefHistory: this.outbreakDetails.briefHistory,
        householdAffected: this.outbreakDetails.householdAffected,
        vaccinationDate: this.outbreakDetails.vaccinationDate,
        outbreakSource: this.outbreakDetails.outbreakSource,
        preventionCase: this.outbreakDetails.controlMeasures,
        name: this.outbreakDetails.contactName,
        mobileNumber: this.outbreakDetails.mobileNumber,
        reporterName: this.outbreakDetails.createdBy,
      });
      this.followUpForm.patchValue({
        clinicalSigns: this.followUp[0].clinicalSigns,
        followUpDate: this.followUp[0].followUpDate,
        followupCases: this.followUp[0].followupCases,
        lesions: this.followUp[0].lesions,
        tentativeDiseaseId: this.followUp[0].tentativeDisease.id,
        sampleCollected: this.followUp[0].sampleCollected,
        sampleId: this.followUp[0].sample.id,
        dateSampleSent: this.followUp[0].dateSampleSent,
        laboratoryId: this.followUp[0].laboratory.id,
        dateResultReceived: this.followUp[0].dateResultReceived,
        resultId: this.followUp[0].result.id,
        finalDiseaseId: this.followUp[0].finalDisease.id,
        basisDiagnosisId: this.followUp[0].basisDiagnosis.id,
        diagnosingOfficer: this.followUp[0].diagnosingOfficer,
        farmingId: this.followUp[0].farm.Id,
        lastVaccinationDate: this.followUp[0].lastVaccinationDate,
        probableSource: this.followUp[0].probableSource,
        controlMeasures: this.followUp[0].controlMeasures,
        differentialDiagnosis: this.followUp[0].differentialDiagnosis,
        testId: this.followUp[0].test.id,
      });
    });
  }

  getGewogs(dzongkhagId: number) {
    this.sharedService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  initializeForm() {
    this.outBreakForm = this.fb.group({
      diseaseName: new FormControl('', Validators.required),
      notifiability: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      dzongkhagName: new FormControl('', Validators.required),
      gewogName: new FormControl('', Validators.required),
      villageName: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      caseDate: new FormControl('', Validators.required),
      reportDate: new FormControl('', Validators.required),
      forwardDate: new FormControl('', Validators.required),
      briefHistory: new FormControl('', Validators.required),
      householdAffected: new FormControl('', Validators.required),
      vaccinationDate: new FormControl('', Validators.required),
      outbreakSource: new FormControl('', Validators.required),
      preventionCase: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      reporterName: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),

      //followup
      // followUpDate: new FormControl('', Validators.required),
      // followupCases: new FormControl('', Validators.required),
      // clinicalSigns: new FormControl('', Validators.required),
      // lesions: new FormControl('', Validators.required),
      // tentativeDiseaseId: new FormControl('', Validators.required),
      // differentialDiagnosis: new FormControl('', Validators.required),
      // sampleCollected: new FormControl(''),
      // sampleId : new FormControl('', Validators.required),
      // testId: new FormControl('', Validators.required),
      // sampleIds: new FormControl('', Validators.required),
      // dateSampleSent: new FormControl('', Validators.required),
      // laboratoryId: new FormControl('', Validators.required),
      // dateResultReceived: new FormControl('', Validators.required),
      // resultId: new FormControl('', Validators.required),
      // finalDiseaseId: new FormControl('', Validators.required),
      // basisDiagnosisId: new FormControl('', Validators.required),
      // diagnosingOfficer: new FormControl('', Validators.required),
      // farmingId: new FormControl('', Validators.required),
      // lastVaccinationDate: new FormControl('', Validators.required),
      // probableSource: new FormControl('', Validators.required),
      // controlMeasures: new FormControl('', Validators.required),
    });
  }
  initializeFormFollowUp() {
    this.followUpForm = this.fb.group({
      followUpDate: new FormControl('', Validators.required),
      followupCases: new FormControl('', Validators.required),
      clinicalSigns: new FormControl('', Validators.required),
      lesions: new FormControl('', Validators.required),
      tentativeDiseaseId: new FormControl('', Validators.required),
      differentialDiagnosis: new FormControl('', Validators.required),
      sampleCollected: new FormControl(''),
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
      farmingId: new FormControl('', Validators.required),
      lastVaccinationDate: new FormControl('', Validators.required),
      probableSource: new FormControl('', Validators.required),
      controlMeasures: new FormControl('', Validators.required),
    });
  }

  editReport(id: number) {
    const dialogRef = this.dialog.open(AddAnimalComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
      }
    });
  }
  editAnimal(id: number) {
    const dialogRef = this.dialog.open(AddAnimalComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
      }
    });
  }

  editPoultry(id: number) {
    const dialogRef = this.dialog.open(AddPoultryComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
      }
    });
  }

  editSusceptable(id: number) {
    const dialogRef = this.dialog.open(AddSusceptibleComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddPoultryComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
        console.log('result', result);
      }
    });
  }
  openAddModalAnimal() {
    const dialogRef = this.dialog.open(AddAnimalComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
        console.log('result', result);
      }
    });
  }

  openAddModalSusceptible() {
    const dialogRef = this.dialog.open(AddSusceptibleComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
        console.log('result', result);
      }
    });
  }

  openAddModalFate() {
    const dialogRef = this.dialog.open(AddFollowUpComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
        console.log('result', result);
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
        this.saveCase(result);
      }
    });
  }

  openAddModalOwner() {
    const dialogRef = this.dialog.open(AddOwnerComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveCase(result);
      }
    });
  }

  saveCase(cases: Cases) {
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    this.sharedService.saveCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.getTableData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  deleteReport(id: number, type: string) {
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
            this.notificationService.openSuccessSnackBar('Deleted Successfully');
            this.getTableData();
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be deleted, try again');
          }
        );
      }
    });
  }

  saveFollowUpReport() {
    const flashReport = new FlashReport();
    Object.assign(flashReport, this.outBreakForm.value);
    flashReport.createdBy = this.credentialsService.credentials.userName;
    flashReport.outbreakId = this.outbreakDetails.outbreakId;
    flashReport.flashId = this.outbreakDetails.id;
    flashReport.followUp = this.followUpForm.value;
    this.sharedService.saveFollowUpReport(flashReport).subscribe(
      (res) => {
        this.notificationService.openSuccessSnackBar('Submitted Successfully ');
        this.registered = true;
        this.outbreakDetails = res;
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be added, please try again');
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
      //   flashReport.followUp = this.followUpForm.value;
      //   this.sharedService.sendMail(flashReport).subscribe(
      //     () => {
      //       this.notificationService.openSuccessSnackBar('Send successfully');
      //       this.router.navigate(['/', 'dashboard']);
      //     },
      //     () => {
      //       this.notificationService.openErrorSnackBar('Couldnot be send , try again');
      //     }
      //   );
      // }
    });
  }
}
