import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core/notification.service';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { DewormingCondition } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { DewormConditionFormComponent } from '../deworm-condition-form/deworm-condition-form.component';

@Component({
  selector: 'app-deworm-condition-list',
  templateUrl: './deworm-condition-list.component.html',
  styleUrls: ['./deworm-condition-list.component.scss'],
})
export class DewormConditionListComponent implements OnInit {
  dewormingtest: Observable<DewormingCondition[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.dewormingtest = this.refreshData$.pipe(switchMap((_) => this.service.loadDeworming()));
    this.dewormingtest.subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editDeworming(dewormingTestId: number) {
    const dialogRef = this.dialog.open(DewormConditionFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: dewormingTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: DewormingCondition) => {
      if (result) {
        this.updateDeworming(result);
      }
    });
  }

  deleteDeworming(designationId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: DewormingCondition) => {
      if (result) {
        this.service.deleteDeworming(designationId).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted Sucessfully');
            this.refreshData$.next(true);
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be deleted, try again');
          }
        );
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(DewormConditionFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: DewormingCondition) => {
      if (result) {
        this.addDewormTest(result);
      }
    });
  }

  addDewormTest(dewormingTest: DewormingCondition) {
    this.service.saveDeworming(dewormingTest).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be Added, please try again');
      }
    );
  }

  updateDeworming(deworningTest: DewormingCondition) {
    this.service.updateDeworming(deworningTest, deworningTest.id).subscribe(
      () => {
        // if (deworningTest.status === 'Y') {
        //   this.notificationService.openSuccessSnackBar('Updated Successfully ');
        //   this.refreshData$.next(true);
        // } else {
        //   this.notificationService.openSuccessSnackBar('Deleted Successfully ');
        //   this.refreshData$.next(true);
        // }
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be updated, please try again');
      }
    );
  }
}
