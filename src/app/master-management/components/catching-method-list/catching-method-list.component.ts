import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CatchingMethod } from '@app/master-management/models/master';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { switchMap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { CatchingMethodFormComponent } from '../catching-method-form/catching-method-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-catching-method-list',
  templateUrl: './catching-method-list.component.html',
  styleUrls: ['./catching-method-list.component.scss'],
})
export class CatchingMethodListComponent implements OnInit {
  catchingMethod: Observable<CatchingMethod[]>;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public refreshData$ = new BehaviorSubject<boolean>(false);

  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.catchingMethod = this.refreshData$.pipe(switchMap((_) => this.service.loadCatchingMethod()));
    this.catchingMethod.subscribe((res) => {
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

  editCatchingMethod(catchId: number) {
    const dialogRef = this.dialog.open(CatchingMethodFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: catchId,
      },
    });
    dialogRef.afterClosed().subscribe((result: CatchingMethod) => {
      if (result) {
        this.updateCatchingMethod(result);
      }
    });
  }
  deleteCatchingMethod(catchId: number) {
    const dialogRef = this.dialog.open(CatchingMethodFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: catchId,
      },
    });
    dialogRef.afterClosed().subscribe((result: CatchingMethod) => {
      if (result) {
        this.updateCatchingMethod(result);
      }
    });
  }
  // deleteCatchingMethod(catchId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: CatchingMethod) => {
  //     if (result) {
  //       this.service.deleteCatchingMethod(catchId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Selected catching method deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Catching Method couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(CatchingMethodFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: CatchingMethod) => {
      if (result) {
        this.addCatchingMethod(result);
      }
    });
  }

  addCatchingMethod(catchingMethod: CatchingMethod) {
    this.service.saveCatchingMethod(catchingMethod).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be Added, please try again');
      }
    );
  }

  updateCatchingMethod(catchingMethod: CatchingMethod) {
    this.service.updateCatchingMethod(catchingMethod, catchingMethod.id).subscribe(
      () => {
        if (catchingMethod.status === 'Y') {
          this.notificationService.openSuccessSnackBar(' Updated Successfully');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar(' Deleted Successfully');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be updated, please try again');
      }
    );
  }
}
