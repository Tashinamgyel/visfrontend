import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { DewormingDiagnosticTest } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeworwmingDiagnosticTestFormComponent } from '../deworwming-diagnostic-test-form/deworwming-diagnostic-test-form.component';

@Component({
  selector: 'app-deworwming-diagnostic-test-list',
  templateUrl: './deworwming-diagnostic-test-list.component.html',
  styleUrls: ['./deworwming-diagnostic-test-list.component.scss'],
})
export class DeworwmingDiagnosticTestListComponent implements OnInit {
  dewormingtest: Observable<DewormingDiagnosticTest[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);

  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.dewormingtest = this.refreshData$.pipe(switchMap((_) => this.service.loadDeworningDiagnosticTest()));
  }

  editDewormingTest(dewormingTestId: number) {
    const dialogRef = this.dialog.open(DeworwmingDiagnosticTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: dewormingTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: DewormingDiagnosticTest) => {
      if (result) {
        this.updateDewormingTest(result);
      }
    });
  }

  deleteDewormingTest(dewormingTestId: number) {
    const dialogRef = this.dialog.open(DeworwmingDiagnosticTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'Delete',
        id: dewormingTestId,
      },
    });
    dialogRef.afterClosed().subscribe((result: DewormingDiagnosticTest) => {
      if (result) {
        this.updateDewormingTest(result);
      }
    });
  }

  // deleteDesignation(designationId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Designations) => {
  //     if (result) {
  //       this.service.deleteDesignation(designationId).subscribe(
  //         () => {
  //           this.notificationService.openSuccessSnackBar('Deleted Sucessfully');
  //           this.refreshData$.next(true);
  //         },
  //         () => {
  //           this.notificationService.openErrorSnackBar('Couldnot be deleted, try again');
  //         }
  //       );
  //     }
  //   });
  // }

  openAddModal() {
    const dialogRef = this.dialog.open(DeworwmingDiagnosticTestFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: DewormingDiagnosticTest) => {
      if (result) {
        this.addDewormTest(result);
      }
    });
  }

  addDewormTest(dewormingTest: DewormingDiagnosticTest) {
    this.service.saveDewormingTest(dewormingTest).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be Added, please try again');
      }
    );
  }

  updateDewormingTest(deworningTest: DewormingDiagnosticTest) {
    this.service.updateDewormingTest(deworningTest, deworningTest.id).subscribe(
      () => {
        // if (deworningTest.status === 'Y') {
        //   this.notificationService.openSuccessSnackBar('Updated Successfully ');
        //   this.refreshData$.next(true);
        // } else {
        //   this.notificationService.openSuccessSnackBar('Deleted Successfully ');
        //   this.refreshData$.next(true);
        // }
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be updated, please try again');
      }
    );
  }
}
