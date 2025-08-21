import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { DoseUnit } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DoseUnitComponent } from '../dose-unit/dose-unit.component';

@Component({
  selector: 'app-dose-unit-list',
  templateUrl: './dose-unit-list.component.html',
  styleUrls: ['./dose-unit-list.component.scss'],
})
export class DoseUnitListComponent implements OnInit {
  doseUnit: Observable<DoseUnit[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.doseUnit = this.refreshData$.pipe(switchMap((_) => this.service.loadDoseUnit()));
    this.doseUnit.subscribe((response) => {
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

  editDoseUnit(doseUnitId: number) {
    const dialogRef = this.dialog.open(DoseUnitComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: doseUnitId,
      },
    });
    dialogRef.afterClosed().subscribe((result: DoseUnit) => {
      if (result) {
        this.updateDoseUnit(result);
      }
    });
  }

  deleteDoseUnit(doseUnitId: number) {
    const dialogRef = this.dialog.open(DoseUnitComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: doseUnitId,
      },
    });
    dialogRef.afterClosed().subscribe((result: DoseUnit) => {
      if (result) {
        this.updateDoseUnit(result);
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(DoseUnitComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: DoseUnit) => {
      if (result) {
        this.addDoseUnit(result);
      }
    });
  }

  addDoseUnit(doseUnit: DoseUnit) {
    this.service.saveDoseUnit(doseUnit).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added Successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Culd not be saved, please try again');
      }
    );
  }

  updateDoseUnit(doseUnit: DoseUnit) {
    this.service.updateDoseUnit(doseUnit, doseUnit.id).subscribe(
      () => {
        if (doseUnit.status === 'Y') {
          this.notificationService.openSuccessSnackBar('  Updated Successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('  Deleted Successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Dose Unit details couldnot be updated, please try again');
      }
    );
  }
}
