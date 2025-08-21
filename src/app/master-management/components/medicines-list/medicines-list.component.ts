import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Medicines } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MedicinesFormComponent } from '../medicines-form/medicines-form.component';

@Component({
  selector: 'app-medicines-list',
  templateUrl: './medicines-list.component.html',
  styleUrls: ['./medicines-list.component.scss'],
})
export class MedicinesListComponent implements OnInit {
  medicines: Observable<Medicines[]>;
  dataSource = new MatTableDataSource();
  public refreshData$ = new BehaviorSubject<boolean>(false);
  displayedColumns: string[] = ['slno', 'name', 'medicineClass','presentation','composition', 'unit','edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.medicines = this.refreshData$.pipe(switchMap((_) => this.service.loadMedicines()));
    this.dataCheck();
    this.medicines.subscribe((response) => {
      this.dataSource.data = response;
    });
  }
  testData: any;
  dataCheck() {
    this.service.loadMedicines().subscribe((response) => {
      this.testData = response;
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
  editMedicines(medicinesId: number) {
    const dialogRef = this.dialog.open(MedicinesFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: medicinesId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Medicines) => {
      if (result) {
        this.updateMedicines(result);
      }
    });
  }

  // deleteMedicines(medicinesId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Medicines) => {
  //     if (result) {
  //       this.service.deleteMedicines(medicinesId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  deleteMedicines(medicinesId: number) {
    const dialogRef = this.dialog.open(MedicinesFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: medicinesId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Medicines) => {
      if (result) {
        this.updateMedicines(result);
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(MedicinesFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Medicines) => {
      if (result) {
        this.addMedicines(result);
      }
    });
  }

  addMedicines(medicines: Medicines) {
    this.service.saveMedicines(medicines).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateMedicines(medicines: Medicines) {
    this.service.updateMedicines(medicines, medicines.id).subscribe(
      () => {
        if(medicines.status =='Y'){
        this.notificationService.openSuccessSnackBar('Medicines successfully updated');
        this.refreshData$.next(true);
      }else{
          this.notificationService.openSuccessSnackBar('Medicines successfully deleted');
          this.refreshData$.next(true);
      }
    },
      () => {
        this.notificationService.openErrorSnackBar('Medicines could not be updated, please try again');
      }
    );
  }
}
