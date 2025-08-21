import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Class, Medicines, AdminRoute, Frequency } from '@app/master-management/models/master';
import { MedicationData } from '@app/vis/shared/model/model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-add-medication-deworming',
  templateUrl: './add-medication-deworming.component.html',
  styleUrls: ['./add-medication-deworming.component.scss'],
})
export class AddMedicationDewormingComponent implements OnInit {
  medicationForm: FormGroup;
  classes: Class[];
  medicines: Medicines[];
  routes: AdminRoute[];
  frequencies: Frequency[];
  medicinessDtls: any;
  actionType: string;
  id: number;
  classId: number;
  medicationData: MedicationData[];
  composition: any;
  unit: any;
  presentation: any;
  stock: any;

  constructor(
    public dialogRef: MatDialogRef<AddMedicationDewormingComponent>,
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
    this.getDoseUnits();
  }

  initializeForm() {
    this.medicationForm = this.fb.group({
      classId: new FormControl('', Validators.required),
      medicineId: new FormControl('', Validators.required),
      routeId: new FormControl('', Validators.required),
      frequencyId: new FormControl('', Validators.required),
      dosage: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      unitId: new FormControl('', Validators.required),
      doseUnitId: new FormControl(undefined),
      stock: new FormControl('0'),
      presentation: new FormControl(''),
      composition: new FormControl(''),
    });
  }

  doseUnits: any;
  getDoseUnits() {
    this.service.loadDoseUnit().subscribe((Response) => {
      this.doseUnits = Response;
    });
  }
  populateForm() {
    this.service.loadClassDeworming().subscribe((res) => {
      this.classes = res;
      // console.log(res, 'resres');
    });
    this.service.loadAdminRoute().subscribe((response) => (this.routes = response));

    this.service.loadFrequency().subscribe((res) => (this.frequencies = res));

    if (this.actionType === 'EDIT') {
      this.sharedService.loadMedicationById(this.id).subscribe(
        (response) => {
          this.getMedicine(response.medicineEntity.classEntity.id);
          this.getMedicineDetails(response.medicineEntity.id);
          // console.log(response,"loadMedicationById");
          this.medicationForm.patchValue({
            classId: response.medicineEntity.classEntity.id,
            medicineId: response.medicineEntity.id,
            composition: response.medicineEntity.composition,
            presentation: response.medicineEntity.presentation,
            doseUnitId: response.medicineEntity.unit,
            frequencyId: response.frequency.id,
            routeId: response.route.id,
            duration: response.duration,
            dosage: response.dosage,
            unitId: response.unit.id,
          });
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not load details, please try again later');
        }
      );
    }
  }

  getMedicine(classId: number) {
    this.sharedService.getMedicine(classId).subscribe((response) => {
      this.medicines = response;
    });
  }

  getMedicineDetails(medicineId: number) {
    this.sharedService.getMedicineDetails(medicineId).subscribe((response) => {
      this.medicinessDtls = response;
      this.composition = response.composition;
      this.presentation = response.presentation;
      this.unit = response.unit;
      // this.stock = response.stock;
    });
  }

  saveMedication() {
    if (this.medicationForm.valid) {
      const medicationData = new MedicationData();
      Object.assign(medicationData, this.medicationForm.value);
      this.dialogRef.close(medicationData);
    } else {
      return;
    }
  }

  updateMedication() {
    if (this.medicationForm.valid) {
      const medicationData = new MedicationData();
      Object.assign(medicationData, this.medicationForm.value);
      medicationData.id = this.id;
      this.dialogRef.close(medicationData);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
