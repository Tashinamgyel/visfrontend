import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Breeds } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { BreedFormComponent } from '../breed-form/breed-form.component';
import { GeneralBreedFormComponent } from '../general-breed-form/general-breed-form.component';

@Component({
  selector: 'app-general-breed-list',
  templateUrl: './general-breed-list.component.html',
  styleUrls: ['./general-breed-list.component.scss'],
})
export class GeneralBreedListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  breeds: Observable<Breeds[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public refreshData$ = new BehaviorSubject<boolean>(false);
  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.breeds = this.refreshData$.pipe(switchMap((_) => this.service.loadBreeds()));
    this.breeds.subscribe((res) => {
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
  editBreeds(breedId: number) {
    const dialogRef = this.dialog.open(GeneralBreedFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: breedId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Breeds) => {
      if (result) {
        this.updateBreeds(result);
      }
    });
  }
  deleteBreeds(breedId: number) {
    const dialogRef = this.dialog.open(GeneralBreedFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: breedId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Breeds) => {
      if (result) {
        this.updateBreeds(result);
      }
    });
  }

  // deleteBreeds(breedId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Breeds) => {
  //     if (result) {
  //       this.service.deleteBreeds(breedId).subscribe(
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
    const dialogRef = this.dialog.open(GeneralBreedFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Breeds) => {
      if (result) {
        this.addBreeds(result);
      }
    });
  }

  addBreeds(breeds: Breeds) {
    this.service.saveBreeds(breeds).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateBreeds(breeds: Breeds) {
    this.service.updateBreeds(breeds, breeds.id).subscribe(
      () => {
        if (breeds.status === 'Y') {
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
