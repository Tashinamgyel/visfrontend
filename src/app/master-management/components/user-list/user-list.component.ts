import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { switchMap } from 'rxjs/operators';
import { CreateUser } from '@app/master-management/models/master';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  createUser: Observable<CreateUser[]>;
  dataSource = new MatTableDataSource();
  public refreshData$ = new BehaviorSubject<boolean>(false);

  displayedColumns: string[] = [
    'slno',
    'cid',
    'name',
    'mobileNo',
    'emailId',
    'designationName',
    'roleName',
    'edit',
    'delete',
    'reset',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  forRoleName: any;
  rolename: any;

  constructor(
    private dialog: MatDialog,
    private service: MasterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // this.createUser = this.refreshData$.pipe(switchMap((_) => this.service.loadUsers()));
    this.service.loadUsers().subscribe((response) => {
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

  editUser(id: number) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      data: {
        actionType: 'EDIT',
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result) {
        this.addUsers(result);
      } else {
        this.createUser = this.refreshData$.pipe(switchMap((_) => this.service.loadUsers()));
      }
    });
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected item?',
      },
    });
    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result) {
        this.service.deleteUser(id).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Deleted successfully');
            this.ngOnInit();
          },
          () => {
            this.notificationService.openErrorSnackBar('User couldnot be delete, try again');
          }
        );
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      data: {
        actionType: 'ADD',
        id: '',
      },
    });
    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result) {
        this.addUsers(result);
      }
    });
  }

  addUsers(createUser: CreateUser) {
    this.service.saveUsers(createUser).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Added successfully ');
        this.ngOnInit();
      },
      () => {
        this.notificationService.openErrorSnackBar('Couldnot be Added, please try again');
      }
    );
  }

  updateUser(createUser: CreateUser) {
    this.service.saveUsers(createUser).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated successfully ');
        this.ngOnInit();
      },
      () => {
        this.notificationService.openErrorSnackBar(' couldnot be Updated, please try again');
      }
    );
  }

  resetPassword(id: number, cidNumber: number, email: string) {
    const createUser = new CreateUser();
    createUser.id = id;
    createUser.cid = cidNumber;
    createUser.emailId = email;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to reset the password?',
      },
    });
    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result) {
        this.service.resetPassword(createUser).subscribe(
          () => {
            this.notificationService.openSuccessSnackBar('Password reset successfully');
            this.ngOnInit();
          },
          () => {
            this.notificationService.openErrorSnackBar('Couldnot be delete, try again');
          }
        );
      }
    });
  }
}
