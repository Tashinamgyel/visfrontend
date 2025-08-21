import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import {
  CreateUser,
  Designations,
  UserType,
  UserLevel,
  Centre,
  Dzongkhags,
  Program,
} from '@app/master-management/models/master';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { curry } from 'conditional-reduce';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  actionType: string;
  id: number;
  employeeId: string;
  createUser: CreateUser[];
  roles: any[] = [];
  jurisdictions: string[] = [];
  roleAutocomplete: Observable<string[]>;
  designations: Designations[];
  userType: UserType[];
  userLevel: UserLevel[];
  centre: Centre[];
  dzongkhags: Dzongkhags[];
  cid: number;
  newUser: string;
  roleChange: boolean = true;
  programs: Program[];
  hideJurisdiction: boolean = true;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  userRole: any[] = [];
  program: Program[];
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
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

  initializeForm() {
    this.userForm = this.fb.group({
      cid: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
      centreId: new FormControl('', Validators.required),
      jurisdiction: new FormControl('', Validators.required),
      userTypeId: new FormControl('', Validators.required),
      userLevelId: new FormControl('', Validators.required),
      programId: new FormControl(''),
    });
  }

  populateForm() {
    this.service.loadUserType().subscribe((response) => {
      this.userType = response;
    });
    this.service.loadUserLevel().subscribe((response) => {
      this.userLevel = response;
    });

    this.service.loadProgram().subscribe((response) => {
      this.programs = response;
    });

    this.service.loadRoles().subscribe((response) => {
      this.roles = response;
    });

    this.service.loadDesignations().subscribe((response) => {
      this.designations = response;
    });

    if (this.actionType === 'EDIT') {
      this.service.loadUserById(this.id).subscribe(
    
        (response) => {
          console.log(response,"responseresponse");
          debugger
          let roles = response.userRole;
          for (let i = 0; i < response.userRole.length; i++) {
            if (roles[i].role.id === 5) {
              this.roleChange = false;
              this.userForm.get('programId').setValue(response.program.id);
            } else {
              this.roleChange = true;
            }
          }
          for (let i = 0; i < response.userRole.length; i++) {
            this.userRole.push(response.userRole[i].role.id);
          }
          this.userForm.get('roleId').setValue(this.userRole);
          this.newUser = response.newUser;
          this.getCentres(response.levelUser.id);
          this.getJurisdiction(response.centre.id);
          this.userForm.patchValue({
            cid: response.cid,
            fullName: response.fullName,
            mobileNo: response.mobileNo,
            emailId: response.emailId,
            designationId: response.designation.id,
            userTypeId: response.userType.id,
            userLevelId: response.levelUser.id,
            centreId: response.centre.id,
            jurisdiction: response.jurisdiction,
            //programId: response.program.id
          });
        },
        () => {
          this.notification.openErrorSnackBar('Could not load details, please try again later');
        }
      );
    }
  }

  getCitizen(cid: number) {
    this.service.getCitizen(cid).subscribe(
      (response) => {
        this.userForm.patchValue({
          fullName: response.fullName,
        });
      },
      () => {
        this.notification.openErrorSnackBar('Could not load details, please try again later');
      }
    );
    this.checkUserExist(cid);
  }

  checkUserExist(cid: number) {
    this.service.getCheckUserExist(cid).subscribe((response) => {
      if (response === true) {
        this.notification.openErrorSnackBar('The user already exist');
        this.closeDialog();
      } else {
      }
    });
  }

  getCentres(userLevelId: number) {
    this.service.getCentres(userLevelId).subscribe((response) => {
      this.centre = response;
    });
  }

  changeRole() {
    let roles = this.userForm.get('roleId').value;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 5) {
        this.roleChange = false;
      } else {
        this.roleChange = true;
      }
    }
  }

  getJurisdiction(centreId: number) {
    let name = '';
    let responseName = '';
    const centerReducer = curry<string>({
      1: () => 'dzongkhag',
      2: () => 'dzongkhag',
      3: () => 'rldc',
      4: () => 'tvh',
      5: () => 'dzongkhag',
      6: () => 'centreAgencies',
      10:() => 'dol',
    });

    name = centerReducer(centreId.toString());
    this.service.loadJurisdiction(name).subscribe((response) => {
      const jReducer = curry<string>({
        dzongkhag: () => 'dzongkhagName',
        gewog: () => 'gewogName',
        rldc: () => 'rldcName',
        tvh: () => 'tvhName',
        centreAgencies: () => 'centreAgencies',
      });
      responseName = jReducer(name);
      for (let i = 0; i < response['length']; i++) this.jurisdictions.push(response[i][responseName]);
      this.roleAutocomplete = this.userForm['controls']['jurisdiction'].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
      this.refreshData$.next(true);
    });
  }
  private _filter(value: string): string[] {
    this.refreshData$.next(true);
    const filterValue = value.toLowerCase();
    return this.jurisdictions.filter((option) => option.toLowerCase().includes(filterValue));
  }

  saveUser() {
    const createUser = new CreateUser();
    if (this.userForm.valid) {
      let roles = this.userForm.get('roleId').value;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 5 && this.userForm.value.programId === '') {
          this.notification.openErrorSnackBar('select Program');
          return;
        }
      }
      Object.assign(createUser, this.userForm.value);
      createUser.roleId = this.userForm.value.roleId.join(',');
      createUser.newUser = 'Y';
      this.dialogRef.close(createUser);
    } else {
      return;
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const createUser = new CreateUser();
      Object.assign(createUser, this.userForm.value);
      createUser.id = this.id;
      createUser.roleId = this.userForm.value.roleId.join(',');
      createUser.newUser = 'N';
      this.dialogRef.close(createUser);
      console.log(this.userForm.value);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  // deleteUserRole(roleId: number) {
  //   this.service.deleteUserRole(roleId).subscribe((response) => {
  //     this.service.loadUserById(this.id).subscribe(
  //       (response) => {
  //         this.userRole = response.userRole;
  //         this.newUser = response.newUser;
  //         this.userForm.patchValue({
  //           cid: response.cid,
  //           fullName: response.fullName,
  //           mobileNo: response.mobileNo,
  //           emailId: response.mobileNo,
  //         });
  //       },
  //       () => {
  //         this.notification.openErrorSnackBar('Could not delete, please try again later');
  //       }
  //     );
  //   });
  // }
}
