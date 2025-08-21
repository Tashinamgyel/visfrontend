import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clinical } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { NotificationService } from '@core';
import { MasterService } from '@app/master-management/services/master.service';
import { Router } from '@angular/router';
import { Reaction, VaccineType } from '@app/master-management/models/master';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss'],
})
export class VaccinationComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private notification: NotificationService,
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.registrationId = this.registrationDetails['id'];
    this.patientId = this.registrationDetails['patientId'];
    this.animalTypeId = this.registrationDetails['animalType']['id'];
    this.populateForm();

    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormVaccinationData'));
    if (registrationFormData != null) {
      this.formFillUp();
    }
  }

  formFillUp() {
    // console.log('treatmentFormVaccinationData', JSON.parse(localStorage.getItem('treatmentFormVaccinationData')));
    var registrationFormData = JSON.parse(localStorage.getItem('treatmentFormVaccinationData'));
    this.treatmentForm.patchValue({
      observation: registrationFormData.observation,
      advice: registrationFormData.advice,
      treatmentDate: registrationFormData.treatmentDate,
      reactionId: registrationFormData.reactionId,
      dueDate: registrationFormData.dueDate,
      remarks: registrationFormData.remarks,
      reactionDetail: registrationFormData.reactionDetail,
      registrationId: registrationFormData.registrationId,
      vaccineTypeId: registrationFormData.vaccineTypeId,
    });
  }

  initializeForm() {
    this.treatmentForm = this.fb.group({
      vaccineTypeId: new FormControl('', Validators.required),
      observation: new FormControl(''),
      advice: new FormControl('', Validators.required),
      treatmentDate: new FormControl('', Validators.required),
      reactionId: new FormControl(null),
      dueDate: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      registrationId: new FormControl(''),
      reactionDetail: new FormControl(''),
    });
  }

  populateForm() {
    this.masterService.loadVaccineType().subscribe((res) => (this.vaccineType = res));

    this.masterService.loadReaction().subscribe((res) => (this.reactions = res));
  }

  changeReactionDetail(event: MatRadioChange) {
    this.reactionDetail = Number(event.value) === 1;
  }

  saveVaccination() {
    debugger
    if (
      this.treatmentForm.value.vaccineTypeId === '' &&
      this.treatmentForm.value.dueDate === '' &&
      this.treatmentForm.value.treatmentDate === ''
      // this.treatmentForm.value.reactionId !== ''
    ) {
      this.notification.openErrorSnackBar('Enter all the datas');
    } else {
      const clinical = new Clinical();
      Object.assign(clinical, this.treatmentForm.value);
      clinical.patientId = this.patientId;
      clinical.treatment = 'Vaccination';
      clinical.registrationId = this.registrationId;
      //clinical.medicationData = this.medicationForm.value.medication;

      clinical.petRegistrationNumber = this.registrationDetails.petRegistrationNumber;
      clinical.microchipNumber = this.registrationDetails.microchipNumber;

      
      if(clinical.reactionId = this.treatmentForm.value.reactionId){
        clinical.reactionId = this.treatmentForm.value.reactionId;
      }
     
      if (this.treatmentForm.value.reactionId == null) {
        clinical.reactionId == 0;
      }
      this.service.saveVaccination(clinical).subscribe(
        () => {
          this.notification.openSuccessSnackBar('Completed successfully ');
          localStorage.removeItem('treatmentFormVaccinationData');
          this.router.navigate(['/', 'dashboard']);
        },
        () => {
          this.notification.openErrorSnackBar('Enter required fields');
        }
      );
    }
  }

  printPage() {
    window.print();
  }

  saveVaccinationDraftData() {
    localStorage.setItem('treatmentFormVaccinationData', JSON.stringify(this.treatmentForm.value));
    this.notification.openSuccessSnackBar('successfully saved as draft');
  }
}
