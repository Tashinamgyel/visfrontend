import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Program } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { ProgramFormComponent } from '../program-form/program-form.component';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  program: Observable<Program[]>;
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
    this.program = this.refreshData$.pipe(switchMap((_) => this.service.loadProgram()));

    this.program.subscribe((res) => {
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

  editProgram(programId: number) {
    const dialogRef = this.dialog.open(ProgramFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: programId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Program) => {
      if (result) {
        this.updateProgram(result);
      }
    });
  }
  deleteProgram(programId: number) {
    const dialogRef = this.dialog.open(ProgramFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: programId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Program) => {
      if (result) {
        this.updateProgram(result);
      }
    });
  }

  // deleteProgram(programId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Program) => {
  //     if (result) {
  //       this.service.deleteProgram(programId).subscribe(
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
    const dialogRef = this.dialog.open(ProgramFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Program) => {
      if (result) {
        this.addProgram(result);
      }
    });
  }

  addProgram(program: Program) {
    this.service.saveProgram(program).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Could not be Added, please try again');
      }
    );
  }

  updateProgram(program: Program) {
    this.service.updateProgram(program, program.id).subscribe(
      () => {
        if (program.status === 'Y') {
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
