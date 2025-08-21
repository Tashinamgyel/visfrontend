import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Class, Medicines, AdminRoute, Frequency } from '@app/master-management/models/master';
import { MedicationData } from '@app/vis/shared/model/model';
import { NotificationService } from '@app/@core/notification.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss'],
})
export class AddMedicationComponent implements OnInit {
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
    //console.log('data', this.data);
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
      // stockAvailability: new FormControl('', Validators.required),
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
            unitId: response.unit.id,
            frequencyId: response.frequency.id,
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
      console.log('cccccccccccc', response);
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

  saveMedication() {
    //console.log('this.data.registrationID', this.data.registrationId);
    // if (this.medicationForm.valid) {
    // const medicationData = new MedicationData();
    // Object.assign(this.medicationForm.value, this.data.registrationId);
    // Object.assign(this.medicationForm.value.patientId, this.data.patientId);
    // Object.assign(medicationData, this.medicationForm.value);
    //medicationData.flag = 1;

    var medicationDataInArray = {};
    medicationDataInArray['classId'] = this.medicationForm.value.classId;
    medicationDataInArray['dosage'] = this.medicationForm.value.dosage;
    medicationDataInArray['doseUnitId'] = this.medicationForm.value.doseUnitId;
    medicationDataInArray['unitId'] = this.medicationForm.value.unitId;
    medicationDataInArray['duration'] = this.medicationForm.value.duration;
    medicationDataInArray['flag'] = this.medicationForm.value.flag;
    medicationDataInArray['frequencyId'] = this.medicationForm.value.frequencyId;
    medicationDataInArray['medicineId'] = this.medicationForm.value.medicineId;
    medicationDataInArray['patientId'] = this.data.patientId;
    medicationDataInArray['presentation'] = this.medicationForm.value.presentation;
    medicationDataInArray['composition'] = this.medicationForm.value.composition;
    medicationDataInArray['registrationId'] = this.data.registrationId;
    medicationDataInArray['routeId'] = this.medicationForm.value.routeId;
    medicationDataInArray['stock'] = this.medicationForm.value.stock;
    this.dialogRef.close(medicationDataInArray);
  }

  updateMedication() {
    var medicationDataInArray = {};
    medicationDataInArray['id'] = this.id;
    medicationDataInArray['classId'] = this.medicationForm.value.classId;
    medicationDataInArray['dosage'] = this.medicationForm.value.dosage;
    medicationDataInArray['doseUnitId'] = this.medicationForm.value.doseUnitId;
    medicationDataInArray['unitId'] = this.medicationForm.value.unitId;
    medicationDataInArray['duration'] = this.medicationForm.value.duration;
    medicationDataInArray['flag'] = this.medicationForm.value.flag;
    medicationDataInArray['frequencyId'] = this.medicationForm.value.frequencyId;
    medicationDataInArray['medicineId'] = this.medicationForm.value.medicineId;
    medicationDataInArray['patientId'] = this.data.patientId;
    medicationDataInArray['presentation'] = this.medicationForm.value.presentation;
    medicationDataInArray['composition'] = this.medicationForm.value.composition;
    medicationDataInArray['registrationId'] = this.data.registrationId;
    medicationDataInArray['routeId'] = this.medicationForm.value.routeId;
    medicationDataInArray['stock'] = this.medicationForm.value.stock;
    this.dialogRef.close(medicationDataInArray);
  }

  // updateMedication() {
  //   if (this.medicationForm.valid) {
  //     const medicationData = new MedicationData();
  //     Object.assign(medicationData, this.medicationForm.value);
  //     medicationData.id = this.id;
  //     this.dialogRef.close(medicationData);
  //   } else {
  //     return;
  //   }
  // }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
