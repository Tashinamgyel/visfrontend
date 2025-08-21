import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Centre } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { centreFormComponent } from '../centre-form/centre-form.component';

@Component({
  selector: 'app-centre-list',
  templateUrl: './centre-list.component.html',
  styleUrls: ['./centre-list.component.scss'],
})
export class CentreListComponent implements OnInit {
  centre: Observable<Centre[]>;
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
    this.centre = this.refreshData$.pipe(switchMap((_) => this.service.loadCentre()));
    this.centre.subscribe((res) => {
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

  editCentre(centreId: number) {
    const dialogRef = this.dialog.open(centreFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: centreId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Centre) => {
      if (result) {
        this.updateCentre(result);
      }
    });
  }

  deleteCentre(centreId: number) {
    const dialogRef = this.dialog.open(centreFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: centreId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Centre) => {
      if (result) {
        this.updateCentre(result);
      }
    });

    // deleteCentre(centreId: number) {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    // width: '500px',
    // data: {
    // title: 'Confirmation',
    // message: 'Are you sure you want to delete the selected item?',
    // },
    // });
    // dialogRef.afterClosed().subscribe((result: Centre) => {
    // if (result) {
    // this.service.deleteCentre(centreId).subscribe(
    // () => {
    // this.notificationService.openSuccessSnackBar(' deleted successfully');
    // this.refreshData$.next(true);
    // },
    // () => {
    // this.notificationService.openErrorSnackBar('couldnot be delete, try again');
    // }
    // );
    // }
    // });
    // }
  }
  openAddModal() {
    const dialogRef = this.dialog.open(centreFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Centre) => {
      if (result) {
        this.addCentre(result);
      }
    });
  }

  addCentre(centre: Centre) {
    this.service.saveCentre(centre).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar(' Added successfully');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }

  updateCentre(centre: Centre) {
    this.service.updateCentre(centre, centre.id).subscribe(
      () => {
        if (centre.status === 'Y') {
          this.notificationService.openSuccessSnackBar('  Updated Successfully');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('  Deleted Successfully');
          this.refreshData$.next(true);
        }
      },

      () => {
        this.notificationService.openErrorSnackBar('Could not be updated, please try again');
      }
    );
  }
}
