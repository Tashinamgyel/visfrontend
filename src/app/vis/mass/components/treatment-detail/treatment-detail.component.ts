import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MassData } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Router } from '@angular/router';
import { NotificationService } from '@core';
import { MatDialog } from '@angular/material/dialog';
import { AddMassComponent } from '../add-mass/add-mass.component';
import { PrintTreatmentDetailComponent } from './print-treatment-detail/print-treatment-detail.component';
import { MassConfirmationComponent } from '../mas-registration/mass-confirmation/mass-confirmation.component';

@Component({
  selector: 'treatment-details',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.scss'],
})
export class TreatmentDetailComponent implements OnInit {
  treatmentForm: FormGroup;
  treatmentType = '';
  @Input() massRegistrationDetails: any;
  registrationId: string;
  id: number;
  valueFormFroDisplaying: any;
  massTableData: any;
  medicationTableData: any;
  showWhenViewClicked: boolean = false;
  valueFromForm: any = [];
  zeroData: any = '';

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registrationId = this.massRegistrationDetails['massRegistrationId'];
    this.id = this.massRegistrationDetails['id'];
    this.initializeForm();
  }

  /**
   * @description Function to initialize treatForm
   * @return void
   */
  initializeForm(): void {
    this.treatmentForm = this.fb.group({
      poultry: new FormControl(''),
      other: new FormControl(''),
      clinicalPoultry: new FormControl(''),
    });
  }
  massConfirmation() {
    const dialogRef = this.dialog.open(MassConfirmationComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.saveMassRegistration();
      } else if (result === 2) {
        console.log('no');
      }
    });
  }

  saveMassRegistration() {
    const mass: MassData = {};
    mass.id = this.id;
    mass.massRegistrationId = this.registrationId;
    mass.massDetails = this.valueFromForm;
    if (this.valueFromForm != '') {
      this.sharedService.submitMassTreatment(mass).subscribe(

        (res) => {

          console.log("Sdsdsds",res);
           console.log('response for massRegistration', res);
          this.router.navigate(['/', 'dashboard']);
          this.notification.openSuccessSnackBar('Submitted Successfully');
        },
        () => {
          this.notification.openErrorSnackBar('Could not be Submitted, Please try again');
        }
      );
    } else {
      this.notification.openErrorSnackBar('Please enter all the required data');
    }
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddMassComponent, {
      width: '1000px',
      position: { top: '5%', left: '25%' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.valueFromForm.push(result);
        //console.log('AddMassComponent', this.valueFromForm);
      } else {
      }
    });
  }

  delete(element: number) {
    this.valueFromForm.splice(element, 1);
  }

  printPage() {
    const dialogRef = this.dialog.open(PrintTreatmentDetailComponent, {
      width: '800px',
      height: '100%',
      data: {
        massTableData: this.valueFromForm,
      },
    });
  }

  view(index: any) {
    this.showWhenViewClicked = true;
    var size = index + 1;
    // console.log('value', this.valueFromForm.slice(index, size));
    this.valueFormFroDisplaying = this.valueFromForm.slice(index, size);
    this.massTableData = this.valueFormFroDisplaying[0].data;
    this.medicationTableData = this.valueFormFroDisplaying[0].medicationData;
    //console.log('asdasdsad', this.massTableData, this.medicationTableData);
  }

  hideShowWhenViewClicked() {
    this.showWhenViewClicked = false;
  }
}
