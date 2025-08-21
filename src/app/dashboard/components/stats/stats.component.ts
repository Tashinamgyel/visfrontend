import { Component, Input, OnInit, Inject } from '@angular/core';
import { StatData } from '@app/dashboard/models/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';
import { ReportRequest } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  dashboadCounts: FormGroup;
  @Input() clinical: StatData;
  @Input() sterilization: StatData;
  @Input() deworming: StatData;
  @Input() vaccination: StatData;

  dpmCount: any;
  mdvCount: any;
  clinicals: any;
  sterilizations: any;
  dewormings: any;
  vaccinations: any;
  dog: any;
  others: any;
  flash: any;
  ongoing: any;
  resolved: any;
  massClinical: any;
  massDeworming: any;
  massVaccination: any;
  maxDate = new Date();
  fromDate: string;
  toDate: string;
  counts: any;
  constructor(
    //public dialogRef: MatDialogRef<AddFlashCaseComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private masterService: MasterService,
    private visMasterService: SharedService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
    //   this.visMasterService.getAllDPM().subscribe((response) => {
    //   this.dpmCount = response;
    //   console.log(this.dpmCount,"this.dpmCountthis.dpmCount");
    // });
    // this.visMasterService.getAllMDV().subscribe((response) => {
    //   this.mdvCount = response.length;
    // });
  }

  initializeForm() {
    this.dashboadCounts = this.fb.group({
      fromDate: new FormControl(''),
      toDate: new FormControl('', Validators.required),
    });
  }

  populateForm() {}

  getCounts() {
    debugger;
    const dashCounts = new ReportRequest();
    Object.assign(dashCounts, this.dashboadCounts.value);
    this.visMasterService.getDashCounts(dashCounts).subscribe((res) => {
      this.counts = res;
      console.log(res, 'asdadada');
      for (let i = 0; i < res.length; i++) {
        if (this.counts[i].table_name === 'dpm') {
          this.dpmCount = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'mdv') {
          this.mdvCount = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'clinical') {
          this.clinicals = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'sterilization') {
          this.sterilizations = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'deworming') {
          this.dewormings = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'vaccination') {
          this.vaccinations = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'dog') {
          this.dog = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'others') {
          this.others = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'flash') {
          this.flash = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'ongoing') {
          this.ongoing = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'resolved') {
          this.resolved = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'massClinical') {
          this.massClinical = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'massDeworming') {
          this.massDeworming = this.counts[i].dashboad_counts;
        } else if (this.counts[i].table_name === 'massVaccination') {
          this.massVaccination = this.counts[i].dashboad_counts;
        }
      }
    });
  }
}

//   this.visMasterService.getAllDPM().subscribe((response) => {
//   this.dpmCount = response;

//   console.log(this.dpmCount,"this.dpmCountthis.dpmCount");
// });

// this.service.getCitizen(cid).subscribe(
//   (response) => {
//     if (response != null) {
//       this.petRegistrationForm.patchValue({
//         ownerName: response.fullName,
//       });
//     } else {
//       this.petRegistrationForm.patchValue({
//         ownerName: '',
//       });
//     }
//   },
//   () => {
//     this.notification.openErrorSnackBar('Could not load details, please try again later');
//   }
// );
