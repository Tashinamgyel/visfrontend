import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { OTHER_AGE, POULTRY_TYPE, POUTRY_AGE } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-deworming-details',
  templateUrl: './mass-deworming.component.html',
  styleUrls: ['./mass-deworming.component.scss'],
})
export class MassDewormingComponent implements OnInit {
  dewormingPoultryForm: FormGroup;
  dewormingOtherSpeciesForm: FormGroup;

  /**
   * @description get treatment type (mass-deworming o
   * r mass-vaccination) from treatment details
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
  species: any = [];
  animalType: any = [];

  dewormingForOtherSpeciesTracker = 0;
  dewormingForPoultryTracker = 0;
  @Input() editable = false;
  poultryAges = POUTRY_AGE;
  otherAnimalAges = OTHER_AGE;

  poultryType = POULTRY_TYPE;

  constructor(private fb: FormBuilder, private masterService: MasterService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.checked) this.dewormingPoultryForm.reset();
  }

  initializeForm() {
    this.dewormingOtherSpeciesForm = this.fb.group({
      otherSpecies: this.fb.array([]),
    });
    this.dewormingPoultryForm = this.fb.group({
      poultry: this.fb.array([]),
    });
  }

  populateForm(index: number) {
    this.masterService.loadBreeds().subscribe((res) => {
      this.breeds[index] = res;
    });

    this.masterService.loadMassSpecies().subscribe((res) => (this.species[index] = res));
  }
  male: any;
  female: any;
  total = 0;
  mixed: any;
  add(index: number) {
    console.log(index);
    //  const male= this.dewormingPoultryForm.value.poultry[0].male;
    //  const female = this.dewormingPoultryForm.value.poultry[0].female;
    var male = this.male;
    var female = this.female;
    var mixed = this.mixed;
    this.total = male + female;
    console.log('asdsad', male);
  }

  addNewPoultryDetailRow() {
    const add = this.dewormingPoultryForm.get('poultry') as FormArray;
    add.push(
      this.fb.group({
        male: new FormControl('', Validators.required),
        mixed: new FormControl('', Validators.required),
        female: new FormControl('', Validators.required),
        breedId: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        total: new FormControl('', Validators.required),
        dewormingDate: new FormControl('', Validators.required),
      })
    );
    this.populateForm(this.dewormingForPoultryTracker);
    this.dewormingForPoultryTracker++;
  }

  deletePoetryDetailRow(index: number) {
    if (index > 0) {
      const add = this.dewormingPoultryForm.get('poultry') as FormArray;
      add.removeAt(index);
      this.dewormingForPoultryTracker--;
    }
  }

  addOtherSpeciesDetailRow() {
    const push = this.dewormingOtherSpeciesForm.get('otherSpecies') as FormArray;
    push.push(
      this.fb.group({
        male: new FormControl('', Validators.required),
        female: new FormControl('', Validators.required),
        breedId: new FormControl('', Validators.required),
        speciesId: new FormControl('', Validators.required),
        animalTypeId: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        total: new FormControl('', Validators.required),
        dewormingDate: new FormControl('', Validators.required),
      })
    );
    this.populateForm(this.dewormingForOtherSpeciesTracker);
    this.dewormingForOtherSpeciesTracker++;
  }

  deleteOtherSpeciesRow(index: number) {
    if (index > 0) {
      const add = this.dewormingOtherSpeciesForm.get('otherSpecies') as FormArray;
      add.removeAt(index);
      this.dewormingForOtherSpeciesTracker--;
    }
  }

  getAnimalType(speciesId: number, index: number) {
    this.sharedService.getAnimalType(speciesId).subscribe((response) => {
      this.animalType[index] = response;
    });
  }

  saveMassRegistration() {
    const massDeworming = [];
    massDeworming.push(this.dewormingOtherSpeciesForm?.value);
    massDeworming.push(this.dewormingPoultryForm?.value);
    return massDeworming;
  }
}
