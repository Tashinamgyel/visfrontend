import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Species, AnimalTypes, Breeds } from '@app/master-management/models/master';
import { AddmedicationPopOverComponent } from './addmedication-pop-over/addmedication-pop-over.component';
import { AddmedicationForVaccinationComponent } from './addmedication-for-vaccination/addmedication-for-vaccination.component';
import { EditDataFromAddMoreComponent } from './edit-data-from-add-more/edit-data-from-add-more.component';

@Component({
  selector: 'app-add-mass',
  templateUrl: './add-mass.component.html',
  styleUrls: ['./add-mass.component.scss'],
})
export class AddMassComponent implements OnInit {
  addMassForm: FormGroup;
  species: Species[];
  speciesId: number;
  animalTypes: AnimalTypes[];
  breeds: Breeds[];
  valueFromForm: any = [];
  treatmentYesPoultry: boolean;
  treatmentNoPoultry: boolean;
  clinical: boolean;
  deworming: boolean;
  vaccination: boolean;
  mixedHidden: boolean = true;
  femaleHidden: boolean = true;
  maleHidden: boolean = true;
  totalData: any
  addmoreId:any
  ageForPoultry: boolean = false;
  ageForOthers: boolean = false;
  initialAgeForPoultry: boolean = true;
  valueFromVaccinationForm: any;
  dataFromAddMore: any = [];
  numberOfAnimalsToHide: boolean = false;
  valueFromFormClinical: boolean = false;
  valueFromFormDeworming: boolean = false;
  today = new Date();
  numberOfAnimalMedicated: boolean = false;
  numberOfAnimalVaccinated: boolean = false;
  VaccineType: any;

