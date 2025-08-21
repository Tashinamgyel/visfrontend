import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { SkinCondition } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SkinConditionFormComponent } from '../skin-condition-form/skin-condition-form.component';
import { CredentialsService } from '@app/auth';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-skin-condition-list',
  templateUrl: './skin-condition-list.component.html',
  styleUrls: ['./skin-condition-list.component.scss'],
})
export class SkinConditionListComponent implements OnInit {
  skinCondition: Observable<SkinCondition[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.skinCondition = this.refreshData$.pipe(switchMap((_) => this.service.loadSkinCondition()));
    this.skinCondition.subscribe((res) => {
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
  editSkinCondition(skinConditionId: number) {
    const dialogRef = this.dialog.open(SkinConditionFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: skinConditionId,
      },
    });
    dialogRef.afterClosed().subscribe((result: SkinCondition) => {
      if (result) {
        this.updateSkinCondition(result);
      }
    });
  }
  deleteSkinCondition(skinConditionId: number) {
    const dialogRef = this.dialog.open(SkinConditionFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: skinConditionId,
      },
    });
    dialogRef.afterClosed().subscribe((result: SkinCondition) => {
      if (result) {
        this.updateSkinCondition(result);
      }
    });
  }

  // deleteSkinCondition(skinConditionId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: SkinCondition) => {
  //     if (result) {
  //       this.service.deleteSkinCondition(skinConditionId).subscribe(
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
    const dialogRef = this.dialog.open(SkinConditionFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: SkinCondition) => {
      if (result) {
        this.addSkinCondition(result);
      }
    });
  }

  addSkinCondition(skinCondition: SkinCondition) {
    console.log('skinCondition', skinCondition);

    this.service.saveSkinCondition(skinCondition).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }

  updateSkinCondition(skinCondition: SkinCondition) {
    this.service.updateSkinCondition(skinCondition, skinCondition.id).subscribe(
      () => {
        if (skinCondition.status === 'Y') {
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
