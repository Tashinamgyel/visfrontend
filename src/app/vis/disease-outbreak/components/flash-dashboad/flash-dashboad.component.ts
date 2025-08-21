import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService, Credentials } from '@app/auth';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MediaObserver } from '@angular/flex-layout';
import { DiseaseOutbreak, DISEASE_OUTBREAK } from '@app/shell/consts/model';

@Component({
  selector: 'app-flash-dashboad',
  templateUrl: './flash-dashboad.component.html',
  styleUrls: ['./flash-dashboad.component.scss'],
})
export class FlashDashboadComponent implements OnInit {
  diseaseOutBreaks: DiseaseOutbreak[] = DISEASE_OUTBREAK;
  userName: boolean = true;
  flashTaskList: any;
  report: string;
  reportStatus: number;
  public currentUser: Credentials;
  ifUserIsNationalLevel: boolean;
  ifUserIsGewogLevel: boolean;

  displayedColumns: string[];

  displayedColumns1: string[] = [
    'slno',
    'outbreakId',
    'dzongKhagName',
    'gewogName',
    'ownerName',
    'report',
    // 'reportStatus',
    'flashId',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource1 = new MatTableDataSource();

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    public dialogRef: MatDialogRef<FlashDashboadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private media: MediaObserver,
    private router: Router,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private credentialsService: CredentialsService
  ) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
  actionType: string;

  ngOnInit(): void {
    this.actionType = this.data.actionType;

    //alert(this.actionType);
    this.populateForm();
    this.currentUser = this.credentialsService.credentials;
  //  console.log(this.currentUser, 'dsfdsfsdfsd');

    if (this.credentialsService.credentials.roleName === 'NCAH') {
      this.userName = true;

      this.displayedColumns = [
        'slno',
        'outbreakId',
        'dzongKhagName',
        'gewogName',
        'ownerName',
        'report',
        //'reportStatus',
        'flashId',
      ];
    } else {
      this.userName = false;
      this.displayedColumns = [
        'slno',
        'outbreakId',
        'dzongKhagName',
        'gewogName',
        'ownerName',
        'report',
        //'reportStatus',
        'view',
      ];
    }
  }

  flashPush: any[] = [];
  followupPush: any[] = [];

  populateForm() {

    this.sharedService

      .populateflashList(this.credentialsService.credentials.userName, this.credentialsService.credentials.roleName,this.actionType)
      .subscribe((res) => {
        console.log(res,"ddddddddd");
        
        for (let i = 0; i < res.length; i++) {
          if (res[i].report === 'Flash') {
            this.flashPush.push(res[i]);
          } else if (res[i].report === 'Ongoing' || res[i].report === 'Resolved') {
            this.followupPush.push(res[i]);
          }
          this.dataSource.data = this.flashPush;
          this.dataSource1.data = this.followupPush;
        }
      });
  }

  edit(flashId: number, report: string, reportStatus: number) {
    let navExtras: NavigationExtras = {
      queryParams: {
        flashId: flashId,
        reportStatus: reportStatus,
        report: report,
      },
    };

    if (report === 'Flash') {
      this.router.navigate(['/flashOutbreakDetails'], navExtras);
      this.dialogRef.close(true);
    } else if (report === 'Resolved') {
      this.router.navigate(['/followUp'], navExtras);
      this.dialogRef.close(false);
    } else if (report === 'Ongoing' && reportStatus === 1 && this.credentialsService.credentials.roleName !== 'NCAH') {
      this.router.navigate(['/followUpOutbreakDetails'], navExtras);
      this.dialogRef.close(false);
      this.userName = false;
    } else if (report === 'Ongoing' && this.credentialsService.credentials.roleName === 'NCAH') {
      this.router.navigate(['/followUps'], navExtras);
      this.dialogRef.close(false);
    } else {
      this.router.navigate(['/followUpsUsers'], navExtras);
      this.dialogRef.close(false);
    }
  }

  printPage() {
    window.print();
  }
}
