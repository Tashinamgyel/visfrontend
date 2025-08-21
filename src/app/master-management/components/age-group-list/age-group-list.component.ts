import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { AgeGroup } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AgeGroupFormComponent } from '../age-group-form/age-group-form.component';

@Component({
  selector: 'app-age-group-list',
  templateUrl: './age-group-list.component.html',
  styleUrls: ['./age-group-list.component.scss'],
})
export class AgeGroupListComponent implements OnInit {
  // here ngAfterViewInit
  ageGroup: Observable<AgeGroup[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);

  displayedColumns: string[] = ['slno', 'name', 'edit', 'delete'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.ageGroup = this.refreshData$.pipe(switchMap((_) => this.service.loadAgeGroup()));
  }

  editAgeGroup(ageGroupId: number) {
    const dialogRef = this.dialog.open(AgeGroupFormComponent, {
      width: '700px',
      data: {
        actionType: 'EDIT',
        id: ageGroupId,
      },
    });
    dialogRef.afterClosed().subscribe((result: AgeGroup) => {
      if (result) {
        this.updateAgeGroup(result);
      }
    });
  }

  deleteAgeGroup(ageGroupId: number) {
    const dialogRef = this.dialog.open(AgeGroupFormComponent, {
      width: '700px',
      data: {
        actionType: 'DELETE',
        id: ageGroupId,
      },
    });
    dialogRef.afterClosed().subscribe((result: AgeGroup) => {
      if (result) {
        this.updateAgeGroup(result);
      }
    });
  }
  openAddModal() {
    const dialogRef = this.dialog.open(AgeGroupFormComponent, {
      width: '700px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: AgeGroup) => {
      if (result) {
        this.addAgeGroup(result);
      }
    });
  }

  addAgeGroup(ageGroup: AgeGroup) {
    this.service.saveAgeGroup(ageGroup).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar(' Added successfully ');
        this.refreshData$.next(true);
      },
      () => {
        this.notificationService.openErrorSnackBar(' Couldnot be Added, please try again');
      }
    );
  }

  updateAgeGroup(ageGroup: AgeGroup) {
    this.service.updateAgeGroup(ageGroup, ageGroup.id).subscribe(
      () => {
        if (status == 'Y') {
          this.notificationService.openSuccessSnackBar(' updated successfully ');
          this.refreshData$.next(true);
        } else {
          this.notificationService.openSuccessSnackBar('successfully deleted');
          this.refreshData$.next(true);
        }
      },
      () => {
        this.notificationService.openErrorSnackBar('couldnot be updated, please try again');
      }
    );
  }

  // deletedAgeGroup(ageGroup: AgeGroup) {
  //   this.service.updateAgeGroup(ageGroup, ageGroup.id).subscribe(
  //     () => {
  //       this.notificationService.openSuccessSnackBar('successfully updated');
  //       this.refreshData$.next(true);
  //     },
  //     () => {
  //       this.notificationService.openErrorSnackBar('couldnot be updated, please try again');
  //     }
  //   );
  // }
  //}
}
