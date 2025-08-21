import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { AnimalTypes, Species } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-edit-data-from-add-more',
  templateUrl: './edit-data-from-add-more.component.html',
  styleUrls: ['./edit-data-from-add-more.component.scss'],
})
export class EditDataFromAddMoreComponent implements OnInit {
  editFrom: FormGroup;
  mixedHidden: boolean = true;
  femaleHidden: boolean = true;
  maleHidden: boolean = true;
  animalTypes: AnimalTypes[];
  totalData: any;
  species: Species[];
  ageForPoultry: boolean = true;
  ageForOthers: boolean = false;
  VaccineType: any;
  initialAgeForPoultry: any;
  constructor(
    public dialogRef: MatDialogRef<EditDataFromAddMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAnimalType(this.data.data[0].speciesId);
    this.editFrom.patchValue({
      treatementDate: this.data.data[0].treatementDate,
      speciesId: this.data.data[0].speciesName,
      animalTypeId: this.data.data[0].animalTypeId.id,
      breedId: this.data.data[0].breedId.id,
      treatment: this.data.data[0].treatment,
      age: this.data.data[0].age,
      male: this.data.data[0].male,
      female: this.data.data[0].female,
      mixed: this.data.data[0].mixed,
      total: this.data.data[0].total,
    });
  }

  initializeForm() {
    this.editFrom = this.fb.group({
      treatementDate: new FormControl(''),
      speciesId: new FormControl(''),
      animalTypeId: new FormControl(''),
      breedId: new FormControl(''),
      treatment: new FormControl(''),
      male: new FormControl(''),
      female: new FormControl(''),
      mixed: new FormControl(''),
      total: new FormControl(''),
      age: new FormControl(''),
    });
  }

  refreshForm() {
    this.editFrom.patchValue({
      male: '',
      female: '',
      mixed: '',
    });

    this.maleHidden = true;
    this.femaleHidden = true;
    this.mixedHidden = true;
  }

  choose(event: any) {
    if (event === 'male' || event === 'Male') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.editFrom.value.male) + Number(this.editFrom.value.female);
    } else if (event === 'female' || event === 'Female') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.totalData = Number(this.editFrom.value.male) + Number(this.editFrom.value.female);
    } else if (event === 'mixed' || event === 'Mixed') {
      this.maleHidden = false;
      this.femaleHidden = false;
      this.mixedHidden = true;
      this.totalData = this.editFrom.value.mixed;
    }

    this.editFrom.patchValue({
      total: this.totalData,
      speciesId: this.data.data[0].speciesName,
      animalTypeId: this.data.data[0].animalTypeId.id,
      breedId: this.data.data[0].breedId.id,
    });
  }

  getAnimalType(speciesId: any) {
    this.sharedService.getAnimalType(speciesId.id).subscribe((response) => {
      this.animalTypes = response;
    });

    if (speciesId.speciesName === 'Poultry' || speciesId.speciesName === 'poultry') {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = true;
      this.ageForPoultry = true;
      this.ageForOthers = false;
      this.initialAgeForPoultry = false;
    } else {
      this.maleHidden = true;
      this.femaleHidden = true;
      this.mixedHidden = false;
      this.ageForPoultry = false;
      this.ageForOthers = true;
      this.initialAgeForPoultry = false;
    }
  }

  update() {
    if (this.editFrom.value.age != '' && this.editFrom.value.total != '') {
      console.log('data to check', {
        data: this.editFrom.value,
        otherData: this.data.data,
        spliceIndex: this.data.spliceIndex,
      });
      this.dialogRef.close({
        data: this.editFrom.value,
        otherData: this.data.data,
        spliceIndex: this.data.spliceIndex,
      });
    } else {
      this.notification.openErrorSnackBar('Please enter all the required data');
    }
  }
}
