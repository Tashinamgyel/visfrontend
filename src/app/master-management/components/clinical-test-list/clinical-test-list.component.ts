import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { BasisOfDiagnosis } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClinicalTestFormComponent } from '../clinical-test-form/clinical-test-form.component';

@Component({
  selector: 'app-clinical-test-list',
  templateUrl: './clinical-test-list.component.html',
  styleUrls: ['./clinical-test-list.component.scss'],
})
export class ClinicalTestListComponent implements OnInit {
  clinicalTest: Observable<BasisOfDiagnosis[]>;
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
    this.clinicalTest = this.refreshData$.pipe(switchMap((_) => this.service.loadClinicalTest()));
    this.clinicalTest.subscribe((res) => {
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
    const dialogRef = this.dialog.open(ClinicalTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: clinicalTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: BasisOfDiagnosis) => {
      if (result) {
        this.updateClinicalTest(result);
      }
    });
  }
  deleteClinicalTest(clinicalTestId: number) {
    const dialogRef = this.dialog.open(ClinicalTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: clinicalTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: BasisOfDiagnosis) => {
      if (result) {
        this.updateClinicalTest(result);
      }
    });
  }

  // deleteClinicalTest(clinicalTestId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: BasisOfDiagnosis) => {
  //     if (result) {
  //       this.service.deleteClinicalTest(clinicalTestId).subscribe(
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
    const dialogRef = this.dialog.open(ClinicalTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: BasisOfDiagnosis) => {
      if (result) {
        this.addClinicalTest(result);
      }
    });
  }

  addClinicalTest(clinicalTest: BasisOfDiagnosis) {
    this.service.saveClinicalTest(clinicalTest).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateClinicalTest(clinicalTest: BasisOfDiagnosis) {
    this.service.updateClinicalTest(clinicalTest, clinicalTest.id).subscribe(
      () => {
        if (clinicalTest.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Type couldnot be updated, please try again');
      }
    );
  }
}
