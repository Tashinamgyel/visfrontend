import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { System } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SystemFormComponent } from '../system-form/system-form.component';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
})
export class SystemListComponent implements OnInit {
  systemsss: Observable<System[]>;
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
    this.systemsss = this.refreshData$.pipe(switchMap((_) => this.service.loadSystem()));
    this.systemsss.subscribe((res) => {
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

  editSystem(SystemId: number) {
    const dialogRef = this.dialog.open(SystemFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: SystemId,
      },
    });
    dialogRef.afterClosed().subscribe((result: System) => {
      if (result) {
        this.updateSystem(result);
      }
    });
  }
  deleteSystem(SystemId: number) {
    const dialogRef = this.dialog.open(SystemFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: SystemId,
      },
    });
    dialogRef.afterClosed().subscribe((result: System) => {
      if (result) {
        this.updateSystem(result);
      }
    });
  }

  // deleteSystem(SystemId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: System) => {
  //     if (result) {
  //       this.service.deleteSystem(SystemId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Selected Disease sample type deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Disease couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(SystemFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: System) => {
      if (result) {
        this.addSystem(result);
      }
    });
  }

  addSystem(system: System) {
    this.service.saveSystem(system).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar(' Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateSystem(system: System) {
    this.service.updateSystem(system, system.id).subscribe(
      () => {
        if (system.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated Successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be updated, please try again');
      }
    );
  }
}
