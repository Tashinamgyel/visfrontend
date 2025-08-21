import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Villages } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VillageformComponent } from '../villageform/villageform.component';

@Component({
  selector: 'app-villagelist',
  templateUrl: './villagelist.component.html',
  styleUrls: ['./villagelist.component.scss'],
})
export class VillagelistComponent implements OnInit {
  villages: Observable<Villages[]>;
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
    this.villages = this.refreshData$.pipe(switchMap((_) => this.service.loadVillages()));
    this.villages.subscribe((res) => {
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
  editVillages(villageId: number) {
    const dialogRef = this.dialog.open(VillageformComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: villageId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Villages) => {
      if (result) {
        this.updateVillages(result);
      }
    });
  }
  deleteVillages(villageId: number) {
    const dialogRef = this.dialog.open(VillageformComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: villageId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Villages) => {
      if (result) {
        this.updateVillages(result);
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(VillageformComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Villages) => {
      if (result) {
        this.addVillages(result);
      }
    });
  }

  addVillages(villages: Villages) {
    this.service.saveVillages(villages).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  // updateVillages(villages: Villages) {
  //   this.service.updateVillages(villages, villages.id).subscribe(
  //     () => {

  //         this.notificationService.openSuccessSnackBar('Updated Successfully ');
  //         this.refreshData$.next(true);
  //       }

  //     // () => {
  //     //   this.notificationService.openErrorSnackBar('Couldnot be updated, please try again');
  //     // }
  //   );
  // }
  updateVillages(villages: Villages) {
    this.service.updateVillages(villages, villages.id).subscribe(
      () => {
        if (villages.status === 'Y') {
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
