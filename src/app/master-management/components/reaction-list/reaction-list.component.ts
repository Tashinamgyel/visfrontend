import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Reaction } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReactionFormComponent } from '../reaction-form/reaction-form.component';

@Component({
  selector: 'app-reaction-list',
  templateUrl: './reaction-list.component.html',
  styleUrls: ['./reaction-list.component.scss'],
})
export class ReactionListComponent implements OnInit {
  reaction: Observable<Reaction[]>;
  dataSource = new MatTableDataSource();
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
    this.reaction = this.refreshData$.pipe(switchMap((_) => this.service.loadReaction()));
    this.reaction.subscribe((res) => {
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

  editReaction(reactionId: number) {
    const dialogRef = this.dialog.open(ReactionFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: reactionId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Reaction) => {
      if (result) {
        this.updateReaction(result);
      }
    });
  }
  deleteReaction(reactionId: number) {
    const dialogRef = this.dialog.open(ReactionFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: reactionId,
      },
    });
    dialogRef.afterClosed().subscribe((result: Reaction) => {
      if (result) {
        this.updateReaction(result);
      }
    });
  }

  // deleteReaction(reactionId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '500px',
  //     data: {
  //       title: 'Confirmation',
  //       message: 'Are you sure you want to delete the selected item?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: Reaction) => {
  //     if (result) {
  //       this.service.deleteReaction(reactionId).subscribe(
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
    const dialogRef = this.dialog.open(ReactionFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: Reaction) => {
      if (result) {
        this.addReaction(result);
      }
    });
  }

  addReaction(reaction: Reaction) {
    this.service.saveReaction(reaction).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateReaction(reaction: Reaction) {
    this.service.updateReaction(reaction, reaction.id).subscribe(
      () => {
        if (reaction.status === 'Y') {
          this.notificationService.openSuccessSnackBar('Updated successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('Deleted successfully ');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be updated, please try again');
      }
    );
  }
}
