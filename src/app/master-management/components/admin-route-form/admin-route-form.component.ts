import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { AdminRoute, AgeGroup } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-admin-route-form',
  templateUrl: './admin-route-form.component.html',
  styleUrls: ['./admin-route-form.component.scss'],
})
export class AdminRouteFormComponent implements OnInit {
  adminRouteForm: FormGroup;
  actionType: String;
  id: number;
  routeName: string;
  adminRoute: AdminRoute[];

  constructor(
    public dialogRef: MatDialogRef<AdminRouteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }
  populateForm() {
    this.service.loadAdminRoute().subscribe((response) => {
      this.adminRoute = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadAdminRouteById(this.id).subscribe(
        (response) => {
          this.adminRouteForm.patchValue({
            routeName: response.routeName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.adminRouteForm = this.fb.group({
      routeName: new FormControl('', Validators.required),
    });
  }
  saveAdminRoute() {
    if (this.adminRouteForm.valid) {
      const adminRoute = new AdminRoute();
      adminRoute.status = 'Y';
      Object.assign(adminRoute, this.adminRouteForm.value);
      this.dialogRef.close(adminRoute);
    } else {
      return;
    }
  }

  updateAdminRoute() {
    if (this.adminRouteForm.valid) {
      const adminRoute = new AdminRoute();
      Object.assign(adminRoute, this.adminRouteForm.value);
      adminRoute.id = this.id;
      if (this.actionType === 'EDIT') {
        adminRoute.status = 'Y';
      } else {
        adminRoute.status = 'N';
      }
      this.dialogRef.close(adminRoute);
    } else {
      return;
    }
  }

  // deleteAdminRoute() {
  //   if (this.adminRouteForm.valid) {
  //     const adminRoute = new AdminRoute();
  //     Object.assign(adminRoute, this.adminRouteForm.value);
  //     adminRoute.id = this.id;
  //     if(this.actionType ==='DELETE')
  //       {
  //         adminRoute.status='Y'
  //       }
  //       else{
  //         adminRoute.status='N'
  //       }     this.dialogRef.close(adminRoute);
  //   } else {
  //     return;
  //   }
  // }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
