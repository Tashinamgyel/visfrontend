import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MassData, OTHER_AGE, POULTRY_TYPE, POUTRY_AGE, VACCINE_STATUS } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-vaccination-details',
  templateUrl: './mass-vaccination.component.html',
  styleUrls: ['./mass-vaccination.component.scss'],
})
export class MassVaccinationComponent implements OnInit {
  /**
   * @description FormGroup for getting Poultry Details
   */
  vaccinationPoultryForm: FormGroup;
  /**
   * @description FormGroup for getting Other Species Details
   */
  vaccinationOtherSpeciesForm: FormGroup;

  /**
   * @description get treatment type (mass-deworming or mass-vaccination) from treatment details
   */
  @Input() treatmentType: string;

  /**
   * @description get mass registration details from treatment details
   */
  @Input() registrationDetails: any;

  /**
   * @description get Poultry
   */
  @Input() showPoultry: boolean;

  /**
   * @description get other species
   */
  @Input() showOtherSpecies: boolean;

  /**
   * @description get checked status
   */
  @Input() checked: boolean;

  treatment: string;
  registrationId: number;
  patientId: string;
  speciesId: number;
  dynamicRows: number[] = [1];
  breeds: any = [];
  vaccines: any = [];

  species: any = [];
  animalType: any = [];

  vaccineForOtherAnimalTracker = 0;
  vaccineForPoultryTracker = 0;

  @Input() editable = false;
  poultryAges = POUTRY_AGE;
  otherAnimalAges = OTHER_AGE;
  vaccineStatus = VACCINE_STATUS;
  poultryType = POULTRY_TYPE;
  massData: MassData;

  constructor(private fb: FormBuilder, private masterService: MasterService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.initializeForm();
    // if (this.checked) this.vaccinationPoultryForm.reset();
  }

  initializeForm() {
    this.vaccinationOtherSpeciesForm = this.fb.group({
      otherSpecies: this.fb.array([]),
    });
    this.vaccinationPoultryForm = this.fb.group({
      poultry: this.fb.array([]),
    });
  }

  populateForm(index: number) {
    this.masterService.loadBreeds().subscribe((res) => {
      this.breeds[index] = res;
    });

    this.masterService.loadVaccineType().subscribe((res) => {
      this.vaccines[index] = res;
    });

    this.masterService.loadMassSpecies().subscribe((res) => (this.species[index] = res));
  }

  addNewPoultryDetailRow() {
    const add = this.vaccinationPoultryForm.get('poultry') as FormArray;
    add.push(
      this.fb.group({
        male: new FormControl('', Validators.required),
        mixed: new FormControl('', Validators.required),
        female: new FormControl('', Validators.required),
        poultryType: new FormControl('', Validators.required),
        breedId: new FormControl('', Validators.required),
        vaccineTypeId: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        total: new FormControl('', Validators.required),
        vaccinationDate: new FormControl('', Validators.required),
        vaccinationStatus: new FormControl('', Validators.required),
      })
    );
    this.populateForm(this.vaccineForPoultryTracker);
    this.vaccineForPoultryTracker++;
  }

  deletePoetryDetailRow(index: number) {
    if (index > 0) {
      const add = this.vaccinationPoultryForm.get('poultry') as FormArray;
      add.removeAt(index);
      this.vaccineForPoultryTracker--;
    }
  }

  addOtherSpeciesDetailRow() {
    const push = this.vaccinationOtherSpeciesForm.get('otherSpecies') as FormArray;
    push.push(
      this.fb.group({
        male: new FormControl('', Validators.required),
        female: new FormControl('', Validators.required),
        poultryType: new FormControl('', Validators.required),
        breedId: new FormControl('', Validators.required),
        vaccineTypeId: new FormControl('', Validators.required),
        speciesId: new FormControl('', Validators.required),
        animalTypeId: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        total: new FormControl('', Validators.required),
        vaccinationDate: new FormControl('', Validators.required),
        vaccinationStatus: new FormControl('', Validators.required),
      })
    );
    this.populateForm(this.vaccineForOtherAnimalTracker);
    this.vaccineForOtherAnimalTracker++;
  }

  deleteOtherSpeciesRow(index: number) {
    if (index > 0) {
      const add = this.vaccinationOtherSpeciesForm.get('otherSpecies') as FormArray;
      add.removeAt(index);
      this.vaccineForOtherAnimalTracker--;
    }
  }

  getAnimalType(speciesId: number, index: number) {
    this.sharedService.getAnimalType(speciesId).subscribe((response) => {
      this.animalType[index] = response;
    });
  }

  saveMassRegistration() {
    const massVaccination = [];
    massVaccination.push(this.vaccinationOtherSpeciesForm?.value);
    massVaccination.push(this.vaccinationPoultryForm?.value);
    console.log(massVaccination, 'fdsfdsfdsf');

    return massVaccination;
  }
}
