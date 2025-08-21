import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { FarmingSystem } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FarmingSystemFormComponent } from '../farming-system-form/farming-system-form.component';

@Component({
  selector: 'app-farming-system-list',
  templateUrl: './farming-system-list.component.html',
  styleUrls: ['./farming-system-list.component.scss'],
})
export class FarmingSystemListComponent implements OnInit {
  farmingSystem: Observable<FarmingSystem[]>;
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
    this.farmingSystem = this.refreshData$.pipe(switchMap((_) => this.service.loadFarmingSystem()));
    this.farmingSystem.subscribe((res) => {
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

  editFarmingSystem(farmingSystemId: number) {
    const dialogRef = this.dialog.open(FarmingSystemFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: farmingSystemId,
      },
    });
    dialogRef.afterClosed().subscribe((result: FarmingSystem) => {
      if (result) {
        this.updateFarmingSystem(result);
      }
    });
  }

  deleteFarmingSystem(farmingSystemId: number) {
    const dialogRef = this.dialog.open(FarmingSystemFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: farmingSystemId,
      },
    });
    dialogRef.afterClosed().subscribe((result: FarmingSystem) => {
      if (result) {
        this.updateFarmingSystem(result);
      }
    });
  }

  // deleteFarmingSystem(farmingSystemId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: FarmingSystem) => {
  //     if (result) {
  //       this.service.deleteFarmingSystem(farmingSystemId).subscribe(
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
    const dialogRef = this.dialog.open(FarmingSystemFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: FarmingSystem) => {
      if (result) {
        this.addFarmingSystem(result);
      }
    });
  }

  addFarmingSystem(farmingSystem: FarmingSystem) {
    this.service.saveFarmingSystem(farmingSystem).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar(' Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }

  updateFarmingSystem(farmingSystem: FarmingSystem) {
    this.service.updateFarmingSystem(farmingSystem, farmingSystem.id).subscribe(
      () => {
        if (farmingSystem.status === 'Y') {
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
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
