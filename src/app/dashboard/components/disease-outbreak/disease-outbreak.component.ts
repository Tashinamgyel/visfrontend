import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StatData } from '@app/dashboard/models/model';
import { CredentialsService } from '@app/auth';
import { FlashTaskList } from '@app/master-management/models/master';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-disease-outbreak',
  templateUrl: './disease-outbreak.component.html',
  styleUrls: ['./disease-outbreak.component.scss'],
})
export class DiseaseOutbreakComponent implements OnInit {
  @Input() totalCases: StatData;
  @Output() submitEmit: EventEmitter<String> = new EventEmitter<String>();

  @Output() outbreakDetails: EventEmitter<any> = new EventEmitter<any>();

  flashTaskList: Observable<FlashTaskList[]>;

  //outbreakDetails: any;

  flashId: number;
  displayedColumns: string[] = [
    'slno',
    'outbreakId',
    'dzongKhagName',
    'gewogName',
    'ownerName',
    // 'edit',
    'report',
    'flashId',
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private credentialsService: CredentialsService
  ) {}
  public refreshData$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    // this.flashTaskList = this.refreshData$.pipe(
    //   switchMap((_) => this.sharedService.populateTaskList(this.credentialsService.credentials.userName))
    // );
  }

  edit(flashId: number) {
    // this.sharedService.populateTaskList(this.credentialsService.credentials.userName).subscribe((res) => {
    let navExtras: NavigationExtras = {
      queryParams: {
        flashId: flashId,
      },
    };
    this.router.navigate(['/outbreakDetails'], navExtras);
  }

  submit() {
    this.submitEmit.emit('finished');
  }
}
