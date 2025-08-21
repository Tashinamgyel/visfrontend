import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/auth/services/credentials.service';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-clinical-certificate',
  templateUrl: './clinical-certificate.component.html',
  styleUrls: ['./clinical-certificate.component.scss'],
})
export class ClinicalCertificateComponent implements OnInit {
  [x: string]: any;
  ownerDetails: any;
  ownerCidNumnber: any;
  ownerName: any;
  ownerDzongkhang: any;
  ownerGewog: any;
  ownerVillage: any;
  ownerLocality: any;
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
  userDetails: any;
  centre: any;
  useCenter: any;
  jurisdiction: any;
  constructor(
    public dialogRef: MatDialogRef<ClinicalCertificateComponent>,
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

    // this.getMedicationData();
    this.populateForm();
  }
  populateForm() {
    debugger;

    this.masterService.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
      this.useCenter = this.userDetails.centre.centre;
      console.log(this.useCenter, 'fgfgfgf');
      console.log(res, 'fgfgfgf');
    });
  }

  gettingOwnerDetails() {
    this.ownerDetails = JSON.parse(localStorage.getItem('ownerDetails'));
    this.ownerCidNumnber = this.ownerDetails.cidNumber;
    this.ownerName = this.ownerDetails.ownerName;
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
    this.ownerVillage = this.ownerDetails.village.villageName;
    this.ownerDzongkhang = this.ownerDetails.dzongkhag.dzongkhagName;
    this.animalYear = this.ownerDetails.year;
    this.animalSex = this.animalDetails.sex;
    this.animalBodyWeight = this.ownerDetails.bodyweight;
  }
  clinicalTestData: any;
  mediacDetails: any;
  systemName: any;
  conditions: any;
  finalConditions: any;
  conditionName: any;
  dontShow: boolean = false;
  finalSystemName: any;
  finalConditionsName: any;
  getClinicalDetails() {
    this.systemName = this.data.printSystemName;
    (this.conditionName = this.data.printConditionsName),
      (this.finalSystemName = this.data.finalSystemName),
      (this.finalConditionsName = this.data.printFinalConditions);
    this.clinicalDetails = this.data.clinicalData;

    // if(this.finalConditionsName =="" ||   this.conditionName !=''){
    //   this.conditionName = this.data.conditions
    //   this.dontShow = true;
    // }
    this.mediacDetails = this.data.medicationData;
    this.clinicalTestData = this.clinicalDetails.clinicalTest;
    this.clinicalAdvice = this.clinicalDetails.advice;
    this.clinicalAnamnesis = this.clinicalDetails.anamnesisHistory;
    this.clinicalObservation = this.clinicalDetails.observation;
    this.clinicalTentative = this.clinicalDetails.differentialDiagnosis;
    //this.systemName = this.clinicalDetails.species.system.systemName,
    this.clinicalFinalDiagnosis = this.clinicalDetails.differentialDiagnosis;
    this.clinicalTreatmentProcedure = this.clinicalDetails.procedures;
    this.clinicalTreatmentMedications = this.clinicalDetails;
    this.treatmentDate = this.clinicalDetails.treatmentDate;
  }
}
