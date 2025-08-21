import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-treatment-details-pop',
  templateUrl: './treatment-details-pop.component.html',
  styleUrls: ['./treatment-details-pop.component.scss'],
})
export class TreatmentDetailsPopComponent implements OnInit {
  treatmentDetails: FormGroup;

  caseDetails: any;
  medDetails: any;

  displayedColumns1: string[] = [
    'slno',
    'className',
    'medicineName',
    // 'composition',
    //'presentation',
    'dosage',
    'unitType',
    'routeName',
    'frequencyName',
    'duration',
  ];
  dataSource1 = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TreatmentDetailsPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MasterService
  ) {}

  ngOnInit(): void {
    this.initializeFormTreatement();
    this.populateChanges();
  }

  initializeFormTreatement() {
    this.treatmentDetails = this.fb.group({
      treatmentDate: new FormControl(''),
      anamnesisHistory: new FormControl(''),
      observation: new FormControl(''),
      systemName: new FormControl(''),
      conditions: new FormControl(''),
      finalSystemName: new FormControl(''),
      finalConditions: new FormControl(''),
      differentialDiagnosis: new FormControl(''),
      clinicalTest: new FormControl(''),
      procedures: new FormControl(''),
      remarks: new FormControl(''),
      advice: new FormControl(''),
    });
  }

  populateChanges() {
    this.caseDetails = this.data.dataToSend;
    this.treatmentDetails.patchValue({
      treatmentDate: this.caseDetails.treatmentDate,
      anamnesisHistory: this.caseDetails.anamnesisHistory,
      observation: this.caseDetails.observation,
      systemName: this.caseDetails.systems.systemName,
      conditions: this.caseDetails.conditions.conditions,
      finalSystemName: this.caseDetails.finalSystems.systemName,
      finalConditions: this.caseDetails.finalConditions.conditions,
      differentialDiagnosis: this.caseDetails.differentialDiagnosis,
      clinicalTest: this.caseDetails.clinicalTest,
      procedures: this.caseDetails.procedures,
      remarks: this.caseDetails.remarks,
      advice: this.caseDetails.advice,
    });
    this.viewCaseMedDetails(this.caseDetails.registrationId, this.caseDetails.caseId, this.caseDetails.id);
  }

  viewCaseMedDetails(registrationId: number, caseId: number, followCaseId: number) {
    // this.service.getClinicalCaseMedDetails(caseId).subscribe((res) => {

    this.service.getfollowUpCaseMedDetails(registrationId, caseId, followCaseId).subscribe((res) => {
      console.log('resdddsdsds', res);
      this.medDetails = res;
      this.dataSource1.data = this.medDetails;
    });
  }
}
