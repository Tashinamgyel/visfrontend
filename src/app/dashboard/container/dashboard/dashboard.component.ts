import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CredentialsService } from '@app/auth';
import { DashboardService } from '@app/dashboard/services/dashboard-service';
import { Observable } from 'rxjs';
import { Staff, StatData, Task, ViewTask } from '@app/dashboard/models/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '@app/vis/shared/components/profile/profile.component';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public underCorpusData$: Observable<StatData>;
  public ongoingData$: Observable<StatData>;
  public appealedData$: Observable<StatData>;
  public closedData$: Observable<StatData>;
  public staffPresentStatus$: Observable<Staff[]>;
  public userPendingTasks$: Observable<Task[]>;
  public totalCases$: Observable<StatData>;
  credentials = this.credentialsService.credentials;
  isLoading = false;
  showingImage: any;
  showIfNCAH: boolean = false;
  userCredentials: any;
  currentUserName: any;
  userDetails: any;
  isNCAH: boolean;

  constructor(
    private service: DashboardService,
    private credentialsService: CredentialsService,
    private router: Router,
    private visMasterservice: SharedService,
    public dialog: MatDialog,
    private masterService: MasterService
  ) {
    this.currentUserName = this.credentialsService.credentials.userName;
  }

  ngOnInit(): void {
    this.masterService.loadAllUserDetails(this.currentUserName).subscribe((res) => {
      this.userDetails = res;
      for (let i = 0; i < this.userDetails.userRole.length; i++) {
        if (this.userDetails.userRole[i].role.roleName === 'NCAH') {
          this.isNCAH = true;
        }
        // } else {
        //   this.isNCAH = false;
        // }
      }
    });

    this.isLoading = true;
    this.underCorpusData$ = this.service.loadUnderCorpusData();
    this.ongoingData$ = this.service.loadOngoingData();
    this.appealedData$ = this.service.loadAppealedData();
    this.closedData$ = this.service.loadClosedData();
    this.staffPresentStatus$ = this.service.loadStaffPresentStatus();
    this.totalCases$ = this.service.loadTotalCases();
    this.isLoading = false;
  }

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  submitDiseaseOutbreak(message: string) {
    //alert(message);
  }
}
