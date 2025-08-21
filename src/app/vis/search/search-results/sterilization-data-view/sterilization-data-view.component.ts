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
  Frequency,
  Procedure,
  Species,
} from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { AddMedicationComponent } from '@app/vis/individual/components/add-medication/add-medication.component';
import { Clinical, MedicationData } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-sterilization-data-view',
  templateUrl: './sterilization-data-view.component.html',
  styleUrls: ['./sterilization-data-view.component.scss'],
})
export class SterilizationDataViewComponent implements OnInit {
  medicationData: Observable<MedicationData[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  treatmentForm: FormGroup;
  medicationForm: FormGroup;
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

  classes: any = [];
  medicines: any = [];
  medicinessDtls: any = [];
  conditionsId: number;
  tests: boolean;
  maxDate = new Date();

  i = 0;

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

  sterilizationDataFormat: any;

  @Input() registrationDetails: any;
  @Input() editable = false;
  constructor(
    private fb: FormBuilder,
    private service: SharedService,

    private masterService: MasterService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SterilizationDataViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.registrationId = this.registrationDetails['id'];
    // this.patientId = this.registrationDetails['patientId'];
    // this.speciesId = this.registrationDetails['species']['id'];
    // this.populateForm();
    //this.getMedicationData();

    // var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormSterilizationData'));
    // if (registrationFormData != null) {
    this.formFillUp();
    // }
  }

  formFillUp() {
    // console.log('treatmentFormSterilizationData', JSON.parse(localStorage.getItem('treatmentFormSterilizationData')));
    var registrationFormData = this.data.sterilizationData;
    console.log('registrationFormData', registrationFormData);

    (this.sterilizationDataFormat = registrationFormData.treatmentDate),
      this.treatmentForm.patchValue({
        registrationId: registrationFormData.registrationId,
        anamnesisHistory: registrationFormData.anamnesisHistory,
        observation: registrationFormData.observation,
        conditionsId: registrationFormData.conditionsId,
        procedureId: registrationFormData.procedureId,
        remarks: registrationFormData.remarks,
        advice: registrationFormData.advice,
        systemName: registrationFormData.systemName,
        clinicalCondition: registrationFormData.clinicalCondition,
        tests: registrationFormData.tests,
        diagnosticConditionsId: registrationFormData.diagnosticConditionsId,
        diagnosticSystemName: registrationFormData.diagnosticSystemName,
      });
    this.getMedicationData(registrationFormData.registrationId, registrationFormData.id, 'Sterilization');
  }

  getMedicationData(registrationId: number, id: number, treatment: string) {
    //this.masterService.getMedication(registrationId).subscribe((res) => {
    this.masterService.getMedicationCaseWise(registrationId, id, treatment).subscribe((res) => {
      this.dataSource.data = res;
      console.log(res, 'ssssssss');
      localStorage.setItem('medData', JSON.stringify(this.dataSource.data));
    });
  }

  initializeForm() {
    this.treatmentForm = this.fb.group({
      registrationId: new FormControl(''),
      treatmentDate: new FormControl(''),
      anamnesisHistory: new FormControl(''),
      observation: new FormControl(''),
      conditionsId: new FormControl(''),
      procedureId: new FormControl(''),
      remarks: new FormControl(''),
      advice: new FormControl(''),
      systemName: new FormControl(''),
      clinicalCondition: new FormControl(''),
      tests: new FormControl(''),
      diagnosticConditionsId: new FormControl(''),
      diagnosticSystemName: new FormControl(''),
    });

    this.medicationForm = this.fb.group({
      medication: this.fb.array([]),
    });
  }
}
