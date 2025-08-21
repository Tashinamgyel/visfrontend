import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Dzongkhags, Country, DogRegistration, MedicationData } from '@app/vis/shared/model/model';
import {
  Gewogs,
  AnimalTypes,
  OwnershipTypes,
  Species,
  Breeds,
  Villages,
  Cases,
  MassSearch,
} from '@app/master-management/models/master';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { AddMassCaseComponent } from '../add-mass-case/add-mass-case.component';
import { AddMassMedComponent } from '../add-mass-med/add-mass-med.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddMassVaccComponent } from '../add-mass-vacc/add-mass-vacc.component';

@Component({
  selector: 'app-mass-search',
  templateUrl: './mass-search.component.html',
  styleUrls: ['./mass-search.component.scss'],
})
export class MassSearchComponent implements OnInit {
  massRegistrationFormForSearch: FormGroup;
  public registered = false;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  animalTypes: AnimalTypes[];
  ownershipTypes: OwnershipTypes[];
  species: Species[];
  breeds: Breeds[];
  massRegistrationDetails: any;
  nationality: boolean;
  villages: Villages[];
  countrys: Country[];
  viewDetails: boolean;
  mobileNumberForValidation: any;

  public refreshData$ = new BehaviorSubject<boolean>(false);
  forBhutanese: any = true;
  forNonBhutanese: any = false;
  clickedData: any;
  massRegistrationNoForSearch: any;
  nationalityForShowing: any;
  nationalityChange: any;
  allMassDetails: any;
  treatmentDetails: any;
  medDetails: any;
  vaccDetails: any;
  mass: any;
  massDtls: any;
  medId: number;
  messId: number;
  massRegId: string;
  addTreatement: string;
  addtreatementDate: Date;
  addSpecies: number;
  view: boolean;
  viewVacc: boolean;
  viewMed: boolean;
  yesVacc: boolean;
  village: Villages[];
  gewog: Gewogs[];
  dzongkhag: Dzongkhags[];
  public basicPanelOpenState: any;
  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private dialog: MatDialog,
    private notification: NotificationService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
  }
  displayedColumns: string[] = ['slno', 'treatmentDate', 'treatment', 'speciesName', 'animalType', 'view'];
  dataSource = new MatTableDataSource();

  displayedColumns1: string[];

  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = [
    'slno',
    'classEntity',
    'medicineEntity',
    'dosage',
    'unit',
    'route',
    'duration',
    'frequency',
    'edit',
    'delete',
  ];

  dataSource2 = new MatTableDataSource();

  displayedColumns3: string[] = ['slno', 'vaccineName', 'edit', 'delete'];

  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = ['slno', 'massRegistrationId', 'cidNumber', 'ownerName', 'dzongkhag', 'gewog', 'view'];

  dataSource4 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;

  ngAfterViewInit() {
    this.dataSource4.paginator = this.paginator1;
    this.dataSource4.sort = this.sort1;
  }

  initializeForm() {
    this.massRegistrationFormForSearch = this.fb.group({
      nationality: new FormControl(''),
      passportNumber: new FormControl('', Validators.required),
      cidNumber: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.email),
      locality: new FormControl(''),
      ownershipTypeId: new FormControl('', Validators.required),
      villageId: new FormControl(''),
      countryId: new FormControl('', Validators.required),
      massRegistrationNo: new FormControl(''),
    });
  }

  updateMassRegistration() {
    const massSearch = new MassSearch();
    Object.assign(massSearch, this.massRegistrationFormForSearch.value);
    massSearch.massRegistrationId = this.massRegistrationFormForSearch.value.massRegistrationNo;
    this.visMasterService.updateMassRegistration(massSearch).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated successfully');
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated');
      }
    );
  }

  getMassRegistrationNumberCid() {
    var MRNCID = this.massRegistrationFormForSearch.value.massRegistrationNo;
    this.visMasterService.getByMRNCID(MRNCID).subscribe((response) => {
      this.massDtls = response;
      this.dataSource4.data = this.massDtls;
    });
  }

  viewMass(massRegistrationId: string) {
    this.view = true;
    this.populateForm();
    this.visMasterService.getMassDetails(massRegistrationId).subscribe((response) => {
      this.mass = response;
      // console.log(this.mass,"sdadsad");
      if (response.nationality === '1') {
        this.nationalityChange = 1;
        this.changeNationality(1);
      } else if (response.nationality === '2') {
        this.nationalityChange = 2;
        this.changeNationality(2);
      }
      this.getGewogs(response.dzongkhag.id);
      this.getVillage(response.gewog.id);
      if (response.village != null) {
        this.massRegistrationFormForSearch.get('villageId').setValue(response.village.id);
      }
      if (response.country != null) {
        this.massRegistrationFormForSearch.get('countryId').setValue(response.country.id);
      }
      this.massRegistrationFormForSearch.patchValue({
        nationality: this.nationalityChange,
        passportNumber: response.passportNumber,
        cidNumber: response.cidNumber,
        ownerName: response.ownerName,
        dzongkhagId: response.dzongkhag.id,
        gewogId: response.gewog.id,
        mobileNumber: response.mobileNumber,
        emailId: response.emailId,
        locality: response.locality,
        ownershipTypeId: response.ownerType.id,
      });
      this.searchMassDetails(response.massRegistrationId, response.id);
    });
  }
  searchMassDetails(massRegistrationId: string, id: number) {
    this.visMasterService.searchMassDetails(massRegistrationId, id).subscribe((res) => {
      this.allMassDetails = res;
      this.dataSource = this.allMassDetails;
    });
  }

  viewReport(speciesId: number, treatement: string, massRegistrationId: string, massId: number, treatementDate: Date) {
    this.visMasterService
      .getMassTreatmentDetails(speciesId, treatement, massRegistrationId, massId, treatementDate)
      .subscribe((res) => {
        this.treatmentDetails = res;
        this.dataSource1 = this.treatmentDetails;
        if (treatement === 'Vaccination') {
          this.displayedColumns1 = [
            'slno',
            'speciesName',
            'animalType',
            'breedName',
            'age',
            'male',
            'female',
            'mixed',
            'total',
            'vaccinationStatus',
            'edit',
            'delete',
          ];
        } else {
          this.displayedColumns1 = [
            'slno',
            'speciesName',
            'animalType',
            'breedName',
            'age',
            'male',
            'female',
            'mixed',
            'total',
            'edit',
            'delete',
          ];
        }
        this.viewDetails = true;
        if (this.treatmentDetails.length != 0) {
          let last: any = this.treatmentDetails[this.treatmentDetails.length - 1];
          this.medId = last.id;
          this.massRegId = last.mass_registration_id;
          this.messId = last.mass_id;
          this.addTreatement = last.treatement;
          this.addSpecies = last.species_id;
          this.addtreatementDate = last.treatement_date;
          console.log(this.addtreatementDate, 'this.addtreatementDate');
        }
        if (this.addTreatement === 'Vaccination') {
          this.getMassVacc(this.medId, this.massRegId);
          this.viewVacc = true;
          this.viewMed = false;
          this.view = true;
        } else {
          this.getMassMeds(this.medId, this.massRegId);
          this.viewMed = true;
          this.viewVacc = false;
          this.view = true;
        }
      });
  }

  getMassMeds(medId: number, massRegId: string) {
    this.visMasterService.getMassMedDetails(medId, massRegId).subscribe((res) => {
      this.medDetails = res;
      this.dataSource2 = this.medDetails;
    });
  }

  getMassVacc(medId: number, massRegId: string) {
    this.visMasterService.getMassVaccDetails(medId, massRegId).subscribe((res) => {
      this.vaccDetails = res;
      this.dataSource3 = this.vaccDetails;
      console.log('sdsdsdsd', this.dataSource3);
    });
  }

  editVacc(id: number) {
    const dialogRef = this.dialog.open(AddMassVaccComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        treatmentId: this.medId,
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateMassVacc(result);
      }
    });
  }

  updateMassVacc(medicationData: MedicationData) {
    medicationData.massRegistrationId = this.mass.massRegistrationId;
    medicationData.massId = this.mass.id;
    this.visMasterService.saveMassMed(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated Successfully ');
        this.getMassVacc(medicationData.treatmentId, medicationData.massRegistrationId);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  editMedication(id: number) {
    const dialogRef = this.dialog.open(AddMassMedComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        treatmentId: this.medId,
        id: id,
        treatment: this.addTreatement,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateMassMed(result);
      }
    });
  }
  updateMassMed(medicationData: MedicationData) {
    medicationData.massRegistrationId = this.mass.massRegistrationId;
    medicationData.massId = this.mass.id;
    this.visMasterService.saveMassMed(medicationData).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated Successfully ');
        this.getMassMeds(medicationData.treatmentId, medicationData.massRegistrationId);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  getVillage(gewogId: number) {
    this.visMasterService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
      // console.log(this.villages, 'Gfdgfdgfdgdfgfdgd');
    });
  }
  getGewogs(dzongkhagId: number) {
    this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  edit(id: number) {
    const dialogRef = this.dialog.open(AddMassCaseComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
        treatment: this.addTreatement,
        treatmentDate: this.addtreatementDate,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateMassCase(result);
      }
    });
  }
  updateMassCase(cases: Cases) {
    cases.massRegistrationId = this.mass.massRegistrationId;
    cases.massId = this.mass.id;
    this.visMasterService.saveMassCase(cases).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated Successfully ');
        this.viewReportCase(cases.speciesId, cases.treatment, cases.massRegistrationId, cases.massId, cases.dateDate);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be updated, please try again');
      }
    );
  }

  delete(
    id: number,
    speciesId: number,
    treatement: string,
    massRegistrationId: string,
    massId: number,
    treatementDate: Date
  ) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.visMasterService.deleteMass(id).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted Successfully');
            this.viewReportCase(speciesId, treatement, massRegistrationId, massId, treatementDate);
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be  deleted, try again');
          }
        );
      }
    });
  }

  viewReportCase(
    speciesId: number,
    treatement: string,
    massRegistrationId: string,
    massId: number,
    treatementDate: Date
  ) {
    this.visMasterService
      .getMassTreatmentDetails(speciesId, treatement, massRegistrationId, massId, treatementDate)
      .subscribe((res) => {
        this.treatmentDetails = res;
        this.dataSource1 = this.treatmentDetails;
      });
  }

  deleteMedication(id: number, massRegistrationId: string, treatmentId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.visMasterService.deleteMassMed(id).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted Successfully');
            this.getMassMeds(treatmentId, massRegistrationId);
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be  deleted, try again');
          }
        );
      }
    });
  }

  deleteVaccine(id: number, massRegistrationId: string, treatmentId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.visMasterService.deleteMassMed(id).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted Successfully');
            this.getMassVacc(treatmentId, massRegistrationId);
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be  deleted, try again');
          }
        );
      }
    });
  }
  populateForm() {
    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterService.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadBreeds().subscribe((response) => {
      this.breeds = response;
    });

    this.visMasterService.loadCountry().subscribe((response) => {
      this.countrys = response;
    });
    this.loadNationality(true);
  }
  getCitizen(cidNumber: number) {
    this.service.getCitizen(cidNumber).subscribe(
      (response) => {
        this.massRegistrationFormForSearch.patchValue({
          ownerName: response.fullName,
        });
      },
      () => {
        this.notification.openErrorSnackBar('Could not load details, please try again later');
      }
    );
  }

  // getGewogs(dzongkhagId: number) {
  //   this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
  //     this.gewogs = response;
  //   });
  // }
  // getVillage(gewogId: number) {
  //   this.visMasterService.getVillage(gewogId).subscribe((response) => {
  //     this.villages = response;
  //   });
  // // }

  getAnimalTypes(speciesId: number) {
    this.visMasterService.getAnimalTypes(speciesId).subscribe((response) => {
      this.animalTypes = response;
    });
  }

  loadNationality(event: true) {
    this.nationality = event;
  }

  changeNationality(nationalityChangeValue: any) {
    var eventValue = this.massRegistrationFormForSearch.value.nationality;
    if (nationalityChangeValue === 1) {
      eventValue = 1;
      this.massRegistrationFormForSearch.get('cidNumber').setValue('');
      this.massRegistrationFormForSearch.get('ownerName').setValue('');
      this.massRegistrationFormForSearch.get('countryId').setValue('');
    } else if (nationalityChangeValue === 2) {
      eventValue = 2;
      this.massRegistrationFormForSearch.get('passportNumber').setValue('');
      this.massRegistrationFormForSearch.get('ownerName').setValue('');
      this.massRegistrationFormForSearch.get('countryId').setValue('');
    }

    this.nationality = Number(eventValue) === 1;
    if (eventValue === 1) {
      this.forBhutanese = true;
      this.forNonBhutanese = false;
    } else if (eventValue === 2) {
      this.forBhutanese = false;
      this.forNonBhutanese = true;
    }
  }

  massConfirmation() {
    this.massRegistrationDetails = this.mass;
    this.registered = true;
  }

  printPage() {
    window.print();
  }

  getMobileNumber(whatMobileNumber: any) {
    this.mobileNumberForValidation = whatMobileNumber.value;
  }
}

