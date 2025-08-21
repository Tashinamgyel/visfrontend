import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed, NotificationService } from '@core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/internal/Observable';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  showPassword: boolean = true;
  isActiveToggleTextPassword: Boolean = true;
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  titleAlert = 'This field is required';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.userName} successfully logged in`);

          // console.log('credentials', credentials);
          // localStorage.setItem('credentials', JSON.stringify(credentials));

          let userDetails: any;
          userDetails = credentials;

          if (userDetails.user.newUser === 'Y') {
            let navExtras: NavigationExtras = {
              queryParams: {
                userid: credentials.userid,
              },
            };
            this.router.navigate(['changed-password'], navExtras);
          } else {
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          }
          untilDestroyed(this);
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
          this.notificationService.openErrorSnackBar('Login credentials is invalid, please try again');
        }
      );
  }

  checkPassword(control: any) {
    const enteredPassword = control.value;
    /**
     * @description password pattern:
     * at least one of each lower case, upper case and a number is required with min. length 8
     */
    // const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])?(?=.*[0-9])(?=.{8,})/;
    // return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
    // Uncomment above line and remove line below once for prod
    // return passwordCheck.test(enteredPassword) && enteredPassword ? { requirements: true } : null;
  }

  forgotPassword() {
    this.router.navigate([this.route.snapshot.queryParams.redirect || '/forgot-password'], { replaceUrl: true });
  }

  getErrorPassword() {
    return this.loginForm.get('password').hasError('required')
      ? 'Field is required'
      : this.loginForm.get('password').hasError('requirements')
      ? 'Password needs to be at least four characters, one uppercase letter and one number'
      : '';
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: [null, [Validators.required, this.checkPassword]],
      remember: true,
    });
  }
}
