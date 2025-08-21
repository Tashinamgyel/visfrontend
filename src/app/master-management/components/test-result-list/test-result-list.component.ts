import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TestResultFormComponent } from '../test-result-form/test-result-form.component';
import { Tests } from '@app/master-management/models/master';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-test-result-list',
  templateUrl: './test-result-list.component.html',
  styleUrls: ['./test-result-list.component.scss'],
})
export class TestResultListComponent implements OnInit {
  test: Observable<Tests[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.test = this.refreshData$.pipe(switchMap((_) => this.service.loadTest()));
    this.test.subscribe((res) => {
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
  editTest(testId: number) {
    const dialogRef = this.dialog.open(TestResultFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: testId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Tests) => {
      if (result) {
        this.updateTest(result);
      }
    });
  }

  deleteTest(testId: number) {
    const dialogRef = this.dialog.open(TestResultFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: testId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Tests) => {
      if (result) {
        this.updateTest(result);
      }
    });
  }

  // deleteTest(testId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Tests) => {
  //     if (result) {
  //       this.service.deleteTest(testId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Test type deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Clinicsl Test couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(TestResultFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Tests) => {
      if (result) {
        this.addTest(result);
      }
    });
  }

  addTest(test: Tests) {
    this.service.saveTest(test).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateTest(test: Tests) {
    this.service.updateTest(test, test.id).subscribe(
      () => {
        if (test.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted successfully ');
        }
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Result couldnot be updated, please try again');
      }
    );
  }
}