// openAddModalMassCase() {
//   const dialogRef = this.dialog.open(AddMassCaseComponent, {
//     width: '800px',
//     data: {
//       actionType: 'ADD',
//       treatment: this.addTreatement,
//       speciesId: this.addSpecies,
//       id: '',
//     },
//   });
//   dialogRef.afterClosed().subscribe((result: any) => {
//     if (result) {
//       this.saveMassCase(result);
//     }
//   });
// }
// saveMassCase(cases: Cases) {
//   cases.massRegistrationId = this.mass.massRegistrationId;
//   cases.massId = this.mass.id;
//   this.visMasterService.saveMassCase(cases).subscribe(
//     () => {
//       this.notificationService.openSuccessSnackBar('Added Successfully ');
//      this.viewReportCase(cases.speciesId, cases.treatment, cases.massRegistrationId, cases.massId);
//     },
//     () => {
//       this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
//     }
//   );
// }

// openAddModalMassMedCase() {
//   const dialogRef = this.dialog.open(AddMassMedComponent, {
//     width: '800px',
//     data: {
//       actionType: 'ADD',
//       treatmentId: this.medId,
//       id: '',
//     },
//   });
//   dialogRef.afterClosed().subscribe((result: any) => {
//     if (result) {
//       this.saveMassMed(result);
//     }
//   });
// }

