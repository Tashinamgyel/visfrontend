import { viewClassName } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Conditions, System } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConditionsFormComponent } from '../conditions-form/conditions-form.component';

@Component({
  selector: 'app-conditions-list',
  templateUrl: './conditions-list.component.html',
  styleUrls: ['./conditions-list.component.scss'],
})
export class ConditionsListComponent implements OnInit {
  conditions: Observable<Conditions[]>;
  dataSource = new MatTableDataSource();
  system: Observable<System[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);

  displayedColumns: string[] = ['slno', 'name', 'system', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator:MatPaginator;
  // @ViewChild(MatSort) sort:MatSort;

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.conditions = this.refreshData$.pipe(switchMap((_) => this.service.loadConditions()));
    this.system = this.refreshData$.pipe(switchMap((_) => this.service.loadSystem()));
    this.conditions.subscribe((res) => {
      this.dataSource.data = res;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editConditions(conditionId: number) {
    const dialogRef = this.dialog.open(ConditionsFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: conditionId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Conditions) => {
      if (result) {
        this.addConditions(result);
      }
    });
  }

  deleteConditions(conditionId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: Conditions) => {
      if (result) {
        this.service.deleteConditions(conditionId).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar(' Deleted successfully');
            this.refreshData$.next(true);
          },
          () => {
            this.notificationService.openErrorSnackBar('Could not be Deleted, try again');
          }
        );
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(ConditionsFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Conditions) => {
      if (result) {
        this.addConditions(result);
      }
    });
  }

  addConditions(conditions: Conditions) {
    this.service.saveConditions(conditions).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added, please try again');
      }
    );
  }

  updateConditions(conditions: Conditions) {
    this.service.updateConditions(conditions, conditions.id).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar(' Updated  successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated, please try again');
      }
    );
  }
}
