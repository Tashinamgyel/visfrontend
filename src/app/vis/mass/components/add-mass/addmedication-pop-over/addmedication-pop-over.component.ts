import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { AdminRoute, Class, Frequency, Medicines } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { AddMedicationComponent } from '@app/vis/individual/components/add-medication/add-medication.component';
import { MedicationData } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-addmedication-pop-over',
  templateUrl: './addmedication-pop-over.component.html',
  styleUrls: ['./addmedication-pop-over.component.scss'],
})
export class AddmedicationPopOverComponent implements OnInit {
  medicationForm: FormGroup;
  classes: Class[];
  medicines: Medicines[];
  routes: AdminRoute[];
  frequencies: Frequency[];
  id: number;
  classId: number;
  medicationData: MedicationData[];
  actionType: string;
  composition: any;
  unit: any;
  presentation: any;
  availableStock: any;
  showMessage: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddMedicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();

    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormSterilizationData'));

    // if (registrationFormData != null) {
    //   this.getDoseUnits();
    // }
  }

  formFillUp() {
    // console.log('sadssdsadadadadssa', JSON.parse(localStorage.getItem('treatmentFormSterilizationData')));
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormSterilizationData'));

    this.medicationForm.patchValue({
      doseUnitId: registrationFormData.doseUnitId,
    });
  }

  initializeForm() {
    this.medicationForm = this.fb.group({
      classId: new FormControl('', Validators.required),
      medicineId: new FormControl('', Validators.required),
      composition: new FormControl(''),
      presentation: new FormControl(''),
      unit: new FormControl(''),
      routeId: new FormControl('', Validators.required),
      frequencyId: new FormControl('', Validators.required),
      stockAvailability: new FormControl(''),
      dosage: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      doseUnitId: new FormControl('', Validators.required),
    });

    // console.log('data', this.data.data);
    if (this.data.data === 'deworming') {
      this.showMessage = true;
    } else if (this.data.data === 'clinical') {
      this.showMessage = false;
    }
  }
  doseUnits: any;
  populateForm() {
    this.service.loadClass().subscribe((res) => {
      this.classes = res;
    });

    //getDoseUnits() {
    this.service.loadDoseUnit().subscribe((Response) => {
      this.doseUnits = Response;
      console.log('this.doseUnits', this.doseUnits);
    });
    //   }

    this.service.loadAdminRoute().subscribe((response) => (this.routes = response));

    this.service.loadFrequency().subscribe((res) => (this.frequencies = res));

    if (this.actionType === 'EDIT') {
      this.sharedService.loadMedicationById(this.id).subscribe(
        (response) => {
          this.medicationForm.patchValue({
            classId: response.classId,
            medicines: response.medicineId,
            routes: response.routeId,
            duration: response.duration,
            dosage: response.dosage,
            doseUnits: response.doseUnitId,

            // stockAvailability: response.stockAvailability,
          });
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not load details, please try again later');
        }
      );
    }
  }

  getMedicineDetails(medicineId: any) {
    this.sharedService.getMedicineDetails(medicineId.id).subscribe((response) => {
      this.composition = response.composition;
      this.presentation = response.presentation;
      this.unit = response.unit;

      // this.availableStock = response
      this.medicationForm.patchValue({
        unit: this.unit,
        composition: this.composition,
        presentation: this.presentation,
      });
    });
  }

  getMedicine(classId: number) {
    this.sharedService.getMedicine(classId).subscribe((response) => {
      this.medicines = response;
    });
  }

  saveMedication() {
    if (
      this.medicationForm.value.classId != '' &&
      this.medicationForm.value.dosage != '' &&
      this.medicationForm.value.duration != '' &&
      this.medicationForm.value.frequencyId != '' &&
      this.medicationForm.value.medicineId != '' &&
      this.medicationForm.value.routeId != '' &&
      this.medicationForm.value.doseUnitId != ''
    ) {
      this.dialogRef.close({ data: this.medicationForm.value });
    } else {
      this.notificationService.openErrorSnackBar('Please enter all the required data');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
