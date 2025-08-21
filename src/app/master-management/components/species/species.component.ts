import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SpeciesFormComponent } from '../species-form/species-form.component';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { switchMap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Species } from '@app/master-management/models/master';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements OnInit {
  species: Observable<Species[]>;
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
    this.species = this.refreshData$.pipe(switchMap((_) => this.service.loadSpecies()));
    this.species.subscribe((res) => {
      this.dataSource.data = res;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editSpecies(speciesId: number) {
    const dialogRef = this.dialog.open(SpeciesFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: speciesId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Species) => {
      if (result) {
        this.updateSpecies(result);
      }
    });
  }
  deleteSpecies(speciesId: number) {
    const dialogRef = this.dialog.open(SpeciesFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: speciesId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Species) => {
      if (result) {
        this.updateSpecies(result);
      }
    });
  }

  // deleteSpecies(speciesId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Species) => {
  //     if (result) {
  //       this.service.deleteSpecies(speciesId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Could not be Delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(SpeciesFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Species) => {
      if (result) {
        this.addSpecies(result);
        this.species = this.refreshData$.pipe(switchMap((_) => this.service.loadSpecies()));
      }
    });
  }

  addSpecies(species: Species) {
    // this.service.saveSingleSpecies(species).subscribe(

    this.service.saveSpecies(species).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be saved, please try again');
      }
    );
  }

  updateSpecies(species: Species) {
    alert(species.id);

    this.service.updateSpecies(species, species.id).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated, please try again');
      }
    );
  }
}
