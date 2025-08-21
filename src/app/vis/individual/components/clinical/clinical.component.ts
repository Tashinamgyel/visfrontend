import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clinical, MedicationData } from '@app/vis/shared/model/model';
import {
  AdminRoute,
  AnimalTypes,
  ClinicalDiagnosticTest,
  Conditions,
  Frequency,
  Procedure,
  Species,
  System,
} from '@app/master-management/models/master';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NotificationService } from '@app/@core/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { CommonDialogComponent } from '@app/vis/common-dialog/common-dialog.component';
import { ClinicalFollowupCertificateComponent } from './clinical-followup-certificate/clinical-followup-certificate.component';

@Component({
  selector: 'app-clinical',
  templateUrl: './clinical.component.html',
  styleUrls: ['./clinical.component.scss'],
})
export class ClinicalComponent implements OnInit {
  medicationData: Observable<MedicationData[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  treatmentForm: FormGroup;
  medicationForm: FormGroup;
  clinical: Clinical[];
  procedures: any[] = [];
  conditions: Conditions[];
  conditionsfnl: Conditions[];
  route: AdminRoute[];
  dosageFreq: Frequency[];
  species: Species[];
  systems: System[];
  animalTypes: AnimalTypes[];
  treatment: string;
  registrationId: number;
  patientId: string;
  speciesId: number;
  public show = false;
  public buttonName: any = 'Show';
  conditionsId: number;
  tests: boolean;
  maxDate = new Date();
  treatmentDate: any;
  observation: any;
  type: string;
  diagnosticTest: ClinicalDiagnosticTest[];
  public basicPanelOpenState: any;

  displayedColumns: string[] = [
    'slno',
    'classEntity',
    'medicineEntity',
    // 'composition',
    // 'presentation',
    'dosage',
    'unit',
    'route',

    'frequency',
    'duration',
    'edit',
    'delete',
  ];

  viewDetailsResponse: any;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() registrationDetails: any;
  @Input() editable = false;
  populateDataForClinical: any;
  registrationIdToSend: any;
  caseIdForOngoing: any;

  patientIDForCompleteFollowup: any;
  populateDataForClinicalLast: any;

  displayedColumns1: string[] = [
    'slno',
    'classEntity',
    'medicineEntity',
    // 'composition',
    // 'presentation',
    'dosage',
    'unit',
    'route',
    'duration',
    'frequency',
    'edit',
    'delete',
  ];

  dataSource1 = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private masterService: MasterService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    //this.registrationId = this.registrationDetails['id'];
    //this.patientId = this.registrationDetails['patientId'];
    //this.speciesId = this.registrationDetails['species']['id'];

    this.populateForm();
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormData'));
    if (registrationFormData != null) {
      this.formFillUp();
    }
    this.getMedicationData();
  }

