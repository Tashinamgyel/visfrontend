import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/@core';
import { CredentialsService } from '@app/auth';
import { updatePassword } from '@app/dashboard/models/update-password';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MasterService,
    private credentialsService: CredentialsService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializePasswordForm();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      cid: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  initializePasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  getUserDetails() {
    this.service.getUserById(this.credentialsService.credentials.userid).subscribe(
      (res) => {
        console.log('resresres', res);
      },
      () => {
        this.notificationService.openErrorSnackBar('User could not be delete, try again');
      }
    );
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
