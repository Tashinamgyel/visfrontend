import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { DiseaseSampleType } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SampleTypeFormComponent } from '../sample-type-form/sample-type-form.component';

@Component({
  selector: 'app-sample-type-list',
  templateUrl: './sample-type-list.component.html',
  styleUrls: ['./sample-type-list.component.scss'],
})
export class SampleTypeListComponent implements OnInit {
  diseaseSampleType: Observable<DiseaseSampleType[]>;
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
    this.diseaseSampleType = this.refreshData$.pipe(switchMap((_) => this.service.loadDiseaseSampleType()));
    this.diseaseSampleType.subscribe((res) => {
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

  editDiseaseSampleType(diseaseSampleTypeId: number) {
    const dialogRef = this.dialog.open(SampleTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: diseaseSampleTypeId,
      },
    });
    dialogRef.afterClosed().subscribe((result: DiseaseSampleType) => {
      if (result) {
        this.updateDiseaseSampleType(result);
      }
    });
  }

  deleteDiseaseSampleType(diseaseSampleTypeId: number) {
    const dialogRef = this.dialog.open(SampleTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: diseaseSampleTypeId,
      },
    });
    dialogRef.afterClosed().subscribe((result: DiseaseSampleType) => {
      if (result) {
        this.updateDiseaseSampleType(result);
      }
    });
  }

  // deleteDiseaseSampleType(diseaseSampleTypeId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: DiseaseSampleType) => {
  //     if (result) {
  //       this.service.deleteDiseaseSampleType(diseaseSampleTypeId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Selected Disease sample type deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Disease sample couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(SampleTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: DiseaseSampleType) => {
      if (result) {
        this.addDiseaseSampleType(result);
      }
    });
  }

  addDiseaseSampleType(diseaseSampleType: DiseaseSampleType) {
    this.service.saveDiseaseSampleType(diseaseSampleType).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('couldnot be Added, please try again');
      }
    );
  }

  updateDiseaseSampleType(diseaseSampleType: DiseaseSampleType) {
    this.service.updateDiseaseSampleType(diseaseSampleType, diseaseSampleType.id).subscribe(
      () => {
        if (diseaseSampleType.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated successfully ');
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
