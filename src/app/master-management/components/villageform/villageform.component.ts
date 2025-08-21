import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Dzongkhags, Gewogs, Villages } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-villageform',
  templateUrl: './villageform.component.html',
  styleUrls: ['./villageform.component.scss'],
})
export class VillageformComponent implements OnInit {
  villageForm: FormGroup;
  actionType: String;
  id: number;
  villages: Villages[];
  gewog: Gewogs[];
  villageName: string;
  constructor(
    public dialogRef: MatDialogRef<VillageformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MasterService,
    private notification: NotificationService,
    private visMasterService: SharedService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.id = this.data.id;
    this.initializeForm();
    this.populateForm();
  }
  populateForm() {
    this.service.loadVillages().subscribe((response) => {
      this.villages = response;
    });
    this.service.loadGewog().subscribe((response) => {
      this.gewog = response;
      console.log(response, 'ddfdsfds');
    });

    if (this.actionType === 'EDIT' || this.actionType === 'Delete') {
      this.service.loadVillageById(this.id).subscribe(
        (response) => {
          debugger;
          console.log(response, 'ddfdsfds');
          this.villageForm.patchValue({
            villageName: response.villageName,
            // dzongkhagId: response.dzongkhag.id,
            gewogId: response.gewog.id,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }
  // getGewogs(dzongkhagId: number) {
  //   this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
  //     this.gewog = response;
  //     console.log(this.gewog, "dsfdsfdsfsd");

  //   });
  // }

  initializeForm() {
    this.villageForm = this.fb.group({
      villageName: new FormControl('', Validators.required),
      //  dzongkkhagId: new FormControl('', Validators.required),
      gewogId: new FormControl('', Validators.required),
    });
  }
  saveVillages() {
    const villages = new Villages();
    Object.assign(villages, this.villageForm.value);
    villages.status = 'Y';
    this.dialogRef.close(villages);
  }

  updateVillages() {
    if (this.villageForm.valid) {
      const villages = new Villages();
      Object.assign(villages, this.villageForm.value);
      villages.id = this.id;
      if (this.actionType === 'EDIT') {
        villages.status = 'Y';
      } else {
        villages.status = 'N';
      }
      this.dialogRef.close(villages);
    } else {
      return;
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
