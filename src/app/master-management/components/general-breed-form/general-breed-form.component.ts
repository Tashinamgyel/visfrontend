import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Breeds } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-general-breed-form',
  templateUrl: './general-breed-form.component.html',
  styleUrls: ['./general-breed-form.component.scss'],
})
export class GeneralBreedFormComponent implements OnInit {
  breedsForm: FormGroup;
  actionType: String;
  id: number;
  breedName: string;
  breeds: Breeds[];

  constructor(
    public dialogRef: MatDialogRef<GeneralBreedFormComponent>,
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
    this.service.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadBreedsById(this.id).subscribe(
        (response) => {
          this.breedsForm.patchValue({
            breedName: response.breedName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.breedsForm = this.fb.group({
      breedName: new FormControl('', Validators.required),
    });
  }
  saveBreeds() {
    if (this.breedsForm.valid) {
      const breeds = new Breeds();
      Object.assign(breeds, this.breedsForm.value);
      breeds.status = 'Y';
      this.dialogRef.close(breeds);
    } else {
      return;
    }
  }

  updateBreeds() {
    if (this.breedsForm.valid) {
      const breeds = new Breeds();
      Object.assign(breeds, this.breedsForm.value);
      breeds.id = this.id;
      if (this.actionType === 'EDIT') {
        breeds.status = 'Y';
      } else {
        breeds.status = 'N';
      }
      this.dialogRef.close(breeds);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
