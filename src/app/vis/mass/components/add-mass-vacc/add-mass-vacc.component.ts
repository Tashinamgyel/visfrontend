import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { VaccineType } from '@app/master-management/models/master';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { MedicationData } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-add-mass-vacc',
  templateUrl: './add-mass-vacc.component.html',
  styleUrls: ['./add-mass-vacc.component.scss'],
})
export class AddMassVaccComponent implements OnInit {
  vaccForm: FormGroup;
  vaccineName: string;
  vaccineType: VaccineType[];
  actionType: string;
  id: number;
  treatmentId: number;

  constructor(
    public dialogRef: MatDialogRef<AddMassVaccComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService,
    private sharedService: SharedService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.treatmentId = this.data.treatmentId;
    console.log(this.treatmentId, 'this.treatmentIdthis.treatmentId');
    this.initializeForm();
    this.populateForm();
    this.populateForm();
  }
  populateForm() {
    this.service.loadVaccineType().subscribe((res) => {
      this.vaccineType = res;
    });
    if (this.actionType === 'EDIT') {
      this.sharedService.loadMassMedById(this.id).subscribe(
        (response) => {
          //console.log(response,"responseresponseresponse");
          this.vaccForm.patchValue({
            vaccineTypeId: response.vaccineType.id,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.vaccForm = this.fb.group({
      vaccineTypeId: new FormControl('', Validators.required),
    });
  }
  saveVaccineType() {
    if (this.vaccForm.valid) {
      const medicationData = new MedicationData();
      medicationData.id = this.id;
      medicationData.treatmentId = this.treatmentId;
      Object.assign(medicationData, this.vaccForm.value);
      this.dialogRef.close(medicationData);
    } else {
      return;
    }
  }

  updateVaccineType() {
    if (this.vaccForm.valid) {
      const medicationData = new MedicationData();
      medicationData.id = this.id;
      medicationData.treatmentId = this.treatmentId;
      Object.assign(medicationData, this.vaccForm.value);
      // vaccineType.id = this.id;
      this.dialogRef.close(medicationData);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
