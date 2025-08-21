import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/auth/services/credentials.service';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-clinical-followup-certificate',
  templateUrl: './clinical-followup-certificate.component.html',
  styleUrls: ['./clinical-followup-certificate.component.scss'],
})
export class ClinicalFollowupCertificateComponent implements OnInit {
  [x: string]: any;
  ownerDetails: any;
  ownerCidNumnber: any;
  ownerName: any;
  ownerDzongkhang: any;
  ownerGewog: any;
  ownerVillage: any;
  ownerLocality: any;
  jurisdiction: any;

  // for animal details
  animalDetails: any;

  animalPIDNumber: any;
  animalName: any;
  animalSpecies: any;
  animalType: any;
  animalBreed: any;
  animalAge: any;
  animalSex: any;
  animalBodyWeight: any;
  animalYear: any;
  animalDay: any;
  animalMonth: any;

  // clinical details
  clinicalDetails: any;

  clinicalAnamnesis: any;
  clinicalObservation: any;
  clinicalTentative: any;
  clinicalDiagnosticTest: any;
  clinicalFinalDiagnosis: any;
  clinicalTreatmentProcedure: any;
  clinicalTreatmentMedications: any;
  clinicalAdvice: any;
  finalDignostic: any;
  patientId: any;
  treatmentDate: any;
  useCenter: string;
  userDetails: any;
  constructor(
    public dialogRef: MatDialogRef<ClinicalFollowupCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SharedService,
    private masterService: MasterService,
    private credentialsService: CredentialsService,
    private dialog: MatDialog,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.gettingOwnerDetails();
    this.gettingAnimalDetails();
    this.getClinicalDetails();
    this.populateForm();
  }
  populateForm() {
      this.masterService.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
      this.useCenter = this.userDetails.centre.centre;
    });
  }
  gettingOwnerDetails() {
    this.ownerDetails = JSON.parse(localStorage.getItem('ownerDetails'));
    //console.log('ownerDetails', this.ownerDetails);

    this.ownerCidNumnber = this.ownerDetails.cidNumber;
    this.ownerName = this.ownerDetails.ownerName;
    this.ownerDzongkhang = this.ownerDetails.dzongkhag.dzongkhagName;
    this.ownerGewog = this.ownerDetails.gewog.gewogName;
    this.ownerVillage = this.ownerDetails.village.villageName;
    this.ownerLocality = this.ownerDetails.locality;
    this.jurisdiction = this.ownerDetails.jurisdiction;
  }

  gettingAnimalDetails() {
    this.animalDetails = JSON.parse(localStorage.getItem('ownerDetails'));
    this.animalPIDNumber = this.animalDetails.patientId;
    this.animalName = this.animalDetails.animalName;
    this.animalSpecies = this.animalDetails.species.speciesName;
    this.animalType = this.animalDetails.animalType.animalType;
    this.animalBreed = this.animalDetails.breed.breedName;
    this.animalDay = this.ownerDetails.day;
    this.animalMonth = this.ownerDetails.month;
    this.animalYear = this.ownerDetails.year;
    this.animalSex = this.animalDetails.sex;
    this.animalBodyWeight = this.ownerDetails.bodyweight;
  }
  dontShow: boolean = false;
  clinicalTestData: any;
  mediacDetails: any;
  finalConditions: any;
  systemName: any;
  finalSystemName: any;

  conditionName: any;
  finalConditionsName: any;
  getClinicalDetails() {
    console.log("this.data.clinicalData",this.data.clinicalData);
    
    this.clinicalDetails = this.data.clinicalData;
    this.mediacDetails = this.data.medicationData;
    this.systemName = this.data.printSystemName;
    this.systemName = this.data.printSystemName;
    (this.conditionName = this.data.printConditionsName),
    (this.finalSystemName = this.data.finalSystemName),
    (this.finalConditionsName = this.data.printFinalConditions);
    this.clinicalDetails = this.data.clinicalData;

    this.clinicalAnamnesis = this.clinicalDetails.anamnesisHistory;
    this.clinicalObservation = this.clinicalDetails.observation;
    this.clinicalTentative = this.clinicalDetails.differentialDiagnosis;
    this.clinicalDiagnosticTest = this.clinicalDetails.systemName;
    this.clinicalFinalDiagnosis = this.clinicalDetails.systemId;
    this.clinicalTreatmentProcedure = this.clinicalDetails.procedures;
    this.clinicalTreatmentMedications = this.clinicalDetails;
    this.clinicalAdvice = this.clinicalDetails.advice;
    this.clinicalTestData = this.clinicalDetails.clinicalTest;
    this.treatmentDate = this.clinicalDetails.treatmentDate;
  }
}
