import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-addmedication-for-vaccination',
  templateUrl: './addmedication-for-vaccination.component.html',
  styleUrls: ['./addmedication-for-vaccination.component.scss'],
})
export class AddmedicationForVaccinationComponent implements OnInit {
  addVaccinationForm: FormGroup;
  ageForPoultry: boolean = true;
  ageForOthers: boolean = false;
  VaccineType: any;
  breeds: any;
  totalData: any;
  mixedHidden: boolean = true;
  femaleHidden: boolean = true;
  maleHidden: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddmedicationForVaccinationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.dropDownList();
    // this.formFillUp();
  }

  dropDownList() {
    this.masterService.loadVaccineType().subscribe((res) => {
      this.VaccineType = res;
      // console.log('VaccineType', this.VaccineType);
    });
    this.masterService.loadBreeds().subscribe((res) => {
      this.breeds = res;
      // console.log('breeds', this.breeds);
    });
  }

  initializeForm() {
    this.addVaccinationForm = this.fb.group({
      //vaccinationState: new FormControl('', Validators.required),
      vaccineType: new FormControl('', Validators.required),
      // notVaccinated: new FormControl('', Validators.required),
      // animalIDNOt: new FormControl('', Validators.required),
    });
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormDewormingData'));
    if (registrationFormData != null) {
      //this.formFillUp();
    }
  }
  // formFillUp() {
  //   var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormDewormingData'));
  //   this.addVaccinationForm.patchValue({
  //     notVaccinated: registrationFormData.notVaccinated,
  //     animalIDNOt: registrationFormData.animalIDNOt,
  //   });
  // }

  addVaccination() {
    this.dialogRef.close({ data: this.addVaccinationForm.value });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
