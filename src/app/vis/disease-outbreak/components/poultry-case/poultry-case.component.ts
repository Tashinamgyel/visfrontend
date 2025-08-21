import { Component, OnInit } from '@angular/core';
import { CaseData, POULTRY_TYPE, POUTRY_AGE } from '@app/vis/shared/model/model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-poultry-case',
  templateUrl: './poultry-case.component.html',
  styleUrls: ['./poultry-case.component.scss'],
})
export class PoultryCaseComponent implements OnInit {
  poultryCaseForm: FormGroup;
  poultryDetails: FormGroup;
  poultryAges = POUTRY_AGE;
  poultryType = POULTRY_TYPE;
  animalType: any = [];
  breeds: any = [];
  species: any = [];
  poultryDetailTracker = 0;
  flashId: number;
  casePoultry: any;
  constructor(private sharedService: SharedService, private masterService: MasterService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.populateForm(0);
  }
  initializeForm() {
    this.poultryCaseForm = this.fb.group({
      poultry: this.fb.array([]),
    });
  }

  populateForm(index: number) {
    this.masterService.loadMassSpecies().subscribe((res) => {
      this.species[index] = res;
      // console.log(this.species);
    });

    this.masterService.loadBreeds().subscribe((res) => {
      this.breeds[index] = res;
    });

    this.masterService.getAnimalPoultryType().subscribe((res) => {
      this.animalType[index] = res;
    });
  }

  deletePoultryRow(index: number) {
    if (index > 0) {
      const add = this.poultryCaseForm.get('poultryDtls') as FormArray;
      add.removeAt(index);
    }
    this.poultryDetailTracker--;
  }

  addOtherSpeciesDetailRow() {
    const push = this.poultryCaseForm.get('poultry') as FormArray;
    push.push(
      this.fb.group({
        male: new FormControl('', Validators.required),
        female: new FormControl('', Validators.required),
        breedId: new FormControl('', Validators.required),
        animalTypeId: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        total: new FormControl('', Validators.required),
      })
    );
    this.populateForm(this.poultryDetailTracker);
    this.poultryDetailTracker++;
  }

  saveFlashReport() {
    const casePoultryDtls = [];
    casePoultryDtls.push(this.poultryCaseForm?.value);
    console.log(casePoultryDtls, 'casePoultryDtls');
    return casePoultryDtls;
  }
}
