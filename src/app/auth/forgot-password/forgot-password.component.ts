import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/@core';
import { Forgotpassword } from '@app/dashboard/models/forgot-password';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MasterService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.passwordForm = this.fb.group({
      cid: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
      email: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      ),
    });
  }

  forgotPassword() {
    const model = new Forgotpassword();
    Object.assign(model, this.passwordForm.value);
    this.service.forgotPassword(model).subscribe(
      () => {
        this.notificationService.openSuccessSnackBar('Password Successfully Changed. Your new Password is your CID');
      },
      () => {
        this.notificationService.openErrorSnackBar('Detail did not match, Contact Admin');
      }
    );
  }
}
