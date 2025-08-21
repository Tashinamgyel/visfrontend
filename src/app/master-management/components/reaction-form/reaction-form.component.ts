import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Reaction } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-reaction-form',
  templateUrl: './reaction-form.component.html',
  styleUrls: ['./reaction-form.component.scss'],
})
export class ReactionFormComponent implements OnInit {
  Form: FormGroup;
  reactionName: string;
  reactionForm: FormGroup;
  actionType: string;
  reaction: Reaction[];

  id: number;

  constructor(
    public dialogRef: MatDialogRef<ReactionFormComponent>,
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
    this.service.loadReaction().subscribe((response) => {
      this.reaction = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadReactionById(this.id).subscribe(
        (response) => {
          this.reactionForm.patchValue({
            reactionName: response.reactionName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.reactionForm = this.fb.group({
      reactionName: new FormControl('', Validators.required),
    });
  }

  saveReaction() {
    if (this.reactionForm.valid) {
      const reaction = new Reaction();
      Object.assign(reaction, this.reactionForm.value);
      reaction.status = 'Y';
      this.dialogRef.close(reaction);
    } else {
      return;
    }
  }
  updateReaction() {
    if (this.reactionForm.valid) {
      const reaction = new Reaction();
      Object.assign(reaction, this.reactionForm.value);
      reaction.id = this.id;
      if (this.actionType === 'EDIT') {
        reaction.status = 'Y';
      } else {
        reaction.status = 'N';
      }
      this.dialogRef.close(reaction);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
