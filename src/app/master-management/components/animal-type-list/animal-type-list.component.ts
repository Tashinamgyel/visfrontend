import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { AnimalTypes } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnimalTypeFormComponent } from '../animal-type-form/animal-type-form.component';

@Component({
  selector: 'app-animal-type-list',
  templateUrl: './animal-type-list.component.html',
  styleUrls: ['./animal-type-list.component.scss'],
})
export class AnimalTypeListComponent implements OnInit {
  animalType: Observable<AnimalTypes[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['slno', 'name', 'species', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    //this.animalType = this.refreshData$.pipe(switchMap((_) => this.service.loadAnimalTypes()));
    this.dataCheck();
  }
  dataTest: any;
  dataCheck() {
    this.service.loadAnimalTypes().subscribe((response) => {
      this.dataTest = response;
      this.dataSource.data = response;
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
  editAnimalTypes(AnimalTypeId: number) {
    const dialogRef = this.dialog.open(AnimalTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: AnimalTypeId,
      },
    });
    dialogRef.afterClosed().subscribe((result: AnimalTypes) => {
      if (result) {
        this.addAnimalTypes(result);
      }
    });
  }

  deleteAnimalTypes(AnimalTypeId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: AnimalTypes) => {
      if (result) {
        this.service.deleteAnimalTypes(AnimalTypeId).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted successfully');
            this.refreshData$.next(true);
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be delete, try again');
          }
        );
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AnimalTypeFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: AnimalTypes) => {
      if (result) {
        this.addAnimalTypes(result);
      }
    });
  }

  addAnimalTypes(animalTypes: AnimalTypes) {
    this.service.saveAnimalTypes(animalTypes).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added, please try again');
      }
    );
  }

  updateAnimalTypes(animalTypes: AnimalTypes) {
    this.service.updateAnimalTypes(animalTypes, animalTypes.id).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('couldn ot be updated, please try again');
      }
    );
  }
}
