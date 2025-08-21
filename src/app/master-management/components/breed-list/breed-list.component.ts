import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { BreedMapping } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BreedFormComponent } from '../breed-form/breed-form.component';

@Component({
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss'],
})
export class BreedListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  breedMapping: Observable<BreedMapping[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.breedMapping = this.refreshData$.pipe(switchMap((_) => this.service.loadBreedMapping()));
    this.breedMapping.subscribe((res) => {
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
  editBreedMapping(breedMappingId: number) {
    const dialogRef = this.dialog.open(BreedFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: breedMappingId,
      },
    });
    dialogRef.afterClosed().subscribe((result: BreedMapping) => {
      if (result) {
        this.updateBreedMapping(result);
      }
    });
  }
  // deleteBreedMapping(breedMappingId: number) {
  //   const dialogRef = this.dialog.open(BreedFormComponent, {
  //     width: '700px',
  //     data: {
  //       actionType: 'Delete',
  //       id: breedMappingId,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: BreedMapping) => {
  //     if (result) {
  //       this.updateBreedMapping(result);
  //     }
  //   });
  // }

  deleteBreedMapping(breedMappingId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: BreedMapping) => {
      if (result) {
        this.service.deleteBreedMapping(breedMappingId).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted successfully');
            this.refreshData$.next(true);
          },
          () => {
            this.notificationService.openErrorSnackBar('Species couldnot be delete, try again');
          }
        );
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(BreedFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: BreedMapping) => {
      if (result) {
        this.addBreedMapping(result);
      }
    });
  }

  addBreedMapping(breedMapping: BreedMapping) {
    this.service.saveBreedMapping(breedMapping).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be saved, please try again');
      }
    );
  }

  updateBreedMapping(breedMapping: BreedMapping) {
    this.service.updateBreedMapping(breedMapping, breedMapping.id).subscribe(
      () => {
        {
          this.notificationService.openSuccessSnackBar('Updated Successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated, please try again');
      }
    );
  }
}
