import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import {
  AdminRoute,
  AnimalTypes,
  Conditions,
  DewormingCondition,
  DewormingDiagnosticTest,
  Frequency,
  Species,
  System,
  TypeOfTest,
} from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { AddMedicationDewormingComponent } from '@app/vis/individual/components/add-medication-deworming/add-medication-deworming.component';
import { Clinical, MedicationData } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-deworming-data-view',
  templateUrl: './deworming-data-view.component.html',
  styleUrls: ['./deworming-data-view.component.scss'],
})
export class DewormingDataViewComponent implements OnInit {
  medicationData: Observable<MedicationData[]>;
  @Inject(MAT_DIALOG_DATA) public dewormingData: any;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  treatmentForm: FormGroup;
  clinical: Clinical;
  dewormingCond: DewormingCondition[];
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
  ];

  dataSource = new MatTableDataSource();

  @Input() registrationDetails: any;
  @Input() editable = false;

  dewormingDataFormat: any;

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private masterService: MasterService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DewormingDataViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.masterService.loadConditions().subscribe((res) => (this.conditions = res));
    this.formFillUp();
    this.treatmentForm.patchValue({
      dewomingConditionId: new FormControl(''),
    });
  }

  formFillUp() {
    var registrationFormData = this.data.dewormingData;
    (this.dewormingDataFormat = registrationFormData.treatmentDate),
    this.treatmentForm.patchValue({
      registrationId: registrationFormData.registrationId,
      conditionsId: registrationFormData.conditions.conditionsName,
      differentialDiagnosis: registrationFormData.differentialDiagnosis,
      status: registrationFormData.status,
      typeOfTest: registrationFormData.typeOfTest,
      finalConditions: registrationFormData.finalConditions.conditionsName,
      advice: registrationFormData.advice,
    });
    this.getMedicationData(registrationFormData.registrationId, registrationFormData.id, 'Deworming');
  }

  getMedicationData(registrationId: number, id: number, treatment: string) {
    this.masterService.getMedicationCaseWise(registrationId, id, treatment).subscribe((res) => {
      this.dataSource.data = res;
      localStorage.setItem('medData', JSON.stringify(this.dataSource.data));
      // console.log(res);
    });
  }

  initializeForm() {
    this.treatmentForm = this.fb.group({
      registrationId: new FormControl(''),
      treatmentDate: new FormControl(''),
      conditionsId: new FormControl(''),
      differentialDiagnosis: new FormControl(''),
      finalConditions: new FormControl(''),
      status: new FormControl(''),
      conditionsName: new FormControl(''),
      typeOfTest: new FormControl(''),
      advice: new FormControl(''),
    });
  }
  populateForm() {
    //this.masterService.regCond(this.speciesId).subscribe((res) => (this.conditions = res['conditions']));
    this.masterService.loadSystem().subscribe((res) => (this.systems = res));

    // this.masterService.loadConditions().subscribe((res) => (this.conditions = res));
    this.masterService.loadDeworningDiagnosticTest().subscribe((res) => (this.diagnosticTest = res));
    console.log(this.diagnosticTest, 'fdgfdgfgfdgfdg');

    this.masterService.loadDewormingCondition().subscribe((response) => {
      this.dewormingCond = response;
    });
  }
  changeDiagnostic(event: MatRadioChange) {
    this.tests = Number(event.value) === 1;
  }
}