// saveMassMed(medicationData: MedicationData) {
//   medicationData.massRegistrationId = this.mass.massRegistrationId;
//   medicationData.massId = this.mass.id;
//   this.visMasterService.saveMassMed(medicationData).subscribe(
//     () => {
//       this.notificationService.openSuccessSnackBar('Added Successfully ');
//       this.getMassMeds(medicationData.treatmentId, medicationData.massRegistrationId);
//     },
//     () => {
//       this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
//     }
//   );
// }

// openAddModalMassVacc() {
//   const dialogRef = this.dialog.open(AddMassVaccComponent, {
//     width: '800px',
//     data: {
//       actionType: 'ADD',
//       treatmentId: this.medId,
//       id: '',
//     },
//   });
//   dialogRef.afterClosed().subscribe((result: any) => {
//     if (result) {
//       this.saveMassvacc(result);
//     }
//   });
// }

// saveMassvacc(medicationData: MedicationData) {
//   medicationData.massRegistrationId = this.mass.massRegistrationId;
//   medicationData.massId = this.mass.id;
//   this.visMasterService.saveMassMed(medicationData).subscribe(
//     () => {
//       this.notificationService.openSuccessSnackBar('Added Successfully ');
//       this.getMassVacc(medicationData.massId, medicationData.massRegistrationId);
//     },
//     () => {
//       this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
//     }
//   );
// }
