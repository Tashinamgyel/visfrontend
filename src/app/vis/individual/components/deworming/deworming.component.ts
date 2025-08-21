import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clinical, MedicationData } from '@app/vis/shared/model/model';
import {
  AdminRoute,
  AnimalTypes,
  Conditions,
  DewormingCondition,
  DewormingDiagnosticTest,
  Frequency,
  Procedure,
  Species,
  System,
  TypeOfTest,
} from '@app/master-management/models/master';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { NotificationService } from '@core';
import { MasterService } from '@app/master-management/services/master.service';
import { NavigationExtras, Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AddMedicationDewormingComponent } from '../add-medication-deworming/add-medication-deworming.component';

@Component({
  selector: 'app-deworming',
  templateUrl: './deworming.component.html',
  styleUrls: ['./deworming.component.scss'],
})
export class DewormingComponent implements OnInit {
  medicationData: Observable<MedicationData[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  treatmentForm: FormGroup;
  clinical: Clinical;
  procedures: Procedure[];
  conditions: Conditions[];
  route: AdminRoute[];
  dosageFreq: Frequency[];
  species: Species[];
  animalTypes: AnimalTypes[];
  treatment: string;
  registrationId: number;
  patientId: string;
  speciesId: number;
  systems: System[];
  classes: any = [];
  medicines: any = [];
  medicinessDtls: any = [];
  conditionsId: number;
  tests: boolean;
  maxDate = new Date();
  type: string;
  diagnosticTest: DewormingDiagnosticTest[];
  disabled: boolean;
  actionType: string;
  id: any;
  petRegistrationNumber: string;

  dewormingCond: DewormingCondition[];

  displayedColumns: string[] = [
    'slno',
    'classEntity',
    'medicineEntity',
    // 'composition',
    // 'presentation',
    'dosage',
    'unit',
    'route',
    // 'doseUnits',
    'frequency',
    'duration',
    'edit',
    'delete',
  ];

  dataSource = new MatTableDataSource();

  @Input() registrationDetails: any;
  @Input() editable = false;
  constructor(
    private fb: FormBuilder,
    private service: SharedService,

    private masterService: MasterService,
    private dialog: MatDialog,

    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.populateForm();

    this.initializeForm();
    this.treatmentForm.patchValue({
      dewomingConditionId: new FormControl(''),
    });

    this.registrationId = this.registrationDetails['id'];
    this.patientId = this.registrationDetails['patientId'];

    // console.log(this.registrationDetails, 'this.registrationDetails');
    if (this.registrationDetails['petRegistrationNumber'] !== undefined) {
      this.petRegistrationNumber = this.registrationDetails['petRegistrationNumber'];
    }

    // console.log(this.petRegistrationNumber, 'this.petRegistrationNumber');
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormDewormingData'));
    if (registrationFormData != null) {
      this.formFillUp();
    }

    //   this.getMedicationData();
    // }
  }

  formFillUp() {
    //console.log('treatmentFormDewormingData', JSON.parse(localStorage.getItem('treatmentFormDewormingData')));
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormDewormingData'));
    //console.log(registrationFormData, 'fgfdgfdgfdgfdgfd');
    this.treatmentForm.patchValue({
      registrationId: registrationFormData.registrationId,
      treatmentDate: registrationFormData.treatmentDate,
      anamnesisHistory: registrationFormData.anamnesisHistory,
      differentialDiagnosis: registrationFormData.differentialDiagnosis,
      observation: registrationFormData.observation,
      conditionsId: registrationFormData.conditionsId,
      procedureId: registrationFormData.procedureId,
      remarks: registrationFormData.remarks,
      advice: registrationFormData.advice,
      status: registrationFormData.status,
      finalConditionsId: registrationFormData.finalConditionsId,
      typeOfTest: registrationFormData.typeOfTest,
      systemName: registrationFormData.systemName,

      clinicalCondition: registrationFormData.clinicalCondition,
      tests: registrationFormData.tests,
      diagnosticConditionsId: registrationFormData.diagnosticConditionsId,
      diagnosticSystemName: registrationFormData.diagnosticSystemName,
    });
    this.getMedicationData();
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddMedicationDewormingComponent, {
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
            this.notificationService.openErrorSnackBar(' Couldnot be deleted, try again');
          }
        );
      }
    });
  }
  editMedication(id: number) {
    const dialogRef = this.dialog.open(AddMedicationDewormingComponent, {
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
  initializeForm() {
    this.treatmentForm = this.fb.group({
      registrationId: new FormControl(''),
      treatmentDate: new FormControl('', Validators.required),
      conditionsId: new FormControl('', Validators.required),
      finalConditionsId: new FormControl('', Validators.required),
      differentialDiagnosis: new FormControl(''),
      status: new FormControl(''),
      dewormingName: new FormControl(''),
      advice: new FormControl(''),
      typeOfTest: new FormControl(''),
    });
  }

  populateForm() {
    //this.masterService.regCond(this.speciesId).subscribe((res) => (this.conditions = res['conditions']));
    this.masterService.loadSystem().subscribe((res) => (this.systems = res));
    this.masterService.loadProcedure().subscribe((res) => (this.procedures = res));
    // this.masterService.loadConditions().subscribe((res) => (this.conditions = res));
    this.masterService.loadDeworningDiagnosticTest().subscribe((res) => (this.diagnosticTest = res));
    // console.log(this.diagnosticTest, 'fdgfdgfgfdgfdg');

    this.masterService.loadDewormingCondition().subscribe((response) => {
      this.dewormingCond = response;
    });
  }
  changeDiagnostic(event: MatRadioChange) {
    this.tests = Number(event.value) === 1;
  }

  getMedicineDetails(medicineId: number) {
    this.service.getMedicineDetails(medicineId).subscribe((response) => {
      this.medicinessDtls = response;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  saveDeworming() {
    if (this.treatmentForm.value.treatmentDate === '' && this.treatmentForm.value.conditionsId === '') {
      this.notificationService.openErrorSnackBar('Enter all the datas');
      return;
    } else {
      const clinical = new Clinical();
      Object.assign(clinical, this.treatmentForm.value);
      if (this.petRegistrationNumber !== '') {
        clinical.petRegistrationNumber = this.petRegistrationNumber;
      }
      // clinical.microchipNumber = this.registrationDetails.microchipNumber;
      clinical.patientId = this.patientId;
      clinical.treatment = 'Deworming';
      debugger;
      clinical.registrationId = this.registrationId;
      if (this.treatmentForm.value.typeOfTest !== '') {
        clinical.typeOfTest = this.treatmentForm.value.typeOfTest.join(',');
      }
      if (this.treatmentForm.value.finalConditionsId == '') {
        clinical.finalConditionsId = this.treatmentForm.value.conditionsId;
      }
      var medFormData = JSON.parse(localStorage.getItem('medData'));
      clinical.medicationData = medFormData;

      if (medFormData == '') {
        this.notificationService.openErrorSnackBar('Enter Medications');
        return;
      } else {
        this.service.saveDeworming(clinical).subscribe(
          () => {
            // localStorage.removeItem('treatmentFormDewormingData');
            this.notificationService.openSuccessSnackBar(' Completed Successfully ');
            localStorage.removeItem('treatmentFormDewormingData');
            this.router.navigate(['/', 'dashboard']);
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be Completed');
          }
        );
      }
    }
  }

  saveMedication(medicationData: MedicationData) {
    medicationData.patientId = this.patientId;
    medicationData.registrationId = this.registrationId;
    medicationData.flag = 1;
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar(' Added successfully');

        this.getMedicationData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added');
      }
    );
  }
  getConditions(systemId: number) {
    this.service.getConditions(systemId).subscribe((response) => {
      this.conditions = response;
    });
  }

  getMedicationData() {
    this.masterService.getMedication(this.registrationId).subscribe((res) => {
      this.dataSource.data = res;
      localStorage.setItem('medData', JSON.stringify(this.dataSource.data));
    });
  }

  printPage() {
    window.print();
  }

  saveDewormingDraft() {
    // console.log('this.treatmentForm.value', this.treatmentForm.value);
    localStorage.setItem('treatmentFormDewormingData', JSON.stringify(this.treatmentForm.value));
    this.notificationService.openSuccessSnackBar('successfully saved as draft');
  }
}
