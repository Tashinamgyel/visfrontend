import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core/notification.service';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { VaccineType } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { VaccineTypeFormComponent } from '../vaccine-type-form/vaccine-type-form.component';

@Component({
  selector: 'app-vaccine-type-list',
  templateUrl: './vaccine-type-list.component.html',
  styleUrls: ['./vaccine-type-list.component.scss'],
})
export class VaccineTypeListComponent implements OnInit {
  vaccineType: Observable<VaccineType[]>;
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
    this.vaccineType = this.refreshData$.pipe(switchMap((_) => this.service.loadVaccineType()));
    this.vaccineType.subscribe((res) => {
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
  editVaccineType(vaccineTypeId: number) {
    const dialogRef = this.dialog.open(VaccineTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: vaccineTypeId,
      },
    });
    dialogRef.afterClosed().subscribe((result: VaccineType) => {
      if (result) {
        this.updateVaccineType(result);
      }
    });
  }
  deleteVaccineType(vaccineTypeId: number) {
    const dialogRef = this.dialog.open(VaccineTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: vaccineTypeId,
      },
    });
    dialogRef.afterClosed().subscribe((result: VaccineType) => {
      if (result) {
        this.updateVaccineType(result);
      }
    });
  }

  // deleteVaccineType(vaccineTypeId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: VaccineType) => {
  //     if (result) {
  //       this.service.deleteVaccineType(vaccineTypeId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar(' Vaccine deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Vaccine  couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(VaccineTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: VaccineType) => {
      if (result) {
        this.addVaccineType(result);
      }
    });
  }

  addVaccineType(vaccineType: VaccineType) {
    this.service.saveVaccineType(vaccineType).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateVaccineType(vaccineType: VaccineType) {
    this.service.updateVaccineType(vaccineType, vaccineType.id).subscribe(
      () => {
        if (vaccineType.status === 'Y') {
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
