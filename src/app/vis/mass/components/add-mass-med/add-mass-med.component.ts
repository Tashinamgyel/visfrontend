import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Class, Medicines, AdminRoute, Frequency } from '@app/master-management/models/master';
import { MedicationData } from '@app/vis/shared/model/model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-add-mass-med',
  templateUrl: './add-mass-med.component.html',
  styleUrls: ['./add-mass-med.component.scss'],
})
export class AddMassMedComponent implements OnInit {
  medForm: FormGroup;
  classes: Class[];
  medicines: Medicines[];
  routes: AdminRoute[];
  frequencies: Frequency[];
  medicinessDtls: any;
  actionType: string;
  id: number;
  classId: number;
  medicationData: MedicationData[];
  composition: string;
  unit: any;
  presentation: string;
  stock: any;
  treatmentId: number;
  treatment: string;
  constructor(
    public dialogRef: MatDialogRef<AddMassMedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService,
    private sharedService: SharedService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.treatmentId = this.data.treatmentId;
    this.treatment = this.data.treatment;
    // console.log(this.treatment,"this.treatmentIdthis.treatmentId");

    this.initializeForm();
    this.populateForm();
    this.getDoseUnits();
  }

  initializeForm() {
    this.medForm = this.fb.group({
      classId: new FormControl('', Validators.required),
      medicineId: new FormControl('', Validators.required),
      routeId: new FormControl('', Validators.required),
      frequencyId: new FormControl('', Validators.required),
      dosage: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      doseUnitId: new FormControl(undefined),
      stock: new FormControl('0'),
      presentation: new FormControl(''),
      composition: new FormControl(''),
      unitId: new FormControl('', Validators.required),
    });
  }

  doseUnits: any;

  getDoseUnits() {
    this.service.loadDoseUnit().subscribe((Response) => {
      this.doseUnits = Response;
    });
  }
  populateForm() {
    this.service.loadClass().subscribe((res) => {
      this.classes = res;
    });
    this.service.loadAdminRoute().subscribe((response) => (this.routes = response));
    this.service.loadFrequency().subscribe((res) => (this.frequencies = res));

    if (this.actionType === 'EDIT') {
      this.sharedService.loadMassMedById(this.id).subscribe(
        (response) => {
          //console.log(response,"responseresponse");

          this.getMedicine(response.medicineEntity.classEntity.id);
          this.getMedicineDetails(response.medicineEntity.id);
          this.medForm.patchValue({
            classId: response.medicineEntity.classEntity.id,
            medicineId: response.medicineEntity.id,
            composition: response.medicineEntity.composition,
            presentation: response.medicineEntity.presentation,
            doseUnitId: response.medicineEntity.unit,
            unitId: response.unit.id,
            frequencyId: response.frequency,
            routeId: response.route.id,
            duration: response.duration,
            dosage: response.dosage,
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
    });
  }

  saveMassMed() {
    if (this.medForm.valid) {
      const medicationData = new MedicationData();
      Object.assign(medicationData, this.medForm.value);
      medicationData.id = this.id;
      medicationData.treatmentId = this.treatmentId;
      this.dialogRef.close(medicationData);
      medicationData.createdBy = this.credentialsService.credentials.userName;
    } else {
      return;
    }
  }
  updateMassMed() {
    if (this.medForm.valid) {
      const medicationData = new MedicationData();
      Object.assign(medicationData, this.medForm.value);
      medicationData.id = this.id;
      medicationData.treatmentId = this.treatmentId;
      medicationData.treatment = this.treatment;
      this.dialogRef.close(medicationData);
      medicationData.createdBy = this.credentialsService.credentials.userName;
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
