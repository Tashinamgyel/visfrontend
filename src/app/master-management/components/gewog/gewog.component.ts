import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Gewogs } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GewogFormComponent } from '../gewog-form/gewog-form.component';

@Component({
  selector: 'app-gewog',
  templateUrl: './gewog.component.html',
  styleUrls: ['./gewog.component.scss'],
})
export class GewogComponent implements OnInit {
  gewogs: Observable<Gewogs[]>;
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
    this.gewogs = this.refreshData$.pipe(switchMap((_) => this.service.loadGewog()));
    this.gewogs.subscribe((Response) => {
      this.dataSource.data = Response;
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
  editGewog(gewogId: number) {
    const dialogRef = this.dialog.open(GewogFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: gewogId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Gewogs) => {
      if (result) {
        this.updateGewog(result);
      }
    });
  }
  deleteGewog(gewogId: number) {
    const dialogRef = this.dialog.open(GewogFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: gewogId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Gewogs) => {
      if (result) {
        this.updateGewog(result);
      }
    });
  }

  // deleteGewog(gewogId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Gewogs) => {
  //     if (result) {
  //       this.service.deleteFrequency(gewogId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Farming System sample type deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Farming System couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(GewogFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Gewogs) => {
      if (result) {
        this.addGewog(result);
      }
    });
  }

  addGewog(gewogs: Gewogs) {
    this.service.saveGewog(gewogs).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added, please try again');
      }
    );
  }

  updateGewog(gewogs: Gewogs) {
    this.service.updateGewog(gewogs, gewogs.id).subscribe(
      () => {
        if (gewogs.status == 'Y') {
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
