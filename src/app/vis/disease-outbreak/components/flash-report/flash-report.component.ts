import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FlashReport,
  NOTCH_STATUS,
  POULTRY_TYPE,
  POUTRY_AGE,
  OTHER_AGE,
  FlashCase,
  FlashSuceptible,
} from '@app/vis/shared/model/model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dzongkhags, Gewogs, Cases } from '@app/master-management/models/master';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { NotificationService } from '@core';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddFlashCaseComponent } from '../add-flash-case/add-flash-case.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddSusceptibleComponent } from '../add-susceptible/add-susceptible.component';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { sum } from 'lodash';
import { CommonDialogComponent } from '@app/vis/common-dialog/common-dialog.component';
import { cloneNode } from '@babel/types';

@Component({
  selector: 'app-flash-report',
  templateUrl: './flash-report.component.html',
  styleUrls: ['./flash-report.component.scss'],
})
export class FlashReportComponent implements OnInit {
  public registered = false;
  flashForm: FormGroup;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  dzongkhagId: number;
  diseaseId: number;
  diseases: any;
  minDate = new Date();
  maxDate = new Date();
  outbreakoutId: any;

  flashCaseDetails: any;
  outbreakId = '';
  @Input() editable = false;
  otherAge = OTHER_AGE;
  poultryAges = POUTRY_AGE;
  poultryType = POULTRY_TYPE;
  notchStatus = NOTCH_STATUS;
  otherAnimalAges = OTHER_AGE;
  flashCase: FlashCase[];
  flashSuceptible: FlashSuceptible[];
  villages: any;

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
    'edit',
    'delete',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['slno', 'speciesName', 'animalType', 'susceptibleAnimals', 'edit', 'delete'];
  dataSource1 = new MatTableDataSource();

  death: any;
  cases: any;

  countForDeath: any = [];
  countForCases: any = [];
  userDetails: any;
  flashReport: any;
  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private sharedService: SharedService,
    private masterService: MasterService,
    private router: Router,
    private dialog: MatDialog,
    private credentialsService: CredentialsService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
    this.outbreakId;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initializeForm() {
    this.flashForm = this.fb.group({
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      villageName: new FormControl(''),
      villageId: new FormControl(null),
      diseaseId: new FormControl('', Validators.required),
      briefHistory: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      outbreakId: new FormControl(''),
      ownerName: new FormControl('', Validators.required),
      caseDate: new FormControl('', Validators.required),
      reportDate: new FormControl(''),
      forwardDate: new FormControl(''),
      notifiability: new FormControl(''),
      householdAffected: new FormControl(''),
      vaccinationDate: new FormControl(''),
      reporterName: new FormControl(''),
      outbreakSource: new FormControl(''),
      contactName: new FormControl(''),
      controlMeasures: new FormControl('', Validators.required),
      locality: new FormControl(''),
      mobileNumber: new FormControl(''),
      preventionCase: new FormControl('', Validators.required),
    });

    this.getCaseData('flashCases');
  }

  populateForm() {
    this.masterService.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
    });

    this.sharedService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.sharedService.loadDiseases().subscribe((response) => {
      this.diseases = response;
    });
  }
  getGewogs(dzongkhagId: number) {
    this.flashForm.get('gewogId').reset();
    this.sharedService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }

  getVillage(gewogId: number) {
    this.sharedService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }
  getNotifiability(diseaseId: number) {
    this.sharedService.getNotifiability(diseaseId).subscribe((response) => {
      this.flashForm.patchValue({
        notifiability: response.notifiable,
      });
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

  editFlashCase(id: number) {
    const dialogRef = this.dialog.open(AddFlashCaseComponent, {
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
    this.sharedService.saveFlashCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.getCaseData('flashCases');
      },
      () => {
        this.notificationService.openErrorSnackBar(' Could not be addec, please try again');
      }
    );
  }

  getCaseData(type: string) {
    debugger;
    this.countForDeath = [];
    this.countForCases = [];
    this.sharedService.getFlashCase(this.credentialsService.credentials.userName, type).subscribe((res) => {
      this.dataSource.data = res;
      this.flashCase = res;
      //console.log(res,"resres");

      for (let i = 0; i < res.length; i++) {
        if (res[i].status === 'Dead') {
          var total = res[i].total;
          this.countForDeath.push(total);
        } else if (res[i].status === 'Live Case') {
          var total = res[i].total;
          this.countForCases.push(total);
        }
      }
      this.death = sum(this.countForDeath);
      this.cases = sum(this.countForCases);
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
        this.saveFlashSusceptible(result);
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
        this.saveFlashSusceptible(result);
      }
    });
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
            this.getCaseData('flashCases');
            this.getFlashSusceptibleData();
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be deleted, please try again');
          }
        );
      }
    });
  }

  saveFlashSusceptible(cases: Cases) {
    this.sharedService.saveFlashCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully');
        this.getFlashSusceptibleData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }

  getFlashSusceptibleData() {
    this.sharedService.getFlashSusceptibleData(this.credentialsService.credentials.userName).subscribe((res) => {
      this.dataSource1.data = res;
      this.flashSuceptible = res;
    });
  }
  outbreakIds: any;

  saveFlashReport() {
    localStorage.removeItem('dataToPopulate');
    const flashReport = new FlashReport();
    debugger;
    Object.assign(flashReport, this.flashForm.value);
    flashReport.createdBy = this.credentialsService.credentials.userName;
    flashReport.flashCase = this.flashCase;
    flashReport.flashSuceptible = this.flashSuceptible;
    flashReport.userName = this.userDetails.userName;
    flashReport.centreId = this.userDetails.centre.id;
    flashReport.levelUserId = this.userDetails.levelUser.id;
    flashReport.jurisdiction = this.userDetails.jurisdiction;
    flashReport.fullName = this.userDetails.fullName;
    this.registered = false;

    if (flashReport.villageId === null) {
      flashReport.villageId = 0;
    }
    if (
      this.flashForm.value.diseaseId === '' ||
      this.flashForm.value.latitude === '' ||
      this.flashForm.value.longitude === '' ||
      this.flashForm.value.householdAffected === '' ||
      // this.flashForm.value.reportDate === '' ||
      this.flashForm.value.caseDate === '' ||
      this.flashForm.value.dzongkhagId === '' ||
      this.flashForm.value.controlMeasures === '' ||
      this.flashForm.value.briefHistory === ''
    ) {
      this.notificationService.openErrorSnackBar('Enter all required fields');
      return;
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          title: 'Confirmation',
          message: 'Do you want to submit flash Report?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          debugger;
          this.sharedService.saveFlashReport(flashReport).subscribe(
            (response) => {
              debugger;
              const res = JSON.parse(JSON.stringify(response));
              this.outbreakIds = res.outbreakId;
              this.saveFlashReports();
              this.notificationService.openSuccessSnackBar('Submitted Successfully');
              this.flashCaseDetails = res;
              console.log('res', res);

              this.router.navigate(['/', 'dashboard']);
            },
            () => {
              this.notificationService.openErrorSnackBar('Could not be Added, please try again');
            }
          );
        } else {
          dialogRef.close();
        }
      });
    }
  }

  printPage() {
    window.print();
  }

  saveFlashReports() {
    this.outbreakId = this.outbreakIds;
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '800px',
      data: {
        outbreakId: this.outbreakIds,
      },
    });
  }
}
