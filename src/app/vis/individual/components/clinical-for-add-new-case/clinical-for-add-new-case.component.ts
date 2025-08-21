import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
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
import { MasterService } from '@app/master-management/services/master.service';
import { CommonDialogComponent } from '@app/vis/common-dialog/common-dialog.component';
import { Clinical, MedicationData } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { ClinicalCertificateComponent } from '../clinical/clinical-certificate/clinical-certificate.component';

@Component({
  selector: 'app-clinical-for-add-new-case',
  templateUrl: './clinical-for-add-new-case.component.html',
  styleUrls: ['./clinical-for-add-new-case.component.scss'],
})
export class ClinicalForAddNewCaseComponent implements OnInit {
  medicationData: Observable<MedicationData[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  treatmentForm: FormGroup;
  medicationForm: FormGroup;
  clinical: Clinical[];
  procedures: Procedure[];
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
  unitId: number;
  stock: any;
  doseUnitId: any;
  flag: number;
  classEntity: any;
  medicineEntity: any;
  frequency: any;
  unit: any;
  public show = false;
  public buttonName: any = 'Show';
  conditionsId: number;
  tests: boolean;
  maxDate = new Date();
  treatmentDate: any;
  observation: any;
  type: string;
  diagnosticTest: ClinicalDiagnosticTest[];

  displayedColumns: string[] = [
    'slno',
    'classEntity',
    'medicineEntity',
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
    this.registrationId = this.registrationDetails['id'];
    this.patientId = this.registrationDetails['patientId'];
    this.speciesId = this.registrationDetails['species']['id'];

    this.populateForm();
    this.getMedicationData();
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormData'));

    if (registrationFormData != null) {
      this.formFillUp();
    }
  }
  populateForm() {
    this.masterService.loadConditions().subscribe((res) => (this.conditions = res));
    this.masterService.regCond(this.speciesId).subscribe((res) => (this.conditions = res['conditions']));
    this.masterService.loadSystem().subscribe((res) => (this.systems = res));
    this.masterService.loadProcedure().subscribe((res) => (this.procedures = res));
    this.masterService.loadFrequency().subscribe((res) => (this.dosageFreq = res));
    this.masterService.loadClinicalDiagnosticTest().subscribe((res) => (this.diagnosticTest = res));
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

  formFillUp() {
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormData'));
    this.treatmentForm.patchValue({
      registrationId: registrationFormData.registrationId,
      treatmentDate: registrationFormData.treatmentDate,
      anamnesisHistory: registrationFormData.anamnesisHistory,
      observation: registrationFormData.observation,
      conditionsId: registrationFormData.conditionsId,
      remarks: registrationFormData.remarks,
      advice: registrationFormData.advice,
      systemId: registrationFormData.systemId,
      clinicalCondition: registrationFormData.clinicalCondition,
      tests: registrationFormData.tests,
      diagnosticConditionsId: registrationFormData.diagnosticConditionsId,
      diagnosticSystemName: registrationFormData.diagnosticSystemName,
      differentialDiagnosis: registrationFormData.differentialDiagnosis,
      finalSystemsId: registrationFormData.finalSystemsId,
      finalConditionsId: registrationFormData.finalConditionsId,
      procedures: registrationFormData.procedures,
      clinicalTest: registrationFormData.clinicalTest,
      status: registrationFormData.status,
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editMedication(id: number) {
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
    const dialogRef = this.dialog.open(AddMedicationComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveMedication(result);
      }
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
            this.notificationService.openErrorSnackBar('Couldnot be Delete');
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
        this.notificationService.openErrorSnackBar('Couldnot be added');
      }
    );
  }

  initializeForm() {
    this.treatmentForm = this.fb.group({
      registrationId: new FormControl(''),
      treatmentDate: new FormControl('', Validators.required),
      anamnesisHistory: new FormControl('', Validators.required),
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
      systemName: new FormControl(''),
      clinicalTest: new FormControl(''),
      conditions: new FormControl(''),
    });

    this.medicationForm = this.fb.group({
      medication: this.fb.array([]),
    });
  }

  // getCondition(selectedValue: any) {
  //   this.conditions = selectedValue.conditions;
  //   this.service.getConditions(selectedValue.id).subscribe((response) => {
  //     this.conditions = response;
  //   });
  // }

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
    medicationData.patientId = this.patientId;
    medicationData.registrationId = this.registrationId;
    medicationData.flag = 1;
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.getMedicationData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added');
      }
    );
  }

