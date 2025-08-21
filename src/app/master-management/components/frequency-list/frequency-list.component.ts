import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core/notification.service';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Frequency } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { FrequencyFOrmComponent } from '../frequency-form/frequency-form.component';

@Component({
  selector: 'app-frequency-list',
  templateUrl: './frequency-list.component.html',
  styleUrls: ['./frequency-list.component.scss'],
})
export class FrequencyListComponent implements OnInit {
  frequency: Observable<Frequency[]>;
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
    this.frequency = this.refreshData$.pipe(switchMap((_) => this.service.loadFrequency()));
    this.frequency.subscribe((Response) => {
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
  editFrequency(frequencyId: number) {
    const dialogRef = this.dialog.open(FrequencyFOrmComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: frequencyId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Frequency) => {
      if (result) {
        this.updateFrequency(result);
      }
    });
  }
  deleteFrequency(frequencyId: number) {
    const dialogRef = this.dialog.open(FrequencyFOrmComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: frequencyId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Frequency) => {
      if (result) {
        this.updateFrequency(result);
      }
    });
  }

  // deleteFrequency(frequencyId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Frequency) => {
  //     if (result) {
  //       this.service.deleteFrequency(frequencyId).subscribe(
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
    const dialogRef = this.dialog.open(FrequencyFOrmComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Frequency) => {
      if (result) {
        this.addFrequency(result);
      }
    });
  }

  addFrequency(frequency: Frequency) {
    this.service.saveFrequency(frequency).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added, please try again');
      }
    );
  }

  updateFrequency(frequency: Frequency) {
    this.service.updateFrequency(frequency, frequency.id).subscribe(
      () => {
        if (frequency.status == 'Y') {
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