  constructor(
    public dialogRef: MatDialogRef<AddMassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: MasterService,
    private sharedService: SharedService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
  }
  initializeForm() {
    this.addMassForm = this.fb.group({
      // dzongkhagId: new FormControl('', Validators.required),
      treatementDate: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required),
      animalTypeId: new FormControl('', Validators.required),
      breedId: new FormControl('', Validators.required),
      treatment: new FormControl('', Validators.required),
      male: new FormControl(''),
      female: new FormControl(''),
      mixed: new FormControl(''),
      total: new FormControl(''),
      age: new FormControl(''),
      notVaccinated: new FormControl(''),
      reasons: new FormControl(''),
      vaccinationState: new FormControl(''),
    });
  }
  populateForm() {
    this.service.loadBreeds().subscribe((res) => {
      this.breeds = res;
    });

    this.service.loadMassSpecies().subscribe((response) => {
      this.species = response;
    });
    this.service.loadVaccineType().subscribe((res) => {
      this.VaccineType = res;
    });
  }

  getAnimalType(speciesId: any) {
    this.sharedService.getAnimalType(speciesId.id).subscribe((response) => {
      this.animalTypes = response;
    });

    if (speciesId.speciesName === 'Poultry' || speciesId.speciesName === 'poultry' ) {
      this.treatmentYesPoultry = true;
      this.treatmentNoPoultry = false;

      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = true;

      this.ageForPoultry = true;
      this.ageForOthers = false;
      this.initialAgeForPoultry = false;

    }else if ( speciesId.speciesName === 'Swine' || speciesId.speciesName === 'Swine'  || speciesId.speciesName === 'Ovine' || speciesId.speciesName === 'Ovine' || speciesId.speciesName === 'Aquatic' || speciesId.speciesName === 'Aquatic' || speciesId.speciesName === 'Bovine' || speciesId.speciesName === 'Bovine') {
      this.treatmentYesPoultry = true;
      this.treatmentNoPoultry = false;

      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;

      this.ageForPoultry = false;
      this.ageForOthers = true;
      this.initialAgeForPoultry = false;
      
    } else {
      this.treatmentYesPoultry = false;
      this.treatmentNoPoultry = true;

      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;

      this.ageForPoultry = false;
      this.ageForOthers = true;
      this.initialAgeForPoultry = false;
    }
  }

  treatmentCheck(event: any) {
    var addMassFormData = this.addMassForm.value.treatment;
    if (addMassFormData === 'Deworming' || addMassFormData === 'deworming') {
      this.numberOfAnimalMedicated = true;
      this.numberOfAnimalVaccinated = false;
      this.clinical = false;
      this.deworming = true;
      this.vaccination = false;
    } else if (addMassFormData === 'Vaccination' || addMassFormData === 'vaccination') {
      this.numberOfAnimalMedicated = false;
      this.numberOfAnimalVaccinated = true;
      this.clinical = false;
      this.deworming = false;
      this.vaccination = true;
    } else if (addMassFormData === 'Clinical' || addMassFormData === 'clinical') {
      this.numberOfAnimalMedicated = true;
      this.numberOfAnimalVaccinated = false;
      this.clinical = true;
      this.deworming = false;
      this.vaccination = false;
    }
  }

  addMedication(value: any) {
    const dialogRef = this.dialog.open(AddmedicationPopOverComponent, {
      width: '800px',
      position: { top: '5%', left: '25%' },

      data: {
        actionType: 'ADD',
        id: '',
        data: value,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.valueFromForm.push(result.data);
      if (this.valueFromForm != null) {
        this.valueFromFormClinical = true;
        this.valueFromFormDeworming = true;
      } else {
        this.valueFromFormClinical = null;
        this.valueFromFormDeworming = null;
      }
    });
  }

  delete(element: number) {
    this.valueFromForm.splice(element, 1);
  }

  choose(event: any) {
    if (event === 'male' || event === 'Male') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.addMassForm.value.male) + Number(this.addMassForm.value.female);
    } else if (event === 'female' || event === 'Female') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.addMassForm.value.male) + Number(this.addMassForm.value.female);
    } else if (event === 'mixed' || event === 'Mixed') {
      this.maleHidden = false;
      this.femaleHidden = false;
      this.mixedHidden = true;
      this.totalData = this.addMassForm.value.mixed;
    }

    this.addMassForm.patchValue({
      total: this.totalData,
    });
  }

  addMedicationForVaccination() {
    const dialogRef = this.dialog.open(AddmedicationForVaccinationComponent, {
      width: '50%',
      position: { top: '5%', left: '25%' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.valueFromVaccinationForm = [result.data];
    });
  }

  deleteForVaccination(element: number) {
    this.valueFromVaccinationForm.splice(element, 1);
  }

  DontShow: boolean = false;
  addMoreButton() {
    if (
      this.addMassForm.value.age != '' &&
      this.addMassForm.value.animalTypeId != '' &&
      this.addMassForm.value.breedId != '' &&
      this.addMassForm.value.speciesId != '' &&
      this.addMassForm.value.total != '' &&
      this.addMassForm.value.treatementDate != '' &&
      this.addMassForm.value.treatment != ''
      // && this.addMassForm.value.vaccinationState != ''
    ) {
      this.dataFromAddMore.push(this.addMassForm.value);

      if (this.dataFromAddMore != null) {
        this.numberOfAnimalsToHide = true;
      } else {
        this.numberOfAnimalsToHide = false;
      }

      this.addMassForm.patchValue({
        age: '',
        male: '',
        female: '',
        mixed: '',
        total: '',
        vaccinationState: '',
        notVaccinated: '',
        reasons: '',
      });
    } else {
      this.notification.openErrorSnackBar('Please enter all the required data');
    }
  }

  refreshForm() {
    this.addMassForm.patchValue({
      male: '',
      female: '',
      mixed: '',
    });
    this.maleHidden = true;
    this.femaleHidden = true;
    this.mixedHidden = true;
  }

  deleteDataFromAddMore(element: number) {
    this.dataFromAddMore.splice(element, 1);
  }

  addMass() { 
    if (
      this.addMassForm.value.animalTypeId != '' &&
      this.addMassForm.value.breedId != '' &&
      this.addMassForm.value.speciesId != '' &&
      this.addMassForm.value.treatementDate != '' &&
      this.addMassForm.value.treatment != ''
    ) {
      this.dialogRef.close({
        data: this.dataFromAddMore,
        medicationData: this.valueFromForm,
        vaccination: this.valueFromVaccinationForm,
      });
    } else {
      this.notification.openErrorSnackBar('Please enter all the required data');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  editDataFromAddMore(value: any) {
    var size = value + 1;
    var pushEditData = this.dataFromAddMore.slice(value, size);
    const dialogRef = this.dialog.open(EditDataFromAddMoreComponent, {
      width: '800px',
      position: { top: '5%', left: '25%' },
      data: {
        data: pushEditData,
        spliceIndex: value,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.updateCanges(result.spliceIndex, result.data);
    });
  }

  updateCanges(spliceIndex: any, newData: any) {
    this.dataFromAddMore.splice(spliceIndex, 1, newData);
  }
}
