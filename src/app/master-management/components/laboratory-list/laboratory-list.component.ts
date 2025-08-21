import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Laboratory } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LaboratoryFormComponent } from '../laboratory-form/laboratory-form.component';
import { SampleTypeFormComponent } from '../sample-type-form/sample-type-form.component';

@Component({
  selector: 'app-laboratory-list',
  templateUrl: './laboratory-list.component.html',
  styleUrls: ['./laboratory-list.component.scss'],
})
export class LaboratoryListComponent implements OnInit {
  laboratory: Observable<Laboratory[]>;
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
    this.laboratory = this.refreshData$.pipe(switchMap((_) => this.service.loadLaboratory()));
    this.laboratory.subscribe((res) => {
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

  editLaboratory(laboratoryId: number) {
    const dialogRef = this.dialog.open(LaboratoryFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: laboratoryId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Laboratory) => {
      if (result) {
        this.updateLaboratory(result);
      }
    });
  }
  deleteLaboratory(laboratoryId: number) {
    const dialogRef = this.dialog.open(LaboratoryFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: laboratoryId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Laboratory) => {
      if (result) {
        this.updateLaboratory(result);
      }
    });
  }
  // deleteLaboratory(laboratoryId: number) {
  // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  // width: '500px',
  // data: {
  // title: 'Confirmation',
  // message: 'Are you sure you want to delete the selected item?',
  // },
  // });
  // dialogRef.afterClosed().subscribe((result: Laboratory) => {
  // if (result) {
  // this.service.deleteLaboratory(laboratoryId).subscribe(
  // () => {
  // this.notificationService.openSuccessSnackBar('Selected Disease sample type deleted successfully');
  // this.refreshData$.next(true);
  // },
  // () => {
  // this.notificationService.openErrorSnackBar('Disease sample couldnot be delete, try again');
  // }
  // );
  // }
  // });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(LaboratoryFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Laboratory) => {
      if (result) {
        this.addLaboratory(result);
      }
    });
  }

  addLaboratory(laboratory: Laboratory) {
    this.service.saveLaboratory(laboratory).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateLaboratory(laboratory: Laboratory) {
    this.service.updateLaboratory(laboratory, laboratory.id).subscribe(
      () => {
        if (laboratory.status === 'Y') {
          this.notificationService.openSuccessSnackBar(' Updated Successfully ');
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
