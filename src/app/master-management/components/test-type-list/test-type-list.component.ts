import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { TypeOfTest } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TestTypeFormComponent } from '../test-type-form/test-type-form.component';

@Component({
  selector: 'app-test-type-list',
  templateUrl: './test-type-list.component.html',
  styleUrls: ['./test-type-list.component.scss'],
})
export class TestTypeListComponent implements OnInit {
  typeOfTest: Observable<TypeOfTest[]>;

  public refreshData$ = new BehaviorSubject<boolean>(false);
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.typeOfTest = this.refreshData$.pipe(switchMap((_) => this.service.loadTypeOfTest()));
    this.typeOfTest.subscribe((res) => {
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

  editTypeOfTest(typeOfTestId: number) {
    const dialogRef = this.dialog.open(TestTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: typeOfTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: TypeOfTest) => {
      if (result) {
        this.updateTypeOfTest(result);
      }
    });
  }
  deleteTypeOfTest(typeOfTestId: number) {
    const dialogRef = this.dialog.open(TestTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: typeOfTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: TypeOfTest) => {
      if (result) {
        this.updateTypeOfTest(result);
      }
    });
  }

  // deleteTypeOfTest(typeOfTestId: number) {
  // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  // width: '500px',
  // data: {
  // title: 'Confirmation',
  // message: 'Are you sure you want to delete the selected item?',
  // },
  // });
  // dialogRef.afterClosed().subscribe((result: TypeOfTest) => {
  // if (result) {
  // this.service.deleteTypeOfTest(typeOfTestId).subscribe(
  // () => {
  // this.notificationService.openSuccessSnackBar(' Test type deleted successfully');
  // this.refreshData$.next(true);
  // },
  // () => {
  // this.notificationService.openErrorSnackBar('Test Type couldnot be delete, try again');
  // }
  // );
  // }
  // });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(TestTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: TypeOfTest) => {
      if (result) {
        this.addTypeOfTest(result);
      }
    });
  }

  addTypeOfTest(typeOfTest: TypeOfTest) {
    this.service.saveTypeOfTest(typeOfTest).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateTypeOfTest(typeOfTest: TypeOfTest) {
    this.service.updateTypeOfTest(typeOfTest, typeOfTest.id).subscribe(
      () => {
        if (typeOfTest.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated Successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted Successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be updated, please try again');
      }
    );
  }
}
