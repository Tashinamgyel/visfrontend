import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CatchingMethod, Disease } from '@app/master-management/models/master';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@core';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-disease-form',
  templateUrl: './disease-form.component.html',
  styleUrls: ['./disease-form.component.scss'],
})
export class DiseaseFormComponent implements OnInit {
  diseaseForm: FormGroup;

  diseaseName: string;
  notifiable: string;
  actionType: string;
  id: number;
  disease: Disease[];

  constructor(
    public dialogRef: MatDialogRef<DiseaseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.diseaseForm = this.fb.group({
      diseaseName: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadDisease().subscribe((response) => {
      this.disease = response;
    });
    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadDiseaseById(this.id).subscribe(
        (response) => {
          console.log(response, 'khan boss is testing');

          this.diseaseForm.patchValue({
            diseaseName: response.diseaseName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveDisease() {
    if (this.diseaseForm.valid) {
      const disease = new Disease();
      Object.assign(disease, this.diseaseForm.value);
      disease.createdBy = this.credentialsService.credentials.userName;
      disease.status = 'Y';
      this.dialogRef.close(disease);
    } else {
      return;
    }
  }

  updateDisease() {
    if (this.diseaseForm.valid) {
      const disease = new Disease();
      Object.assign(disease, this.diseaseForm.value);
      disease.id = this.id;
      if (this.actionType === 'EDIT') {
        disease.status = 'Y';
      } else {
        disease.status = 'N';
      }
      this.dialogRef.close(disease);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
