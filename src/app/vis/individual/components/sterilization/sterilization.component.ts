import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clinical, MedicationData } from '@app/vis/shared/model/model';
import {
  AdminRoute,
  AnimalTypes,
  Conditions,
  Frequency,
  Procedure,
  Species,
} from '@app/master-management/models/master';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { NotificationService } from '@core';
import { MasterService } from '@app/master-management/services/master.service';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-sterilization',
  templateUrl: './sterilization.component.html',
  styleUrls: ['./sterilization.component.scss'],
})
export class SterilizationComponent implements OnInit {
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
    this.initializeForm();
    this.registrationId = this.registrationDetails['id'];
    this.patientId = this.registrationDetails['patientId'];
    this.speciesId = this.registrationDetails['species']['id'];

    // console.log('sadssdsadadadadssa', this.registrationDetails);

    this.populateForm();
    //this.getMedicationData();

    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormSterilizationData'));

    if (registrationFormData != null) {
      this.formFillUp();
    }
  }

  formFillUp() {
    // console.log('sadssdsadadadadssa', JSON.parse(localStorage.getItem('treatmentFormSterilizationData')));
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormSterilizationData'));

    this.treatmentForm.patchValue({
      registrationId: registrationFormData.registrationId,
      treatmentDate: registrationFormData.treatmentDate,
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
    this.getMedicationData();
  }

  editMedication(id: number) {
    const dialogRef = this.dialog.open(AddMedicationComponent, {
      width: '780px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: MedicationData) => {
      if (result) {
        this.updateMedication(result);
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
            this.notificationService.openSuccessSnackBar('Deleted successfully');
            this.getMedicationData();
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be deleted');
          }
        );
      }
    });
  }

  saveMedication(medicationData: MedicationData) {
    medicationData.patientId = this.patientId;
    medicationData.registrationId = this.registrationId;
    medicationData.flag = 1;
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');

        this.getMedicationData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be added');
      }
    );
  }

  updateMedication(medicationData: MedicationData) {
    medicationData.patientId = this.patientId;
    medicationData.registrationId = this.registrationId;
    medicationData.flag = 1;
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated successfully');
        this.getMedicationData();
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated');
      }
    );
  }

  getMedicationData() {
    this.masterService.getMedication(this.registrationId).subscribe((res) => {
      this.dataSource.data = res;
      localStorage.setItem('medData', JSON.stringify(this.dataSource.data));
      // console.log(res);
    });
  }

  addMedication(medicationData: MedicationData) {
    this.service.saveMedication(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
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
      anamnesisHistory: new FormControl(''),
      observation: new FormControl(''),
      conditionsId: new FormControl(''),
      procedureId: new FormControl(''),
      remarks: new FormControl(''),
      advice: new FormControl('', Validators.required),
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

  populateForm() {
    this.masterService.regCond(this.speciesId).subscribe((res) => (this.conditions = res['conditions']));
    this.masterService.loadProcedure().subscribe((res) => (this.procedures = res));
    this.masterService.loadConditions().subscribe((res) => (this.conditions = res));
  }

  changeDiagnostic(event: MatRadioChange) {
    this.tests = Number(event.value) === 1;
  }

  getSystemDtls(conditionsId: number) {
    this.masterService.getSystem(conditionsId).subscribe((response) => {
      this.treatmentForm.patchValue({
        systemName: response.system.systemName,
      });
    });
  }

  getSystemDiagnostic(diagnosticConditionsId: number) {
    this.masterService.getSystem(diagnosticConditionsId).subscribe((response) => {
      this.treatmentForm.patchValue({
        diagnosticSystemName: response.system.systemName,
      });
    });
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
  saveSterilization() {
    debugger;
    const clinical = new Clinical();
    Object.assign(clinical, this.treatmentForm.value);
    clinical.patientId = this.patientId;
    clinical.treatment = 'Sterilization';
    clinical.registrationId = this.registrationId;

    clinical.petRegistrationNumber = this.registrationDetails.petRegistrationNumber;
    clinical.microchipNumber = this.registrationDetails.microchipNumber;

    var medFormData = JSON.parse(localStorage.getItem('medData'));
    clinical.medicationData = medFormData;

    if (this.treatmentForm.value.treatmentDate === '' && this.treatmentForm.value.observation === '') {
      this.notificationService.openErrorSnackBar('Enter all the datas');
    } else {
      this.service.saveSterilization(clinical).subscribe(
        () => {
          this.notificationService.openSuccessSnackBar('Completed Successfully');
          localStorage.removeItem('treatmentFormSterilizationData');
          this.router.navigate(['/', 'dashboard']);
          // localStorage.removeItem('treatmentFormSterilizationData');
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not be Completed');
        }
      );
    }
  }

  printPage() {
    window.print();
  }

  saveSterilizationDraft() {
    debugger;
    console.log('medData', this.treatmentForm.value);
    localStorage.setItem('treatmentFormSterilizationData', JSON.stringify(this.treatmentForm.value));
    this.notificationService.openSuccessSnackBar('Draft Saved Successfully');
  }
}
