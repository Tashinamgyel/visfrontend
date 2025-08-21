import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ClinicalDiagnosticTest } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClinicalDiagnosticTestFormComponent } from '../clinical-diagnostic-test-form/clinical-diagnostic-test-form.component';

@Component({
  selector: 'app-clinical-diagnostic-test-list',
  templateUrl: './clinical-diagnostic-test-list.component.html',
  styleUrls: ['./clinical-diagnostic-test-list.component.scss'],
})
export class ClinicalDiagnosticTestListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  clinicaltest: Observable<ClinicalDiagnosticTest[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.clinicaltest = this.refreshData$.pipe(switchMap((_) => this.service.loadClinicalDiagnosticTest()));
    this.clinicaltest.subscribe((res) => {
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

  editClinicalTest(clinicalTestId: number) {
    const dialogRef = this.dialog.open(ClinicalDiagnosticTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: clinicalTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: ClinicalDiagnosticTest) => {
      if (result) {
        this.updateClinicalTest(result);
      }
    });
  }

  deleteClinicalTest(clinicalTestId: number) {
    const dialogRef = this.dialog.open(ClinicalDiagnosticTest, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: clinicalTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: ClinicalDiagnosticTest) => {
      if (result) {
        this.updateClinicalTest(result);
      }
    });
  }

  // deleteDesignation(designationId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Designations) => {
  //     if (result) {
  //       this.service.deleteDesignation(designationId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Deleted Sucessfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Couldnot be deleted, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(ClinicalDiagnosticTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: ClinicalDiagnosticTest) => {
      if (result) {
        this.addClinicalTest(result);
      }
    });
  }

  addClinicalTest(test: ClinicalDiagnosticTest) {
    this.service.saveClinicalDiagnosticTest(test).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be Added, please try again');
      }
    );
  }

  updateClinicalTest(test: ClinicalDiagnosticTest) {
    this.service.updateClinicalDiagnosticTest(test, test.id).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be updated, please try again');
      }
    );
  }
}
