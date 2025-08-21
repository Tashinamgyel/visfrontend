import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Designations } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DesignationFormComponent } from '../designation-form/designation-form.component';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss'],
})
export class DesignationListComponent implements OnInit {
  designation: Observable<Designations[]>;
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
    this.designation = this.refreshData$.pipe(switchMap((_) => this.service.loadDesignations()));
    this.designation.subscribe((res) => {
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
  editDesignation(designationId: number) {
    const dialogRef = this.dialog.open(DesignationFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: designationId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Designations) => {
      if (result) {
        this.updateDesignation(result);
      }
    });
  }

  deleteDesignation(designationId: number) {
    const dialogRef = this.dialog.open(DesignationFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: designationId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Designations) => {
      if (result) {
        this.updateDesignation(result);
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
    const dialogRef = this.dialog.open(DesignationFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Designations) => {
      if (result) {
        this.addDesignation(result);
      }
    });
  }

  addDesignation(desigantion: Designations) {
    this.service.saveDesignation(desigantion).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be Added, please try again');
      }
    );
  }

  updateDesignation(designation: Designations) {
    this.service.updateDesgination(designation, designation.id).subscribe(
      () => {
        if (designation.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated Successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted Successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be updated, please try again');
      }
    );
  }
}
