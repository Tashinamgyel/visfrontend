import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Dzongkhags, Gewogs } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-gewog-form',
  templateUrl: './gewog-form.component.html',
  styleUrls: ['./gewog-form.component.scss'],
})
export class GewogFormComponent implements OnInit {
  gewogForm: FormGroup;
  actionType: string;
  id: number;
  gewogName: string;
  gewogs: Gewogs[];
  dzongkhag: Dzongkhags[];
  dzongkhagId: number;

  constructor(
    public dialogRef: MatDialogRef<GewogFormComponent>,
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
    this.service.loadGewog().subscribe((response) => {
      this.gewogs = response;
    });
    this.service.loadDzongkhag().subscribe((response) => {
      this.dzongkhag = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadGewogById(this.id).subscribe(
        (response) => {
          console.log('cccsss', response);

          this.gewogForm.patchValue({
            gewogName: response.gewogName,
            dzongkhagId: response.dzongkhag.id,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.gewogForm = this.fb.group({
      gewogName: new FormControl('', Validators.required),
      dzongkhagId: new FormControl('', Validators.required),
    });
  }
  saveGewog() {
    if (this.gewogForm.valid) {
      const gewogs = new Gewogs();
      Object.assign(gewogs, this.gewogForm.value);
      gewogs.status = 'Y';
      this.dialogRef.close(gewogs);
    } else {
      return;
    }
  }

  updateGewog() {
    if (this.gewogForm.valid) {
      const gewogs = new Gewogs();
      Object.assign(gewogs, this.gewogForm.value);
      gewogs.id = this.id;
      gewogs.dzongkhagId = this.gewogForm.value.dzongkhagId;

      if (this.actionType === 'EDIT') {
        gewogs.status = 'Y';
      } else {
        gewogs.status = 'N';
      }
      this.dialogRef.close(gewogs);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
