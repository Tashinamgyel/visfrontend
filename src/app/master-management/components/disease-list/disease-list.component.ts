import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatchingMethod, Disease, DiseaseSampleType, Reaction } from '@app/master-management/models/master';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@core';
import { switchMap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { DiseaseFormComponent } from '@app/master-management/components/disease-form/disease-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss'],
})
export class DiseaseListComponent implements OnInit {
  disease: Observable<Disease[]>;
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
    this.disease = this.refreshData$.pipe(switchMap((_) => this.service.loadDisease()));
    this.disease.subscribe((res) => {
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

  editDisease(diseaseId: number) {
    const dialogRef = this.dialog.open(DiseaseFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: diseaseId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Disease) => {
      if (result) {
        this.updateDisease(result);
      }
    });
  }
  deleteDisease(diseaseId: number) {
    const dialogRef = this.dialog.open(DiseaseFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: diseaseId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Disease) => {
      if (result) {
        this.updateDisease(result);
      }
    });
  }

  // deleteDisease(diseaseId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Disease) => {
  //     if (result) {
  //       this.service.deleteDisease(diseaseId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Selected Disease sample type deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Reaction couldnot be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(DiseaseFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Disease) => {
      if (result) {
        this.addDisease(result);
      }
    });
  }

  addDisease(disease: Disease) {
    this.service.saveDisease(disease).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added, please try again');
      }
    );
  }

  updateDisease(disease: Disease) {
    this.service.updateDisease(disease, disease.id).subscribe(
      () => {
        if (disease.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated Successfully');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted Successfully');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated, please try again');
      }
    );
  }
}
