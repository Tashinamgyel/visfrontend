import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { Program } from '@app/master-management/models/master';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.scss'],
})
export class ProgramFormComponent implements OnInit {
  programForm: FormGroup;
  programName: string;
  actionType: string;
  id: number;
  program: Program[];

  constructor(
    public dialogRef: MatDialogRef<ProgramFormComponent>,
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
    this.service.loadProgram().subscribe((response) => {
      this.program = response;
    });

    if (this.actionType === 'EDIT' || this.actionType === 'DELETE') {
      this.service.loadProgramById(this.id).subscribe(
        (response) => {
          this.programForm.patchValue({
            programName: response.programName,
          });
        },
        () => {
          this.notification.openErrorSnackBar('Couldnot load details, please try again later');
        }
      );
    }
  }

  initializeForm() {
    this.programForm = this.fb.group({
      programName: new FormControl('', Validators.required),
    });
  }

  saveProgram() {
    if (this.programForm.valid) {
      const program = new Program();
      Object.assign(program, this.programForm.value);
      program.status = 'Y';
      this.dialogRef.close(program);
    } else {
      return;
    }
  }
  updateProgram() {
    if (this.programForm.valid) {
      const program = new Program();
      Object.assign(program, this.programForm.value);
      program.id = this.id;
      if (this.actionType === 'EDIT') {
        program.status = 'Y';
      } else {
        program.status = 'N';
      }
      this.dialogRef.close(program);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
