import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { ClinicalTreat } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClinicalTreatmentFormComponent } from '../clinical-treatment-form/clinical-treatment-form.component';

@Component({
  selector: 'app-clinical-treatment-list',
  templateUrl: './clinical-treatment-list.component.html',
  styleUrls: ['./clinical-treatment-list.component.scss'],
})
export class ClinicalTreatmentListComponent implements OnInit {
  clinicalTreat: Observable<ClinicalTreat[]>;
  dataSource = new MatTableDataSource();
  public refreshData$ = new BehaviorSubject<boolean>(false);
  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.clinicalTreat = this.refreshData$.pipe(switchMap((_) => this.service.loadClinicalTreat()));
    this.clinicalTreat.subscribe((res) => {
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
  editClinicalTreat(procedureId: number) {
    const dialogRef = this.dialog.open(ClinicalTreatmentFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: procedureId,
      },
    });
    dialogRef.afterClosed().subscribe((result: ClinicalTreat) => {
      if (result) {
        this.updateClinicalTreat(result);
      }
    });
  }
  deleteClinicalTreat(procedureId: number) {
    const dialogRef = this.dialog.open(ClinicalTreatmentFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: procedureId,
      },
    });
    dialogRef.afterClosed().subscribe((result: ClinicalTreat) => {
      if (result) {
        this.updateClinicalTreat(result);
      }
    });
  }

  // deleteClinicalTreat(clinicalTreatId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: ClinicalTreat) => {
  //     if (result) {
  //       this.service.deleteClinicalTreat(clinicalTreatId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Clinical Treatment type deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Clinical Treatment couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(ClinicalTreatmentFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: ClinicalTreat) => {
      if (result) {
        this.addClinicalTreat(result);
      }
    });
  }

  addClinicalTreat(clinicalTreat: ClinicalTreat) {
    this.service.saveClinicalTreat(clinicalTreat).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateClinicalTreat(clinicalTreat: ClinicalTreat) {
    this.service.updateClinicalTreat(clinicalTreat, clinicalTreat.id).subscribe(
      () => {
        if (clinicalTreat.status === 'Y') {
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
