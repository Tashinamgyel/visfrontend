import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Gewogs, BasisOfDiagnosis, Cases, Dzongkhags } from '@app/master-management/models/master';
import { POUTRY_AGE, FlashReport, ReportRequest, FlashEmailList, EmailData } from '@app/vis/shared/model/model';
import { Credentials, CredentialsService } from '@app/auth';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { AddSusceptibleComponent } from '../add-susceptible/add-susceptible.component';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { AddFlashCaseComponent } from '../add-flash-case/add-flash-case.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmailComponentComponent } from '../email-component/email-component.component';

@Component({
  selector: 'app-flash-out-break-details',
  templateUrl: './flash-out-break-details.component.html',
  styleUrls: ['./flash-out-break-details.component.scss'],
})
export class FlashOutBreakDetailsComponent implements OnInit {
  public refreshData$ = new BehaviorSubject<boolean>(false);
  outBreakForm: FormGroup;
  //followUpForm: FormGroup;
  flashId: number;
  outbreakDetails: any;
  flashCase: any;
  susceptible: any;
  animalType: any = [];
  breeds: any = [];
  species: any = [];
  poultryAges = POUTRY_AGE;
  diseases: any;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  userName: boolean = true;
  basis: BasisOfDiagnosis[];
  public currentUser: Credentials;
  maxDate = new Date();
  public registered = false;
  //cid:number;
  userDetails: any;
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
    'delete',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  displayedColumns2: string[] = [
    'slno',
    'speciesName',
    'animalType',
    'susceptibleAnimals',
    //'edit',
    'delete',
  ];
  dataSource2 = new MatTableDataSource();

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
    this.populateForm();
    this.currentUser = this.credentialsService.credentials;
    this.route.queryParams.subscribe((params) => {
      this.flashId = params.flashId;
    });
    if (this.credentialsService.credentials.roleName === 'NCAH') {
      this.userName = true;
    } else {
      this.userName = false;
    }
    this.getTableData();
  }
  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
    });
    this.sharedService.loadDiseases().subscribe((response) => {
      this.diseases = response;
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

  getTableData() {
    this.sharedService.getOutbreakDetails(this.flashId).subscribe((res) => {
      this.outbreakDetails = res;
      debugger
      console.log("res",res);
      
      this.outBreakForm.patchValue({
        outbreakId: this.outbreakDetails.outbreakId,
        flashId: this.outbreakDetails.id,
        diseaseId: this.outbreakDetails.disease.id,
        notifiability: this.outbreakDetails.notifiability,
        ownerName: this.outbreakDetails.ownerName,
        dzongkhagId: this.outbreakDetails.dzongkhag.id,
        gewogName: this.outbreakDetails.gewog.gewogName,
        gewogId: this.outbreakDetails.gewog.id,
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
        controlMeasures: this.outbreakDetails.controlMeasures,
        contactName: this.outbreakDetails.contactName,
        mobileNumber: this.outbreakDetails.mobileNumber,
        //createdBy: this.outbreakDetails.createdBy,
        createdBy: this.outbreakDetails.fullName,
        locality: this.outbreakDetails.locality,
        villageId: this.outbreakDetails.village.id,
      });
      this.getGewogs(this.outbreakDetails.dzongkhag.id);
      this.getVillages(this.outbreakDetails.gewog.id);
    });
    this.getCaseData();
    this.getSusceptibleData();
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
      this.dataSource2 = res;
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
  initializeForm() {
    this.outBreakForm = this.fb.group({
      diseaseId: new FormControl('', Validators.required),
      notifiability: new FormControl(''),
      ownerName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl(''),
      gewogName: new FormControl(''),
      villageName: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      caseDate: new FormControl(''),
      reportDate: new FormControl(''),
      forwardDate: new FormControl(''),
      briefHistory: new FormControl(''),
      householdAffected: new FormControl(''),
      vaccinationDate: new FormControl(''),
      outbreakSource: new FormControl(''),
      controlMeasures: new FormControl(''),
      contactName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('',),
      createdBy: new FormControl(''),
      locality: new FormControl(''),
      gewogId: new FormControl(''),
      villageId: new FormControl(''),
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
        //console.log('result', result);
      }
    });
  }
  saveFlashCase(cases: Cases) {
    cases.outbreakId = this.outbreakDetails.outbreakId;
    cases.flashId = this.outbreakDetails.id;
    this.sharedService.saveFlashCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Submitted Successfully ');
        this.getCaseData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
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
            this.notificationService.openSuccessSnackBar('Deleted successfully');
            this.getTableData();
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be Deleted, try again');
          }
        );
      }
    });
  }
  saveFollowUpReport() {
    const flashReport = new FlashReport();
    Object.assign(flashReport, this.outBreakForm.value);
    flashReport.reportBy = this.credentialsService.credentials.userName;
    flashReport.outbreakId = this.outbreakDetails.outbreakId;
    flashReport.flashId = this.outbreakDetails.id;
    flashReport.gewogId = this.outbreakDetails.gewog.id;
    flashReport.reportStatus = 1;
    flashReport.flag = 'N';
    flashReport.userName = this.userDetails.userName;
    flashReport.centreId = this.userDetails.centre.id;
    flashReport.levelUserId = this.userDetails.levelUser.id;
    flashReport.jurisdiction = this.userDetails.jurisdiction;
    flashReport.fullName = this.userDetails.fullName;
    flashReport.createdBy = this.outbreakDetails.createdBy;
    this.sharedService.saveFollowUpReport(flashReport).subscribe(
      (res) => {


        this.notificationService.openSuccessSnackBar(' Successfully sent for Follow up');
        this.registered = true;
        this.outbreakDetails = res;
        console.log("sdsdsds",res)
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be added, please try again');
      }
    );
  }
  closeReport() {
    const flashReport = new FlashReport();
    Object.assign(flashReport, this.outBreakForm.value);
    flashReport.reportBy = this.credentialsService.credentials.userName;
    flashReport.outbreakId = this.outbreakDetails.outbreakId;
    flashReport.flashId = this.outbreakDetails.id;
    flashReport.gewogId = this.outbreakDetails.gewog.id;
    flashReport.reportStatus = 1;
    flashReport.flag = 'C';
    // flashReport.userName = this.userDetails.userName;
    flashReport.centreId = this.userDetails.centre.id;
    flashReport.levelUserId = this.userDetails.levelUser.id;
    flashReport.jurisdiction = this.userDetails.jurisdiction;
    flashReport.fullName = this.userDetails.fullName;
    flashReport.createdBy = this.outbreakDetails.fullName;
    this.sharedService.saveFollowUpReport(flashReport).subscribe(
      (res) => {
        this.notificationService.openSuccessSnackBar(' Successfully sent to Followup ');
        this.registered = true;
        this.outbreakDetails = res;
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Could not be sent to Followup, please try again');
      }
    );
  }
  report: any;
  emailData: any;
  sendMail() {
    const reportRequest = new ReportRequest();
    Object.assign(reportRequest, this.outBreakForm.value);
    reportRequest.outbreakId = this.outbreakDetails.outbreakId;
    this.sharedService.getFlashMailData(reportRequest).subscribe((res) => {
      this.report = res;
    });
    this.send(this.report);
  }

  send(report: any) {
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
    emailData.flashEmailList = this.report;
    this.sharedService.sendMail(emailData).subscribe(
    
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully');
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }
}
