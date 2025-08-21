import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';
import { NotificationService } from '@app/@core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmDialogModel } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { EmailData } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-email-component',
  templateUrl: './email-component.component.html',
  styleUrls: ['./email-component.component.scss'],
})
export class EmailComponentComponent implements OnInit {
  public refreshData$ = new BehaviorSubject<boolean>(false);

  emailForm: FormGroup;
  emails: any;
  constructor(
    public dialogRef: MatDialogRef<EmailComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,

    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private service: MasterService,
    private credentialsService: CredentialsService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.populateForm();
    this.initialize();
  }

  initialize() {
    this.emailForm = this.fb.group({
      mailTo: new FormControl('', Validators.required),
      mailCc: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    this.sharedService.loadEmail().subscribe((response) => {
      this.emails = response;
    });
  }

  onConfirm(): void {
    const emailData: EmailData = {};
    Object.assign(emailData, this.emailForm.value);
    emailData.mailTo = this.emailForm.value.mailTo.join(',');
    if (this.emailForm.value.mailCc !== '') {
      emailData.mailCc = this.emailForm.value.mailCc.join(',');
    }
    this.dialogRef.close(emailData);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
