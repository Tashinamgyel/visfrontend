import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Class } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClassFormComponent } from '../class-form/class-form.component';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent implements OnInit {
  class: Observable<Class[]>;
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
    this.class = this.refreshData$.pipe(switchMap((_) => this.service.loadClass()));
    this.class.subscribe((res) => {
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

  editClass(classId: number) {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: classId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Class) => {
      if (result) {
        this.updateClass(result);
      }
    });
  }
  deleteClass(classId: number) {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: classId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Class) => {
      if (result) {
        this.updateClass(result);
      }
    });
  }

  // deleteClass(classId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Class) => {
  //     if (result) {
  //       this.service.deleteClass(classId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Deleted successfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Could not be delete, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Class) => {
      if (result) {
        this.addClass(result);
      }
      0;
    });
  }

  addClass(newClass: Class) {
    this.service.saveClass(newClass).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateClass(newClass: Class) {
    this.service.updateClass(newClass, newClass.id).subscribe(
      () => {
        if (newClass.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated Successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted Successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be updated, please try again');
      }
    );
  }
}
