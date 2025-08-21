import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { NotificationService } from '@app/@core';
import { Dzongkhags, Gewogs } from '@app/vis/shared/model/model';
import { Cases } from '@app/master-management/models/master';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.scss'],
})
export class AddOwnerComponent implements OnInit {
  ownerForm: FormGroup;
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  dzongkhagId: number;
  actionType: string;
  id: number;
  maxDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddOwnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: MasterService,
    private sharedService: SharedService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }
  initializeForm() {
    this.ownerForm = this.fb.group({
      cidNumber: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
      ),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
      villageName: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      primaryDate: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.sharedService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
  }
  getGewogs(dzongkhagId: number) {
    this.sharedService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }

  getCitizen(cidNumber: number) {
    this.service.getCitizen(cidNumber).subscribe(
      (response) => {
        this.ownerForm.patchValue({
          ownerName: response.fullName,
        });
      },
      () => {
        this.notification.openErrorSnackBar('Could not load details, please try again later');
      }
    );
  }

  saveCase() {
    if (this.ownerForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.ownerForm.value);
      cases.type = 'OwnerDetails';
      this.dialogRef.close({ case: cases, buttonId: 1 });
    } else {
      return;
    }
  }

  updateCase() {
    if (this.ownerForm.valid) {
      const cases = new Cases();
      Object.assign(cases, this.ownerForm.value);
      cases.type = 'OwnerDetails';
      cases.id = this.id;
      this.dialogRef.close(cases);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
