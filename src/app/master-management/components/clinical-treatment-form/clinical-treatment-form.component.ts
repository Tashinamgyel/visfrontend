import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { ClinicalTreat } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-clinical-treatment-form',
  templateUrl: './clinical-treatment-form.component.html',
  styleUrls: ['./clinical-treatment-form.component.scss'],
})
export class ClinicalTreatmentFormComponent implements OnInit {
  clinicalTreatForm: FormGroup;
  actionType: String;
  id: number;
  procedureName: string;
  clinicalTreat: ClinicalTreat[];

  constructor(
    public dialogRef: MatDialogRef<ClinicalTreatmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }
  populateForm() {
    this.service.loadClinicalTreat().subscribe((response) => {
      this.clinicalTreat = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadClinicalTreatById(this.id).subscribe(
        (response) => {
          console.log(response, 'khan biss test');

          this.clinicalTreatForm.patchValue({
            proceduresName: response.proceduresName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.clinicalTreatForm = this.fb.group({
      proceduresName: new FormControl('', Validators.required),
    });
  }
  saveClinicalTreat() {
    if (this.clinicalTreatForm.valid) {
      const clinicalTreat = new ClinicalTreat();
      Object.assign(clinicalTreat, this.clinicalTreatForm.value);
      clinicalTreat.status = 'Y';
      this.dialogRef.close(clinicalTreat);
    } else {
      return;
    }
  }

  updateClinicalTreat() {
    if (this.clinicalTreatForm.valid) {
      const clinicalTreat = new ClinicalTreat();
      Object.assign(clinicalTreat, this.clinicalTreatForm.value);
      clinicalTreat.id = this.id;
      if (this.actionType === 'EDIT') {
        clinicalTreat.status = 'Y';
      } else {
        clinicalTreat.status = 'N';
      }

      this.dialogRef.close(clinicalTreat);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
