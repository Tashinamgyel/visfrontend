import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { AdminRoute } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AdminRouteFormComponent } from '../admin-route-form/admin-route-form.component';

@Component({
  selector: 'app-admin-route-list',
  templateUrl: './admin-route-list.component.html',
  styleUrls: ['./admin-route-list.component.scss'],
})
export class AdminRouteListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  adminRoute: Observable<AdminRoute[]>;
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
    this.adminRoute = this.refreshData$.pipe(switchMap((_) => this.service.loadAdminRoute()));
    this.adminRoute.subscribe((res) => {
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
  editAdminRoute(adminRouteId: number) {
    const dialogRef = this.dialog.open(AdminRouteFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: adminRouteId,
      },
    });
    dialogRef.afterClosed().subscribe((result: AdminRoute) => {
      if (result) {
        this.updateAdminRoute(result);
      }
    });
  }
  deleteAdminRoute(adminRouteId: number) {
    const dialogRef = this.dialog.open(AdminRouteFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: adminRouteId,
      },
    });
    dialogRef.afterClosed().subscribe((result: AdminRoute) => {
      if (result) {
        this.updateAdminRoute(result);
      }
    });
  }

  // deleteAdminRoute(adminRouteId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: AdminRoute) => {
  //     if (result) {
  //       this.service.deleteAdminRoute(adminRouteId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Admin route deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Admin route couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(AdminRouteFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: AdminRoute) => {
      if (result) {
        this.addAdminRoute(result);
      }
    });
  }

  addAdminRoute(adminRoute: AdminRoute) {
    this.service.saveAdminRoute(adminRoute).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateAdminRoute(adminRoute: AdminRoute) {
    this.service.updateAdminRoute(adminRoute, adminRoute.id).subscribe(
      () => {
        if (adminRoute.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated Successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted Successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Culdnot be updated, please try again');
      }
    );
  }
}
