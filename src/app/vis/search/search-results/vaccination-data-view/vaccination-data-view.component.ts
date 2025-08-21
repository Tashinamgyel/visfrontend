import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { NotificationService } from '@app/@core';
import { Reaction, VaccineType } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { Clinical } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-vaccination-data-view',
  templateUrl: './vaccination-data-view.component.html',
  styleUrls: ['./vaccination-data-view.component.scss'],
})
export class VaccinationDataViewComponent implements OnInit {
  treatmentForm: FormGroup;
  // medicationForm: FormGroup;
  clinical: Clinical;
  vaccineType: VaccineType[];
  reactions: Reaction[];
  treatment: string;
  registrationId: number;
  reactionDetail: boolean;
  patientId: string;
  maxDate = new Date();
  minDate = new Date();
  animalTypeId: number;
  @Input() registrationDetails: any;
  @Input() editable = false;
  vaccineTypeId: any;
  reactionId: any;

  vaccinationDateTreatmentDate: any;
  vaccinationDateDueDate: any;

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private notification: NotificationService,
    private masterService: MasterService,
    private router: Router,
    public dialogRef: MatDialogRef<VaccinationDataViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.formFillUp();
    this.populateForm();
  }

  formFillUp() {
    debugger;
    var registrationFormData = this.data.vaccinationData;
    if (registrationFormData.reactionId == null) {
      this.reactionId = 0;
    }
    // var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormVaccinationData'));
    (this.vaccinationDateTreatmentDate = registrationFormData.treatmentDate),
      (this.vaccinationDateDueDate = registrationFormData.dueDate),
      this.treatmentForm.patchValue({
        vaccineTypeId: registrationFormData.vaccineType.vaccineName,
        observation: registrationFormData.observation,
        advice: registrationFormData.advice,
        reactionDetail: registrationFormData.reactionDetail,
        registrationId: registrationFormData.registrationId,
        reactionId: registrationFormData.reaction.id,
      });
  }

  initializeForm() {
    this.treatmentForm = this.fb.group({
      vaccineTypeId: new FormControl(''),
      observation: new FormControl(''),
      advice: new FormControl(''),
      treatmentDate: new FormControl(''),
      reactionId: new FormControl(''),
      dueDate: new FormControl(''),
      remarks: new FormControl(''),
      registrationId: new FormControl(),
      reactionDetail: new FormControl(''),
    });

    // this.medicationForm = this.fb.group({
    //   medication: this.fb.array([]),
    // });
  }
  donthow: boolean = true;
  populateForm() {
    this.masterService.loadVaccineByAnimalType(this.animalTypeId).subscribe((response) => {
      this.vaccineType = response;
      this.treatmentForm.patchValue({
        vaccineTypeId: response,
      });
    });
    this.masterService.loadVaccineType().subscribe((res) => (this.vaccineType = res));
    debugger;
    this.masterService.loadReaction().subscribe((res) => (this.reactions = res));
  }
  changeReactionDetail(event: MatRadioChange) {
    this.reactionDetail = Number(event.value) === 1;
    this.donthow = true;
  }

  saveVaccination() {
    const clinical = new Clinical();
    Object.assign(clinical, this.treatmentForm.value);
    clinical.patientId = this.patientId;
    clinical.treatment = 'Vaccination';
    clinical.registrationId = this.registrationId;
    //clinical.medicationData = this.medicationForm.value.medication;
    this.service.saveVaccination(clinical).subscribe(
      () => {
        this.notification.openSuccessSnackBar('Vaccination successfully added');
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.notification.openErrorSnackBar('Vaccination details could not be saved, Please try again');
      }
    );
  }

  printPage() {
    window.print();
  }

  saveVaccinationDraftData() {
    // console.log('this.treatmentForm.value', this.treatmentForm.value);
    localStorage.setItem('treatmentFormVaccinationData', JSON.stringify(this.treatmentForm.value));
    this.notification.openSuccessSnackBar('successfully saved as draft');
  }
}
