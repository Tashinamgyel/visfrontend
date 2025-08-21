import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Laboratory } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-laboratory-form',
  templateUrl: './laboratory-form.component.html',
  styleUrls: ['./laboratory-form.component.scss'],
})
export class LaboratoryFormComponent implements OnInit {
  Form: FormGroup;
  labName: string;
  laboratoryForm: FormGroup;
  actionType: string;
  id: number;
  laboratory: Laboratory[];

  constructor(
    public dialogRef: MatDialogRef<LaboratoryFormComponent>,
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

  initializeForm() {
    this.laboratoryForm = this.fb.group({
      labName: new FormControl('', Validators.required),
    });
  }
  populateForm() {
    this.service.loadLaboratory().subscribe((response) => {
      this.laboratory = response;
    });
    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadLoboratoryById(this.id).subscribe(
        (response) => {
          this.laboratoryForm.patchValue({
            labName: response.labName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveLaboratory() {
    if (this.laboratoryForm.valid) {
      const laboratory = new Laboratory();
      Object.assign(laboratory, this.laboratoryForm.value);
      laboratory.status = 'Y';
      this.dialogRef.close(laboratory);
    } else {
      return;
    }
  }

  updateLaboratory() {
    if (this.laboratoryForm.valid) {
      const laboratory = new Laboratory();
      Object.assign(laboratory, this.laboratoryForm.value);
      laboratory.id = this.id;
      if (this.actionType === 'EDIT') {
        laboratory.status = 'Y';
      } else {
        laboratory.status = 'N';
      }
      this.dialogRef.close(laboratory);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