  formFillUp() {
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormData'));
    this.registrationIdToSend = registrationFormData.registrationId;
    this.treatmentForm.patchValue({
      registrationId: registrationFormData.registrationId,
      treatmentDate: registrationFormData.treatmentDate,
      anamnesisHistory: registrationFormData.anamnesisHistory,
      observation: registrationFormData.observation,
      conditionsId: registrationFormData.conditionsId,
      remarks: registrationFormData.remarks,
      advice: registrationFormData.advice,
      systemName: registrationFormData.systemName,
      clinicalCondition: registrationFormData.clinicalCondition,
      testRequest: registrationFormData.testRequest,
      diagnosticConditionsId: registrationFormData.diagnosticConditionsId,
      diagnosticSystemName: registrationFormData.diagnosticSystemName,
      procedures: registrationFormData.procedures,
      clinicalTest: registrationFormData.clinicalTest,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editMedication(id: number) {
    var dataForMedication = {};
    dataForMedication['registrationId'] = this.populateDataForClinical.registrationId;
    dataForMedication['patientId'] = this.populateDataForClinical.patientId;
    const dialogRef = this.dialog.open(AddMedicationComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveMedication(result);
      }
    });
  }

  openAddModal() {
    var dataForMedication = {};
    dataForMedication['registrationId'] = this.populateDataForClinical.registrationId;
    dataForMedication['patientId'] = this.populateDataForClinical.patientId;
    localStorage.setItem('registrationAndPatient', JSON.stringify(dataForMedication));
    const dialogRef = this.dialog.open(AddMedicationComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.saveMedication(result);
    });
  }
  deleteMedication(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.service.deleteMedication(id).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Delete successfully');
            this.getMedicationData();
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be deleted, try again');
          }
        );
      }
    });
  }

  addMedication(medicationData: MedicationData) {
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }

  initializeForm() {
    this.treatmentForm = this.fb.group({
      registrationId: new FormControl(''),
      treatmentDate: new FormControl('', Validators.required),
      anamnesisHistory: new FormControl(''),
      observation: new FormControl('', Validators.required),
      systemId: new FormControl('', Validators.required),
      conditionsId: new FormControl('', Validators.required),
      finalSystemsId: new FormControl('', Validators.required),
      finalConditionsId: new FormControl('', Validators.required),
      procedures: new FormControl(''),
      remarks: new FormControl(''),
      advice: new FormControl('', Validators.required),
      clinicalCondition: new FormControl('', Validators.required),
      testRequest: new FormControl(''),
      diagnosticConditionsId: new FormControl(''),
      diagnosticSystemName: new FormControl(''),
      differentialDiagnosis: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      clinicalTest: new FormControl(''),
    });

    this.caseIdForOngoing = JSON.parse(localStorage.getItem('caseIdForOngoing'));

    this.medicationForm = this.fb.group({
      medication: this.fb.array([]),
    });

    this.populateForm();

    this.getMedicationData();
    this.getMedicationHistory();
  }

  populateForm() {
    //this.masterService.regCond(this.speciesId).subscribe((res) => (this.conditions = res['conditions']));

    this.masterService.loadSystem().subscribe((res) => (this.systems = res));
    this.masterService.loadProcedure().subscribe((res) => (this.procedures = res));
    this.masterService.loadFrequency().subscribe((res) => (this.dosageFreq = res));
    this.masterService.loadConditions().subscribe((res) => (this.conditions = res));
    this.masterService.loadClinicalDiagnosticTest().subscribe((res) => (this.diagnosticTest = res));

    this.populateOngoingData();
  }

  populateOngoingData() {
    var getData = JSON.parse(localStorage.getItem('sendingDataToOngoing'));
    this.populateDataForClinical = JSON.parse(localStorage.getItem('sendingDataToOngoing'));
    if (this.populateDataForClinical.clinicalTest != '') {
      // this.treatmentForm.value.status = 2;
      this.treatmentForm.patchValue({
        status: 'Y',
      });
    } else {
      //  this.treatmentForm.value.status = 1;
      this.treatmentForm.patchValue({
        status: 'N',
      });
    }
    const procedures = this.populateDataForClinical.procedures.split(',');
    const clinicalTest = this.populateDataForClinical.clinicalTest.split(',');
    this.treatmentForm.patchValue({
      anamnesisHistory: this.populateDataForClinical.anamnesisHistory,
      observation: this.populateDataForClinical.observation,
      systemId: this.populateDataForClinical.systems.id,
      conditionsId: this.populateDataForClinical.conditions.id,
      finalSystemsId: this.populateDataForClinical.finalSystems.id,
      finalConditionsId: this.populateDataForClinical.finalConditions.id,
      differentialDiagnosis: this.populateDataForClinical.differentialDiagnosis,
      procedures: procedures,
      clinicalTest: clinicalTest,
      remarks: this.populateDataForClinical.remarks,
      advice: this.populateDataForClinical.advice,
    });

    this.getMedicationData();
  }

  getSystemDtls(conditionsId: number) {
    this.masterService.getSystem(conditionsId).subscribe((response) => {
      this.treatmentForm.patchValue({
        systemName: response.system.systemName,
      });
    });
  }

  getConditions(systemId: number) {
    this.service.getConditions(systemId).subscribe((response) => {
      this.conditions = response;
    });
  }

  getConditionFinal(systemId: number) {
    this.service.getConditions(systemId).subscribe((response) => {
      this.conditionsfnl = response;
    });
  }

  

  getSystemDiagnostic(diagnosticConditionsId: number) {
    this.masterService.getSystem(diagnosticConditionsId).subscribe((response) => {
      this.treatmentForm.patchValue({
        diagnosticSystemName: response.system.systemName,
      });
    });
  }

  changeTreatment(event: MatRadioChange) {
    if (event.value === 'Clinical') {
      this.treatment = 'Clinical';
    } else if (event.value === 'Sterilization') {
      this.treatment = 'Sterilization';
    } else if (event.value === 'Deworming') {
      this.treatment = 'Deworming';
    } else if (event.value === 'Vaccination') {
      this.treatment = 'Vaccination';
    }
  }

  saveMedication(medicationData: MedicationData) {
    medicationData.patientId = this.populateDataForClinical.patientId;
    medicationData.registrationId = this.populateDataForClinical.registrationId;
    medicationData.flag = 1;

    
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully');
        this.getMedicationData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be added');
      }
    );
  }

  updateMedication(medicationData: MedicationData) {
    medicationData.patientId = this.populateDataForClinical.patientId;
    medicationData.registrationId = this.populateDataForClinical.registrationId;
    medicationData.flag = 1;
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated successfully');
        this.getMedicationData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be updated');
      }
    );
  }

  getMedicationHistory() {
    this.masterService.getMedicationFollowup(this.populateDataForClinical.registrationId).subscribe((res) => {
      this.dataSource1.data = res;
      //localStorage.setItem('medDataee', JSON.stringify(this.dataSource.data));
    });
  }
  medicineDetails: any;
  getMedicationData() {
    //this.masterService.getMedicationFollowup(this.populateDataForClinical.registrationId).subscribe((res) => {
    this.masterService.getMedication(this.populateDataForClinical.registrationId).subscribe((res) => {
      this.dataSource.data = res;
      this.medicineDetails = res;
      localStorage.setItem('medData', JSON.stringify(this.dataSource.data));
    });
  }

  saveClinical(type: string) {
    if (
      this.treatmentForm.value.treatmentDate === '' &&
      this.treatmentForm.value.anamnesisHistory === '' &&
      this.treatmentForm.value.observation === '' &&
      this.treatmentForm.value.systemId === '' &&
      this.treatmentForm.value.conditionsId === ''
    ) {
      this.notificationService.openErrorSnackBar('Enter all the datas');
    } else {
      const clinical = new Clinical();
      Object.assign(clinical, this.treatmentForm.value);
      if(clinical.procedures = this.treatmentForm.value.procedures){
        clinical.procedures = this.treatmentForm.value.procedures.join(',');
      }
      // clinical.procedures = this.treatmentForm.value.procedures.join(',');
      if (this.treatmentForm.value.clinicalTest !== '') {
        clinical.clinicalTest = this.treatmentForm.value.clinicalTest.join(',');
      }
      // if (this.treatmentForm.value.procedures == '') {
      //   clinical.procedures = this.treatmentForm.value.procedures.join(',');
      // }

      clinical.treatment = 'Clinical';
      if (type === 'FollowUp') {
        clinical.status = 'Ongoing';
      } else {
        clinical.status = 'Completed';
      }
      if (this.treatmentForm.value.Procedures === '0') {
        return;
      } else {
      }
      debugger
      clinical.registrationId = this.populateDataForClinical.registrationId;
      clinical.patientId = this.populateDataForClinical.patientId;
      clinical.caseId = this.caseIdForOngoing.id;
      var medFormData = JSON.parse(localStorage.getItem('medData'));
      clinical.medicationData = medFormData;
      this.service.saveClinicalFollowUp(clinical).subscribe(
        () => {
          localStorage.removeItem('treatmentFormData');
          this.notificationService.openSuccessSnackBar('Sent for Follow up');
          this.router.navigate(['/', 'dashboard']);
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not be Follow up');
        }
      );
    }
  }

  mediacalDeatils: any;
  saveClinicalCompleted(type: string) {
    if (
      this.treatmentForm.value.treatmentDate === '' &&
      this.treatmentForm.value.anamnesisHistory === '' &&
      this.treatmentForm.value.observation === '' &&
      this.treatmentForm.value.systemId === '' &&
      this.treatmentForm.value.conditionsId === ''
    ) {
      this.notificationService.openErrorSnackBar('Enter all the datas');
    } else {
      const clinical = new Clinical();
      Object.assign(clinical, this.treatmentForm.value);
      if(clinical.procedures = this.treatmentForm.value.procedures){
        clinical.procedures = this.treatmentForm.value.procedures.join(',');
      }
      // clinical.procedures = this.treatmentForm.value.procedures.join(',');
      if (this.treatmentForm.value.clinicalTest !== '') {
        clinical.clinicalTest = this.treatmentForm.value.clinicalTest.join(',');
      }
      if (this.treatmentForm.value.procedures !== '') {
        clinical.procedures = this.treatmentForm.value.procedures.join(',');
      }

      clinical.treatment = 'Clinical';
      if (type === 'FollowUp') {
        clinical.status = 'Ongoing';
      } else {
        clinical.status = 'Completed';
      }
      if (this.treatmentForm.value.Procedures === '0') {
        return;
      } else {
      }
      clinical.registrationId = this.populateDataForClinical.registrationId;
      clinical.patientId = this.populateDataForClinical.patientId;
      clinical.caseId = this.caseIdForOngoing.id;
      var medFormData = JSON.parse(localStorage.getItem('medData'));
      clinical.medicationData = medFormData;
      this.service.saveClinicalFollowUp(clinical).subscribe(
        () => {
          localStorage.removeItem('treatmentFormData');
          this.notificationService.openSuccessSnackBar('Completed successfully');
          this.router.navigate(['/', 'dashboard']);
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not be Follow up');
        }
      );
    }
  }

  saveClinicals() {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '800px',
      data: {
        patientID: this.patientId,
      },
    });
  }
  printSytem: any;
  printConditions: any;
  printSytemFinal: any;
  conditionFinal: any;
  system: System[];
  printPage() {

    console.log("this.treatmentForm.value.status",this.treatmentForm.value.status);
    
    this.masterService.loadConditionsById(this.treatmentForm.value.conditionsId).subscribe((response) => {
      this.printConditions = response;
      this.conditionData();
    });
    if (this.treatmentForm.value.status === 'Y') {
      this.masterService.loadConditionsById(this.treatmentForm.value.finalConditionsId).subscribe((response) => {
        this.conditionFinal = response;
        this.conditionData();
      });
    } else {
      this.masterService.loadConditionsById(this.treatmentForm.value.conditionsId).subscribe((response) => {
        this.conditionFinal = response;
        this.conditionData();
      });
    }
  }
  conditionData() {
    const dialogRef = this.dialog.open(ClinicalFollowupCertificateComponent, {
      width: '800px',
      height: '100%',
      data: {
        printConditionsName: this.printConditions.conditions,
        printSystemName: this.printConditions.system.systemName,
        
        finalSystemName: this.conditionFinal.system.systemName,
        printFinalConditions: this.conditionFinal.conditions,

        clinicalData: this.treatmentForm.value,
        medicationData: this.medicineDetails,
      },
    });
  }

  saveClinicalDraft() {
    localStorage.setItem('treatmentFormData', JSON.stringify(this.treatmentForm.value));
    this.notificationService.openSuccessSnackBar('successfully saved as draft');
  }
}
