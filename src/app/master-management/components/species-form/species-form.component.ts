import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { Conditions, Species } from '@app/master-management/models/master';

@Component({
  selector: 'app-species-form',
  templateUrl: './species-form.component.html',
  styleUrls: ['./species-form.component.scss'],
})
export class SpeciesFormComponent implements OnInit {
  speciesForm: FormGroup;
  conditions: Conditions[];
  conditionsId: number;
  actionType: string;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<SpeciesFormComponent>,
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
    this.speciesForm = this.fb.group({
      speciesName: new FormControl('', Validators.required),
      // conditionsId: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.service.loadConditions().subscribe((response) => {
      this.conditions = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadSpeciesById(this.id).subscribe(
        (response) => {
          this.speciesForm.patchValue({
            speciesName: response.speciesName,
            conditionsId: response.conditionsId,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  saveSpecies() {
    if (this.speciesForm.valid) {
      const species = new Species();
      Object.assign(species, this.speciesForm.value);
      species.types === 'Y';
      // species.conditionsId = this.speciesForm.get('conditionsId').value.join(',');
      this.dialogRef.close(species);
    } else {
      return;
    }
  }

  updateSpecies() {
    if (this.speciesForm.valid) {
      const species = new Species();
      Object.assign(species, this.speciesForm.value);
      species.id = this.id;
      if (this.actionType === 'EDIT') {
        species.types = 'Y';
      } else {
        species.types = 'N';
      }
      this.dialogRef.close(species);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