  getMedicationData() {
    this.masterService.getMedication(this.registrationId).subscribe((res) => {
      this.dataSource.data = res;
      this.dewormingDataForSending = res;
      console.log(res, 'cccccccccccc');

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
      console.log(clinical, 'sss');

      if ((clinical.procedures = this.treatmentForm.value.procedures)) {
        clinical.procedures = this.treatmentForm.value.procedures.join(',');
      }

      if (this.treatmentForm.value.clinicalTest !== '') {
        clinical.clinicalTest = this.treatmentForm.value.clinicalTest.join(',');
      }
      if (this.treatmentForm.value.finalSystemsId == '') {
        clinical.finalSystemsId = this.treatmentForm.value.systemId;
        clinical.finalConditionsId = this.treatmentForm.value.conditionsId;
      }
      clinical.patientId = this.patientId;
      clinical.treatment = 'Clinical';
      if (type === 'FollowUp') {
        clinical.status = 'Ongoing';
      } else {
        clinical.status = 'Completed';
      }

      clinical.registrationId = this.registrationId;
      var medFormData = JSON.parse(localStorage.getItem('treatmentFormData'));
      var medDragtfData = JSON.parse(localStorage.getItem('medData'));
      clinical.medicationData = medDragtfData;
      console.log(medDragtfData);

      this.service.saveClinical(clinical).subscribe(
        () => {
          this.saveClinicals();
          this.notificationService.openSuccessSnackBar('Sent for Follow Up  ');
          this.router.navigate(['/', 'dashboard']);
        },

        () => {
          this.notificationService.openErrorSnackBar('Could not be Follow up');
        }
      );
    }
  }
  dewormingDataForSending: any;
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
      if ((clinical.procedures = this.treatmentForm.value.procedures)) {
        clinical.procedures = this.treatmentForm.value.procedures.join(',');
      }

      if (this.treatmentForm.value.clinicalTest !== '') {
        clinical.clinicalTest = this.treatmentForm.value.clinicalTest.join(',');
      }
      if (this.treatmentForm.value.finalSystemsId == '') {
        clinical.finalSystemsId = this.treatmentForm.value.systemId;
        clinical.finalConditionsId = this.treatmentForm.value.conditionsId;
      }
      clinical.patientId = this.patientId;
      clinical.treatment = 'Clinical';
      if (type === 'FollowUp') {
        clinical.status = 'Ongoing';
      } else {
        clinical.status = 'Completed';
      }

      clinical.registrationId = this.registrationId;
      var medFormData = JSON.parse(localStorage.getItem('medData'));
      clinical.medicationData = medFormData;
      //var medDaftData = JSON.parse(localStorage.getItem('medData'));
      clinical.medicationData = medFormData;
      this.service.saveClinical(clinical).subscribe(
        () => {
          // this.saveClinicals();
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

  printConditions: any = [];
  conditionFinal: any = [];
  finalConditions: any;
  printSystemName: string;
  printConditionsName: string;

  printPage() {
    // console.log(this.treatmentForm.value,"this.treatmentForm.value");

    this.masterService.loadConditionsById(this.treatmentForm.value.conditionsId).subscribe((response) => {
      this.printConditions = response;
      this.conditionData();
    });

    if (
      this.treatmentForm.value.status === 'Y'
      // != null ||
      // this.treatmentForm.value.finalSystemsId != 0 ||
      // this.treatmentForm.value.finalSystemsId != '' ||
      // this.treatmentForm.value.finalSystemsId == 'undefined'
    ) {
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
    const dialogRef = this.dialog.open(ClinicalCertificateComponent, {
      width: '800px',
      height: '100%',
      data: {
        printConditionsName: this.printConditions.conditions,
        printSystemName: this.printConditions.system.systemName,
        finalSystemName: this.conditionFinal.system.systemName,
        printFinalConditions: this.conditionFinal.conditions,
        clinicalData: this.treatmentForm.value,
        medicationData: this.dewormingDataForSending,
      },
    });
  }
  saveClinicalDraft() {
    // console.log('this.treatmentForm.value', this.treatmentForm.value);
    localStorage.setItem('treatmentFormData', JSON.stringify(this.treatmentForm.value));
    this.notificationService.openSuccessSnackBar('Successfully saved as Draft');
  }
}
