import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/@core';
import { updatePassword } from '@app/dashboard/models/update-password';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '..';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  enableSubmitButton: boolean = true;
  userDetail: any;

  constructor(
    private fb: FormBuilder,
    private service: MasterService,
    private notificationService: NotificationService,
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialForm();
    if (this.credentialsService.credentials === null) {
      this.router.navigate([this.route.snapshot.queryParams.redirect || '/login'], { replaceUrl: true });
    }
  }

  initialForm() {
    this.passwordForm = this.fb.group({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  updatePassword() {
    const newPassword = new updatePassword();
    newPassword.userid = this.credentialsService.credentials.userid;
    newPassword.password = this.passwordForm.get('confirmPassword').value;

    this.service.updatePassword(newPassword).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Updated Successfully');
        this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
      },
      () => {
        this.notificationService.openErrorSnackBar('User could not be Update, try again');
      }
    );
  }

  checkNewPassword() {
    if (this.passwordForm.get('newPassword').value !== this.passwordForm.get('confirmPassword').value) {
      alert('Password did not match!');
      this.passwordForm.reset();
    } else {
      this.updatePassword();
    }
  }

  checkPassword() {
    const newPassword = new updatePassword();
    newPassword.userid = this.credentialsService.credentials.userid;
    newPassword.oldPassword = this.passwordForm.get('oldPassword').value;
    this.service.checkPassword(newPassword).subscribe(
      (response) => {},
      () => {
        this.notificationService.openErrorSnackBar("Old password didn't match");
        this.passwordForm.reset();
      }
    );
  }
}
